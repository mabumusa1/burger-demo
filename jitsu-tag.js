/*
 * The Jitsu browser tracker, pointed at a webhook so you can read exactly what it collects.
 *
 * Two instances fire, and the difference between them is the finding:
 *
 *   A. default      cookieCapture is {} - the out-of-the-box install. Its clientIds hold
 *                   Meta's two cookies and the analytics ids, and nothing else.
 *   B. configured   cookieCapture names every network cookie on the page, so clientIds
 *                   also carries TikTok, Snapchat, Pinterest, LinkedIn and the rest.
 *
 * Neither reads the landing URL. Click identifiers arrive as query parameters and no
 * amount of cookie configuration reaches them, which is why the capture layer takes them
 * separately. Compare the two payloads at the webhook and that gap is visible directly.
 *
 * Both post for real to the configured endpoint. Nothing here is stubbed.
 */
(function () {
  'use strict';

  // The SDK validates the write key shape (key:secret) before it will initialise. The
  // endpoint here is a webhook collector, so nothing is actually authenticated by it.
  var HOOK = (window.SFERE_CONFIG && window.SFERE_CONFIG.jitsuHost) || 'https://hook-142slz.fasthook.io';
  var WRITE_KEY = (window.SFERE_CONFIG && window.SFERE_CONFIG.jitsuWriteKey) || 'burgerdemo:webhookcapture';

  // Every network cookie worth asking for. The default install asks for none of these.
  var COOKIE_CAPTURE = {
    ttp: '_ttp',                 // TikTok browser id
    scid: '_scid',               // Snapchat browser id
    scid_r: '_scid_r',
    ttcsid: 'ttcsid',
    epik: '_epik',               // Pinterest
    li_fat_id: 'li_fat_id',      // LinkedIn
    msclkid: '_uetmsclkid',      // Microsoft
    rdt_uuid: '_rdt_uuid',       // Reddit
    gcl_aw: '_gcl_aw',           // Google Ads click cookie
    twpid: '_twpid',             // X
    clck: '_clck',               // Clarity
  };

  var sent = [];
  window.__SFERE_JITSU = sent;

  function emit(rec) {
    sent.push(rec);
    try { window.dispatchEvent(new CustomEvent('sfere:jitsu', { detail: rec })); } catch (e) {}
  }

  /* Wrap fetch so we can show the exact body, then send it for real. */
  function recordingFetch(variant) {
    return function (url, opts) {
      var body = null;
      try { body = opts && opts.body ? JSON.parse(opts.body) : null; } catch (e) { body = opts && opts.body; }
      emit({ variant: variant, url: String(url), at: Date.now(),
             clientIds: body && body.context ? body.context.clientIds : null, body: body });
      return window.fetch(url, opts);   // the real request, unmodified
    };
  }

  function boot() {
    // esbuild's iife wrapper puts the module namespace under .default; accept either shape.
    var SDK = window.JitsuSDK && (window.JitsuSDK.jitsuAnalytics ? window.JitsuSDK : window.JitsuSDK.default);
    if (!SDK || !SDK.jitsuAnalytics) { emit({ variant: 'error', error: 'Jitsu SDK not found on window' }); return; }
    var jitsuAnalytics = SDK.jitsuAnalytics;

    var shared = { host: HOOK, writeKey: WRITE_KEY, debug: false, errorPolicy: 'log' };

    // A. exactly what a normal install sends
    var a = jitsuAnalytics(Object.assign({}, shared, { fetch: recordingFetch('default') }));

    // B. the same tracker, told which cookies exist on this page
    var b = jitsuAnalytics(Object.assign({}, shared, {
      cookieCapture: COOKIE_CAPTURE, fetch: recordingFetch('configured') }));

    var S = window.__SFERE || {};
    var common = { sfere_external_id: S.externalId || null, sfere_event_id: S.dedupId || null };

    a.track('jitsu_default_config', Object.assign({ variant: 'default',
      note: 'cookieCapture not configured' }, common));

    b.track('jitsu_with_cookie_capture', Object.assign({ variant: 'configured',
      note: 'cookieCapture names every network cookie on the page' }, common));
  }

  // Wait for the network pixels to write their cookies, or there is nothing to capture.
  function start() { setTimeout(boot, 3000); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
