/*
 * The capture layer, browser half, static build.
 *
 * Order is the whole trick:
 *   1. Establish the visitor id and take the click identifiers off this URL BEFORE any
 *      pixel exists. A cookie-reading tag never looks at the URL, so without this step
 *      every click identifier on the landing page is simply lost.
 *   2. Only then initialise the pixels, passing the id on Meta's FIRST init. Meta ignores
 *      external_id supplied by a later re-init, so a tag that fires first and identifies
 *      afterwards silently sends nothing.
 *   3. Fire each network's page event carrying one shared deduplication id.
 *   4. Build the conversions-API payload for each network from the full identifier bundle,
 *      using the real shipped destination code, and show it.
 *
 * ?mode=baseline behaves like an ordinary pixel install: no id, no URL capture, no server
 * copy. That is the comparison the panel draws.
 */
(function () {
  'use strict';

  var MODE = new URLSearchParams(location.search).get('mode') === 'baseline' ? 'baseline' : 'sfere';
  var CFG = window.SFERE_CONFIG || { pixels: {} };
  var S = { mode: MODE, externalId: null, externalIdHashed: null, dedupId: null,
            config: CFG, comparison: null, capi: null, ip: null };
  window.__SFERE = S;

  // Which networks this page actually runs. Cookies from anything else on this host
  // belong to another site and must not be counted as ours.
  function activeNetworks() {
    var m = { meta: 'meta', tiktok: 'tiktok', snap: 'snap', ga4: 'google' };
    return Object.keys(m).filter(function (k) { return !!(CFG.pixels || {})[k]; }).map(function (k) { return m[k]; });
  }

  function emit(n, d) { try { window.dispatchEvent(new CustomEvent('sfere:' + n, { detail: d })); } catch (e) {} }
  function uuid() { return (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
    : 'x-' + Date.now() + '-' + Math.random().toString(36).slice(2); }

  async function sha256Hex(s) {
    if (!(window.crypto && crypto.subtle)) return null;
    var b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(s)));
    return Array.from(new Uint8Array(b)).map(function (x) { return x.toString(16).padStart(2, '0'); }).join('');
  }

  async function lookupIp() {
    if (!CFG.ipEcho) return null;
    try {
      var r = await fetch(CFG.ipEcho, { cache: 'no-store' });
      var j = await r.json();
      return j.ip || null;
    } catch (e) { return null; }
  }

  // --- pixels ---------------------------------------------------------------

  function loadMeta(id, externalId) {
    if (!id) return;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    if (externalId) fbq('init', id, { external_id: externalId });  // MUST be the first init
    else fbq('init', id);
  }
  function loadTikTok(code) {
    if (!code) return;
    /* eslint-disable */
    !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=d.createElement("script");o.type="text/javascript",o.async=!0,o.src=r+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load(code)}(window,document,'ttq');
    /* eslint-enable */
  }
  function loadSnap(id) {
    if (!id) return;
    /* eslint-disable */
    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script',r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u)})(window,document,'https://sc-static.net/scevent.min.js');
    /* eslint-enable */
    // The Snap web pixel has no external_id field. Snap identity is server-side only.
    snaptr('init', id, {});
  }
  function loadGoogle(id, clientId) {
    if (!id) return;
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    // Pin the client id rather than letting the tag mint its own, so the value the other
    // networks receive as external_id is the same one the warehouse export is keyed on.
    gtag('config', id, clientId ? { client_id: clientId } : {});
  }

  // --- the conversions-API half, using the real shipped destination code -----

  var TO_CLIENT_IDS = { _fbp: 'fbp', _fbc: 'fbc', _ttp: 'ttp', ttclid: 'ttclid',
    _scid: 'scid', ScCid: 'scclid', gclid: 'gclid', gbraid: 'gbraid', wbraid: 'wbraid',
    li_fat_id: 'li_fat_id', _epik: 'epik', msclkid: 'msclkid' };

  async function buildCapi(live) {
    if (!window.SfereCAPI) return null;
    var clientIds = {};
    Object.keys(live).forEach(function (k) { if (TO_CLIENT_IDS[k]) clientIds[TO_CLIENT_IDS[k]] = live[k].value; });

    var event = {
      type: 'page', properties: { sfere_event_id: S.dedupId },
      anonymousId: S.externalId, messageId: S.dedupId,
      timestamp: new Date().toISOString(), sentAt: new Date().toISOString(),
      context: { library: { name: 'sfere-tag', version: '0.1.0', env: 'browser' },
        userAgent: navigator.userAgent, locale: navigator.language || 'en-US', traits: {},
        page: { url: location.href, title: document.title },
        clientIds: clientIds, campaign: {}, ip: S.ip || undefined, geo: {} },
    };

    var out = {};
    var props = {
      meta: { pixelId: CFG.pixels.meta || 'PIXEL', accessToken: 'NOT-IN-BROWSER', events: '*' },
      tiktok: { pixelCode: CFG.pixels.tiktok || 'PIXEL', accessToken: 'NOT-IN-BROWSER', events: '*' },
      snap: { pixelId: CFG.pixels.snap || 'PIXEL', accessToken: 'NOT-IN-BROWSER', events: '*' },
    };

    for (var name of ['meta', 'tiktok', 'snap']) {
      var captured = [], logged = [];
      var ctx = { props: props[name],
        log: { info: function () {}, warn: function (m) { logged.push(m); }, debug: function () {},
               error: function (m) { logged.push(m); } },
        // Stubbed on purpose: the payload is built by the real code and shown, never sent.
        fetch: async function (u, o) { captured.push({ url: String(u), body: o && o.body }); 
          return { ok: true, status: 200, text: async function () { return '{}'; } }; } };
      try {
        await window.SfereCAPI.destinations[name](JSON.parse(JSON.stringify(event)), ctx);
      } catch (e) { logged.push(e.name + ': ' + e.message); }

      if (!captured.length) {
        out[name] = { dropped: true, dropReason: logged.join(' | ') || 'no call (filtered)' };
      } else {
        var body = null; try { body = JSON.parse(captured[0].body); } catch (e) { body = captured[0].body; }
        out[name] = { dropped: false, request: { url: String(captured[0].url).replace(/access_token=[^&]+/, 'access_token=****'), body: body } };
      }
    }
    return { event: event, results: out };
  }

  // --- sequence -------------------------------------------------------------

  async function run() {
    S.dedupId = uuid();
    emit('config', CFG);

    var externalId = null, hashed = null, ing = null;

    if (MODE === 'sfere') {
      // 1. Settle the analytics client id BEFORE anything else. It is the external id.
      var cid = window.SfereStore.ensureAnalyticsClientId();
      externalId = cid.id;
      S.externalId = externalId;
      S.externalIdSource = cid.source;
      ing = window.SfereStore.ingest(activeNetworks());   // click ids off the URL, before pixels
      hashed = await sha256Hex(externalId);
      S.externalIdHashed = hashed;
      S.comparison = window.SfereStore.comparison(ing.graph, ing.cookies, activeNetworks());
      // the panel reads S.bootstrap for the identity card
      S.bootstrap = { externalId: externalId, externalIdHashed: hashed,
        isNewVisitor: idres.isNew, pageviews: ing.graph.pageviews, comparison: S.comparison };
      emit('bootstrap', { externalId: externalId, externalIdHashed: hashed,
        isNewVisitor: idres.isNew, pageviews: ing.graph.pageviews, comparison: S.comparison });
    }

    // 2. Analytics first, pinned to that id, then the rest all carrying the same value.
    loadGoogle(CFG.pixels.ga4, externalId);
    loadMeta(CFG.pixels.meta, externalId);   // external_id on the FIRST init, or Meta ignores it
    loadTikTok(CFG.pixels.tiktok);
    loadSnap(CFG.pixels.snap);

    if (window.ttq && hashed) ttq.identify({ external_id: hashed });   // SHA-256 required

    if (window.fbq) fbq('track', 'PageView', {}, { eventID: S.dedupId });
    if (window.ttq) ttq.page();
    if (window.snaptr) snaptr('track', 'PAGE_VIEW', { client_dedup_id: S.dedupId });

    emit('pixels', { externalId: externalId, hashed: hashed, dedupId: S.dedupId });

    if (MODE !== 'sfere') return;

    S.ip = await lookupIp();

    // Let the pixels write their cookies, then re-read and build the server-side payload.
    setTimeout(async function () {
      var again = window.SfereStore.ingest(activeNetworks());
      S.comparison = window.SfereStore.comparison(again.graph, again.cookies, activeNetworks());
      var live = window.SfereStore.bundle(again.graph, activeNetworks()).live;
      S.capi = await buildCapi(live);
      emit('collect', { comparison: S.comparison, capi: S.capi, ip: S.ip });
    }, 2200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
