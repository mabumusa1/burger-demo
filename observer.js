/*
 * Outbound observer. Records every request the page makes, without blocking any of it.
 *
 * The pixels must actually fire: that is how they set _fbp, _ttp and _scid, which are the
 * identifiers the networks match on. So unlike a sandbox, this watches and reports.
 *
 * Must be the first script on the page, before any pixel defines itself.
 */
(function () {
  'use strict';

  var NETWORKS = [
    { key: 'meta',   label: 'Meta',      match: /facebook\.com|fbcdn|connect\.facebook/ },
    { key: 'tiktok', label: 'TikTok',    match: /tiktok\.com|ttcdn|analytics\.tiktok/ },
    { key: 'snap',   label: 'Snapchat',  match: /snapchat\.com|sc-static/ },
    { key: 'google', label: 'Google',    match: /google-analytics\.com|analytics\.google|googletagmanager|doubleclick|google\.com\/(pagead|ads)/ },
  ];

  var log = [];
  window.__SFERE_NET = log;

  function classify(url) {
    for (var i = 0; i < NETWORKS.length; i++) if (NETWORKS[i].match.test(url)) return NETWORKS[i];
    return null;
  }

  function isBeacon(url) {
    // The request that carries identifiers, as opposed to the one that loads the library.
    return /\/tr\/?\?|\/tr\b|\/api\/v2\/pixel|tr\.snapchat\.com|\/g\/collect|\/collect\?|\/pagead\//.test(url);
  }

  function decode(url) {
    try {
      var u = new URL(url, location.href);
      var params = {};
      u.searchParams.forEach(function (v, k) { params[k] = v; });
      return { host: u.host, path: u.pathname, params: params };
    } catch (e) { return { host: '', path: String(url), params: {} }; }
  }

  function record(method, url, body) {
    var s = String(url);
    var net = classify(s);
    if (!net) return;
    var entry = {
      at: Date.now(), method: method, network: net.key, label: net.label,
      beacon: isBeacon(s), url: s, decoded: decode(s), body: body || null,
    };
    log.push(entry);
    try {
      window.dispatchEvent(new CustomEvent('sfere:net', { detail: entry }));
    } catch (e) {}
  }

  // fetch
  var _fetch = window.fetch;
  if (_fetch) {
    window.fetch = function (input, init) {
      try {
        var u = typeof input === 'string' ? input : (input && input.url) || String(input);
        record((init && init.method) || 'GET', u, init && init.body ? String(init.body).slice(0, 4000) : null);
      } catch (e) {}
      return _fetch.apply(this, arguments);
    };
  }

  // XMLHttpRequest
  var _open = XMLHttpRequest.prototype.open;
  var _send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (m, u) { this.__sfM = m; this.__sfU = u; return _open.apply(this, arguments); };
  XMLHttpRequest.prototype.send = function (b) {
    try { record(this.__sfM || 'GET', this.__sfU, b ? String(b).slice(0, 4000) : null); } catch (e) {}
    return _send.apply(this, arguments);
  };

  // sendBeacon
  if (navigator.sendBeacon) {
    var _beacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function (u, d) {
      try { record('BEACON', u, d ? String(d).slice(0, 4000) : null); } catch (e) {}
      return _beacon(u, d);
    };
  }

  // <img>, <script>, <iframe> src assignment: how most pixels actually send
  var _create = document.createElement.bind(document);
  document.createElement = function (tag) {
    var el = _create(tag);
    var t = String(tag).toLowerCase();
    if (t === 'img' || t === 'script' || t === 'iframe') {
      try {
        var proto = t === 'img' ? HTMLImageElement : t === 'script' ? HTMLScriptElement : HTMLIFrameElement;
        var desc = Object.getOwnPropertyDescriptor(proto.prototype, 'src');
        if (desc && desc.set) {
          Object.defineProperty(el, 'src', {
            configurable: true,
            get: function () { return desc.get.call(this); },
            set: function (v) { try { record('GET(' + t + ')', v, null); } catch (e) {} desc.set.call(this, v); },
          });
        }
      } catch (e) {}
    }
    return el;
  };

  // new Image().src
  var _Image = window.Image;
  window.Image = function () {
    var img = new _Image();
    try {
      var d = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
      Object.defineProperty(img, 'src', {
        configurable: true,
        get: function () { return d.get.call(this); },
        set: function (v) { try { record('GET(img)', v, null); } catch (e) {} d.set.call(this, v); },
      });
    } catch (e) {}
    return img;
  };
})();
