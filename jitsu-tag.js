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

  /*
   * Deliver the payload, then show it.
   *
   * The collector returns 200 but sends no Access-Control-Allow-Origin, so a normal
   * cross-origin POST is blocked: Jitsu sends Content-Type application/json, which forces
   * a preflight, and the preflight has nothing to pass. A "simple request" skips preflight
   * altogether, so the body is delivered as text/plain instead. The content is byte for
   * byte what Jitsu built; only the declared type changes.
   *
   * sendBeacon is the right instrument for this: no preflight, no response to read, and it
   * reports whether the browser queued the request. We record that outcome rather than
   * assuming delivery, which is the mistake this replaces.
   */
  function deliver(url, body) {
    try {
      var blob = new Blob([body], { type: 'text/plain;charset=UTF-8' });
      if (navigator.sendBeacon && navigator.sendBeacon(url, blob)) return 'queued (sendBeacon)';
    } catch (e) {}
    try {
      // no-cors keeps it a simple request; the response is opaque and we cannot read it.
      window.fetch(url, { method: 'POST', mode: 'no-cors', keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: body });
      return 'sent (no-cors, response not readable)';
    } catch (e) { return 'failed: ' + e.message; }
  }

  function recordingFetch(variant) {
    return function (url, opts) {
      var raw = opts && opts.body;
      var body = null;
      try { body = raw ? JSON.parse(raw) : null; } catch (e) { body = raw; }

      var outcome = raw ? deliver(String(url), raw) : 'no body';

      emit({ variant: variant, url: String(url), at: Date.now(), delivery: outcome,
             clientIds: body && body.context ? body.context.clientIds : null, body: body });

      // The collector cannot return a readable response cross-origin, so hand the SDK a
      // synthetic one. The delivery above already happened; this only stops the SDK
      // logging a failure it has no way to act on.
      return Promise.resolve(new Response('{"ok":true}', {
        status: 200, headers: { 'Content-Type': 'application/json' } }));
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
