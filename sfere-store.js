/*
 * The capture layer, entirely in the browser.
 *
 * On static hosting there is no server, so two things behave differently from production
 * and the panel says so rather than hiding it:
 *
 *   1. The visitor id cookie is written by JavaScript, not by a server as HttpOnly.
 *      Safari and every browser on iOS cap a document.cookie write at seven days. That is
 *      precisely the durability problem the production design solves, and this page is
 *      subject to it. Treat the id here as a demonstration, not as the durable article.
 *   2. A browser cannot see its own public IP. Meta and Snapchat both count IP plus
 *      user-agent as a matching signal, and Snapchat refuses a payload without one, so we
 *      fetch it from a public echo as a stand-in for what a server would already know.
 *
 * Everything else is what the production capture layer does: read the click identifiers
 * off the landing URL, which a cookie-reading tag never looks at, and keep them past the
 * page they arrived on with an expiry.
 */
(function () {
  'use strict';

  var KEY = 'sfere_graph_v1';
  var ID_KEY = 'sfere_id';

  var CLICK_IDS = [
    { param: 'fbclid', platform: 'meta', ttlDays: 90, ttlBasis: 'documented' },
    { param: 'gclid', platform: 'google', ttlDays: 90, ttlBasis: 'documented' },
    { param: 'gbraid', platform: 'google', ttlDays: 90, ttlBasis: 'documented' },
    { param: 'wbraid', platform: 'google', ttlDays: 90, ttlBasis: 'documented' },
    { param: 'ttclid', platform: 'tiktok', ttlDays: 7, ttlBasis: 'documented' },
    { param: 'ScCid', platform: 'snap', ttlDays: 28, ttlBasis: 'assumption' },
    { param: 'li_fat_id', platform: 'linkedin', ttlDays: 30, ttlBasis: 'assumption' },
    { param: 'twclid', platform: 'x', ttlDays: 30, ttlBasis: 'assumption' },
    { param: 'msclkid', platform: 'microsoft', ttlDays: 90, ttlBasis: 'assumption' },
    { param: 'epik', platform: 'pinterest', ttlDays: 30, ttlBasis: 'assumption' },
    { param: 'rdt_cid', platform: 'reddit', ttlDays: 30, ttlBasis: 'assumption' },
  ];

  var NETWORK_COOKIES = {
    meta: ['_fbp', '_fbc'], tiktok: ['_ttp'], snap: ['_scid'],
    google: ['_ga', '_gcl_aw'], linkedin: ['li_fat_id'], pinterest: ['_epik'],
  };

  // What a default collection tag reads, with no extra configuration.
  var DEFAULT_TAG_READS = ['_fbp', '_fbc', '_ga', '_ga_*'];

  function readCookies() {
    var out = {};
    String(document.cookie || '').split(';').forEach(function (p) {
      var i = p.indexOf('='); if (i < 0) return;
      var k = p.slice(0, i).trim(); if (k) out[k] = decodeURIComponent(p.slice(i + 1).trim());
    });
    return out;
  }

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || { identifiers: {}, pageviews: 0, firstSeen: Date.now() }; }
    catch (e) { return { identifiers: {}, pageviews: 0, firstSeen: Date.now() }; }
  }
  function save(g) { try { localStorage.setItem(KEY, JSON.stringify(g)); } catch (e) {} }

  function ensureId() {
    var id = null;
    try { id = localStorage.getItem(ID_KEY); } catch (e) {}
    if (!id) id = readCookies()[ID_KEY] || null;
    var isNew = !id;
    if (!id) id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'x-' + Date.now() + '-' + Math.random().toString(36).slice(2);
    try { localStorage.setItem(ID_KEY, id); } catch (e) {}
    // JS-set, so ITP-capped. In production this is a server Set-Cookie with HttpOnly.
    document.cookie = ID_KEY + '=' + id + ';path=/;max-age=' + (60 * 60 * 24 * 400) + ';SameSite=Lax';
    return { id: id, isNew: isNew };
  }

  function buildFbc(fbclid, host, now) {
    var parts = String(host || '').split('.').filter(Boolean);
    return 'fb.' + Math.max(0, parts.length - 1) + '.' + (now || Date.now()) + '.' + fbclid;
  }

  function upsert(g, key, value, meta, now) {
    if (!value) return null;
    var cur = g.identifiers[key];
    var expiresAt = now + (meta.ttlDays || 400) * 86400000;
    if (!cur) {
      g.identifiers[key] = { value: value, source: meta.source, platform: meta.platform || null,
        ttlDays: meta.ttlDays, ttlBasis: meta.ttlBasis || null, firstSeen: now, lastSeen: now,
        expiresAt: expiresAt, reused: 0 };
      return 'new';
    }
    cur.lastSeen = now; cur.expiresAt = expiresAt;
    if (cur.value === value) { cur.reused += 1; return 'reused'; }
    cur.value = value; cur.source = meta.source; return 'rotated';
  }

  /** Take a page view: click ids off the URL, plus whatever cookies the pixels have set. */
  function ingest(activeNetworks) {
    var now = Date.now();
    var g = load();
    g.pageviews = (g.pageviews || 0) + 1;
    var cookies = readCookies();
    var q = new URLSearchParams(location.search);
    var delta = {};
    var active = activeNetworks || Object.keys(NETWORK_COOKIES);

    CLICK_IDS.filter(function (d) { return active.indexOf(d.platform) >= 0; }).forEach(function (def) {
      var v = q.get(def.param);
      if (v) delta[def.param] = upsert(g, def.param, v, {
        source: 'landing-url', platform: def.platform, ttlDays: def.ttlDays, ttlBasis: def.ttlBasis }, now);
    });

    var fbclid = active.indexOf('meta') >= 0 ? q.get('fbclid') : null;
    if (fbclid && !cookies._fbc) {
      delta._fbc = upsert(g, '_fbc', buildFbc(fbclid, location.hostname, now),
        { source: 'derived-from-fbclid', platform: 'meta', ttlDays: 90, ttlBasis: 'documented' }, now);
    }

    // A cookie from a network this page does not run was set by something else on this
    // host. Counting it would overstate what the capture layer achieved.
    Object.keys(NETWORK_COOKIES).filter(function (p) { return active.indexOf(p) >= 0; }).forEach(function (platform) {
      NETWORK_COOKIES[platform].forEach(function (name) {
        if (cookies[name]) delta[name] = upsert(g, name, cookies[name],
          { source: 'network-cookie', platform: platform, ttlDays: 90, ttlBasis: 'assumption' }, now);
      });
    });

    save(g);
    return { graph: g, delta: delta, cookies: cookies };
  }

  function bundle(g) {
    var now = Date.now(), live = {}, expired = {};
    Object.keys(g.identifiers).forEach(function (k) {
      var v = g.identifiers[k];
      (v.expiresAt > now ? live : expired)[k] = {
        value: v.value, source: v.source, platform: v.platform, ttlDays: v.ttlDays,
        ttlBasis: v.ttlBasis, reused: v.reused,
        expiresInDays: Math.max(0, Math.round((v.expiresAt - now) / 86400000)) };
    });
    return { live: live, expired: expired };
  }

  /** The comparison that carries the argument: default tag vs capture layer, same visitor. */
  function comparison(g, cookies, activeNetworks) {
    var active = activeNetworks || Object.keys(NETWORK_COOKIES);
    var baseline = {};
    // What a DEFAULT tag would hold: Meta's two cookies and the analytics ids, and only
    // for networks this page actually runs.
    if (active.indexOf('meta') >= 0) ['_fbp', '_fbc'].forEach(function (n) { if (cookies[n]) baseline[n] = cookies[n]; });
    if (active.indexOf('google') >= 0) Object.keys(cookies).forEach(function (k) { if (k === '_ga' || k.indexOf('_ga_') === 0) baseline[k] = cookies[k]; });

    var live = bundle(g).live, enriched = {};
    Object.keys(live).forEach(function (k) { enriched[k] = live[k].value; });
    var gained = Object.keys(enriched).filter(function (k) { return !(k in baseline); });

    return {
      baseline: { identifiers: baseline, count: Object.keys(baseline).length,
        note: 'what a default collection tag holds: ' + DEFAULT_TAG_READS.join(', ') },
      enriched: { identifiers: enriched, count: Object.keys(enriched).length },
      gained: gained,
      gainedDetail: gained.map(function (k) {
        return { key: k, source: live[k].source, platform: live[k].platform,
          whyMissed: live[k].source === 'landing-url'
            ? 'arrives as a URL parameter; a cookie-reading tag never looks there'
            : live[k].source === 'derived-from-fbclid'
              ? 'has to be constructed from the click id; nothing does it by default'
              : 'a cookie the default tag is not configured to read' };
      }),
    };
  }

  function reset() {
    try { localStorage.removeItem(KEY); localStorage.removeItem(ID_KEY); } catch (e) {}
    document.cookie = ID_KEY + '=;path=/;max-age=0';
  }

  window.SfereStore = { ensureId: ensureId, ingest: ingest, bundle: bundle,
    comparison: comparison, reset: reset, readCookies: readCookies, CLICK_IDS: CLICK_IDS };
})();
