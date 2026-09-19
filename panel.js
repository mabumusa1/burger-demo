/* The instrumentation rail. Renders what the capture layer and the pixels are doing. */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); };
  var short = function (s, n) { s = String(s == null ? '' : s); return s.length > (n || 44) ? s.slice(0, n || 44) + '…' : s; };

  var S = window.__SFERE;

  function renderMode() {
    var baseline = S.mode === 'baseline';
    $('modeLine').innerHTML = baseline
      ? '<b class="bad">Baseline</b> · ordinary pixel install, no capture layer'
      : '<b class="good">Capture layer on</b> · first-party id, click IDs kept, server-side copy';
    var t = $('toggleMode');
    t.textContent = baseline ? 'turn the capture layer on' : 'compare against a plain install';
    t.href = baseline ? './' + location.search.replace(/[?&]mode=baseline/, '').replace(/^&/, '?')
                      : './?mode=baseline' + location.search.replace(/^\?/, '&');
  }

  function renderIdentity() {
    var b = S.bootstrap;
    var rows = [];
    if (S.mode === 'baseline') {
      rows.push(['analytics client_id', '<span class="bad">not taken over</span>']);
      rows.push(['sent to pixels', '<span class="bad">nothing</span>']);
    } else if (b) {
      rows.push(['analytics client_id', '<code>' + esc(b.externalId) + '</code>']);
      rows.push(['source', '<span class="sub">' + esc(b.externalIdSource || '') + '</span>']);
      rows.push(['sent as external_id', '<code class="small">' + esc(short(b.externalIdHashed, 32)) + '</code>']);
      rows.push(['page view', String(b.pageviews || 1)]);
    }
    rows.push(['dedup id', '<code class="small">' + esc(short(S.dedupId, 28)) + '</code>']);
    $('identity').innerHTML = rows.map(function (r) {
      return '<dt>' + r[0] + '</dt><dd>' + r[1] + '</dd>'; }).join('');
  }

  function renderCompare(cmp) {
    if (!cmp) {
      $('compare').innerHTML = S.mode === 'baseline'
        ? '<p class="muted">No capture layer running, so there is nothing to compare. ' +
          'Switch mode to see the difference on the same browser.</p>'
        : '<p class="muted">waiting…</p>';
      return;
    }
    var html = '<div class="scores">' +
      '<div class="score"><span class="n bad">' + cmp.baseline.count + '</span><span class="l">default tag</span></div>' +
      '<div class="arrow">→</div>' +
      '<div class="score"><span class="n good">' + cmp.enriched.count + '</span><span class="l">capture layer</span></div>' +
      '</div>';
    html += '<p class="hint">' + esc(cmp.baseline.note) + '</p>';
    if (cmp.gainedDetail && cmp.gainedDetail.length) {
      html += '<table class="gain"><thead><tr><th>gained</th><th>network</th><th>why it was missed</th></tr></thead><tbody>';
      cmp.gainedDetail.forEach(function (g) {
        html += '<tr><td><code>' + esc(g.key) + '</code></td><td>' + esc(g.platform || '') + '</td><td>' + esc(g.whyMissed) + '</td></tr>';
      });
      html += '</tbody></table>';
    } else {
      html += '<p class="muted">No extra identifiers on this visit yet. Try the “arrive from an ad” link.</p>';
    }
    $('compare').innerHTML = html;
  }

  /* The retention argument: what the graph holds that this page view could not supply. */
  function renderRetained() {
    if (!window.SfereStore || S.mode === 'baseline') {
      $('retain').innerHTML = '<p class="muted">No capture layer running, so nothing is retained.</p>';
      return;
    }
    var g;
    try { g = JSON.parse(localStorage.getItem('sfere_graph_v1') || '{}'); } catch (e) { g = {}; }
    if (!g.identifiers) { $('retain').innerHTML = '<p class="muted">nothing carried yet…</p>'; return; }

    var kept = window.SfereStore.retained(g, (S.config && S.config.pixels) ? undefined : undefined);
    var keys = Object.keys(kept);
    if (!keys.length) {
      $('retain').innerHTML = '<p class="muted">Nothing carried on this view. Arrive from an ad, then return with a clean URL.</p>';
      return;
    }
    var html = '<div class="scores"><div class="score"><span class="n good">' + keys.length +
      '</span><span class="l">still available</span></div></div>' +
      '<table class="gain"><thead><tr><th>identifier</th><th>first seen</th><th>expires in</th></tr></thead><tbody>';
    keys.forEach(function (k) {
      var v = kept[k];
      var age = v.firstSeen ? Math.round((Date.now() - v.firstSeen) / 60000) : null;
      html += '<tr><td><code>' + esc(k) + '</code></td><td>' +
        (age === null ? '—' : age < 60 ? age + ' min ago' : Math.round(age / 60) + ' h ago') +
        '</td><td>' + v.expiresInDays + ' d</td></tr>';
    });
    html += '</tbody></table>';
    $('retain').innerHTML = html;
  }

  var NETWORKS = [
    { key: 'meta', label: 'Meta', lib: 'fbq', idSupport: 'pixel' },
    { key: 'tiktok', label: 'TikTok', lib: 'ttq', idSupport: 'pixel' },
    { key: 'snap', label: 'Snapchat', lib: 'snaptr', idSupport: 'server-only' },
    { key: 'google', label: 'Google', lib: 'gtag', idSupport: 'native' },
  ];

  /* The question people actually ask first: is it firing? Answer it at the top. */
  function renderStatus() {
    var cfg = (S.config && S.config.pixels) || {};
    var idKey = { meta: 'meta', tiktok: 'tiktok', snap: 'snap', google: 'ga4' };
    var beacons = (window.__SFERE_NET || []).filter(function (e) { return e.beacon; });
    var hash = S.externalIdHashed;

    var rows = NETWORKS.map(function (n) {
      var configured = !!cfg[idKey[n.key]];
      var loaded = !!window[n.lib];
      var mine = beacons.filter(function (e) { return e.network === n.key; });
      var fired = mine.length;

      var carries = false;
      mine.forEach(function (e) {
        var blob = JSON.stringify(e.decoded.params) + (e.body || '');
        if (hash && blob.indexOf(hash) >= 0) carries = true;
        if (hash && blob.indexOf(hash.slice(0, 24)) >= 0) carries = true;
        if (/external_id/i.test(blob)) carries = true;
      });

      var idCell;
      if (n.idSupport === 'server-only') idCell = '<span class="dot amber" title="Snap web pixel has no external_id field"></span><span class="sub">server only</span>';
      else if (n.idSupport === 'native') idCell = '<span class="dot grey"></span><span class="sub">native match</span>';
      else idCell = carries ? '<span class="dot on"></span><span class="sub">carried</span>'
                            : '<span class="dot off"></span><span class="sub">no</span>';

      if (!configured) {
        return '<tr class="off-row"><td>' + n.label + '</td><td colspan="3"><span class="sub">no pixel id configured</span></td></tr>';
      }
      return '<tr>' +
        '<td><b>' + n.label + '</b></td>' +
        '<td><span class="dot ' + (loaded ? 'on' : 'off') + '"></span><span class="sub">' + (loaded ? 'loaded' : 'not loaded') + '</span></td>' +
        '<td><span class="dot ' + (fired ? 'on' : 'off') + '"></span><span class="sub">' + (fired ? fired + ' sent' : 'none') + '</span></td>' +
        '<td>' + idCell + '</td></tr>';
    });

    $('status').innerHTML = '<table class="status-tbl"><thead><tr><th></th><th>library</th><th>beacon</th><th>our id</th></tr></thead><tbody>'
      + rows.join('') + '</tbody></table>';
  }

  /* What the Jitsu tracker actually put on the wire, per variant. */
  function renderJitsu() {
    var recs = window.__SFERE_JITSU || [];
    if (!recs.length) { $('jitsu').innerHTML = '<p class="muted">fires a few seconds after the pixels…</p>'; return; }
    var byVariant = {};
    recs.forEach(function (r) { byVariant[r.variant] = r; });

    var html = '';
    ['default', 'configured'].forEach(function (v) {
      var r = byVariant[v];
      if (!r) return;
      var ids = r.clientIds || {};
      var keys = Object.keys(ids).filter(function (k) { return ids[k]; });
      html += '<div class="req ' + (v === 'configured' ? 'carries' : '') + '">' +
        '<div class="req-h"><span class="tag ' + (v === 'configured' ? 'meta' : '') + '">' +
        (v === 'configured' ? 'cookieCapture configured' : 'default install') + '</span>' +
        '<span class="pill ' + (keys.length > 2 ? 'good' : 'bad') + '">' + keys.length + ' clientIds</span>' +
        (r.delivery ? '<span class="pill">' + esc(r.delivery) + '</span>' : '') + '</div>' +
        (keys.length ? '<ul class="kv">' + keys.map(function (k) {
          return '<li class="hit"><code>' + esc(k) + '</code> ' + esc(short(typeof ids[k] === 'object' ? JSON.stringify(ids[k]) : ids[k], 26)) + '</li>';
        }).join('') + '</ul>' : '<p class="muted">none</p>') + '</div>';
    });

    var d = byVariant['default'], c = byVariant['configured'];
    if (d && c) {
      var dn = Object.keys(d.clientIds || {}).filter(function (k) { return d.clientIds[k]; }).length;
      var cn = Object.keys(c.clientIds || {}).filter(function (k) { return c.clientIds[k]; }).length;
      html += '<p class="hint">Same tracker, same page, same moment: <b>' + dn + '</b> identifiers with the ' +
        'default config, <b>' + cn + '</b> once it is told which cookies exist. Neither reads the landing URL, ' +
        'so the click identifiers are in neither.</p>';
    }
    $('jitsu').innerHTML = html;
  }

  var seen = [];
  function renderNet() {
    var list = (window.__SFERE_NET || []).filter(function (e) { return e.beacon; });
    if (!list.length) { $('net').innerHTML = '<p class="muted">none yet…</p>'; return; }
    var idHash = S.externalIdHashed, idRaw = S.externalId;
    $('net').innerHTML = list.slice(-12).reverse().map(function (e) {
      var carries = false, shown = [];
      Object.keys(e.decoded.params).forEach(function (k) {
        var v = e.decoded.params[k];
        var isId = (idHash && String(v).indexOf(idHash.slice(0, 24)) >= 0) ||
                   (idRaw && String(v).indexOf(idRaw) >= 0) ||
                   /external_id|ud\[external_id\]|eid|client_dedup_id/i.test(k);
        if (isId) carries = true;
        if (isId || /^(ev|event|id|eid|external|ud\[)/i.test(k)) shown.push([k, v, isId]);
      });
      var body = e.body && /external_id/.test(e.body) ? true : false;
      if (body) carries = true;
      return '<div class="req ' + (carries ? 'carries' : '') + '">' +
        '<div class="req-h"><span class="tag ' + e.network + '">' + esc(e.label) + '</span>' +
        '<span class="path">' + esc(short(e.decoded.host + e.decoded.path, 38)) + '</span>' +
        (carries ? '<span class="pill good">carries our id</span>' : '') + '</div>' +
        (shown.length ? '<ul class="kv">' + shown.slice(0, 6).map(function (p) {
          return '<li class="' + (p[2] ? 'hit' : '') + '"><code>' + esc(p[0]) + '</code> ' + esc(short(p[1], 30)) + '</li>';
        }).join('') + '</ul>' : '') + '</div>';
    }).join('');
  }

  function renderCapi(col, ip) {
    if (!col) return;
    $('sendModeHint').textContent = 'Built by the real shipped destination code running in this page, then intercepted. '
      + (ip ? 'Client IP supplied by a public echo, standing in for the server.' : 'No client IP available, so Snapchat will refuse: it requires IP plus user-agent.');
    var html = '';
    Object.keys(col.results).forEach(function (n) {
      var r = col.results[n];
      if (r.skipped) { html += '<div class="req"><div class="req-h"><span class="tag ' + n + '">' + n + '</span><span class="pill">not configured</span></div></div>'; return; }
      if (r.dropped) {
        html += '<div class="req dropped"><div class="req-h"><span class="tag ' + n + '">' + n + '</span><span class="pill bad">rejected</span></div>' +
          '<p class="drop">' + esc(r.dropReason) + '</p></div>';
        return;
      }
      var b = r.request && r.request.body;
      var u = b && b.data && b.data[0] ? (b.data[0].user_data || b.data[0].user) : null;
      html += '<div class="req carries"><div class="req-h"><span class="tag ' + n + '">' + n + '</span>' +
        '<span class="pill good">' + (col.sendMode === 'live' ? 'sent' : 'built') + '</span></div>' +
        (u ? '<pre>' + esc(JSON.stringify(u, null, 1)) + '</pre>' : '') + '</div>';
    });
    $('capi').innerHTML = html || '<p class="muted">nothing built</p>';
  }

  window.addEventListener('sfere:bootstrap', function (e) {
    renderIdentity(); renderCompare(e.detail.comparison);
  });
  window.addEventListener('sfere:pixels', function () { renderIdentity(); setTimeout(renderNet, 400); });
  window.addEventListener('sfere:net', function () { renderNet(); renderStatus(); });
  window.addEventListener('sfere:jitsu', function () { renderJitsu(); });
  window.addEventListener("sfere:collect", function (e) { renderCapi(e.detail.capi, e.detail.ip); renderCompare(e.detail.comparison); });

  // If the previous action was a reset, say plainly what it could and could not clear.
  try {
    var rep = sessionStorage.getItem('sfere_reset_report');
    if (rep) {
      var r = JSON.parse(rep);
      sessionStorage.removeItem('sfere_reset_report');
      var msg = r.remaining && r.remaining.length
        ? '<span class="bad">Cleared ' + r.attempted.length + ', but ' + r.remaining.length +
          ' survived</span> <span class="sub">' + esc(r.remaining.join(', ')) + '</span>'
        : '<span class="good">Cleared ' + r.attempted.length + ' cookies, none left</span>';
      $('modeLine').insertAdjacentHTML('afterend', '<p class="mode">' + msg + '</p>');
    }
  } catch (e) {}

  renderMode(); renderIdentity(); renderCompare(null); renderStatus(); renderRetained();
  renderJitsu();
  setInterval(function () { renderNet(); renderStatus(); renderJitsu(); renderRetained(); }, 1200);

  $('resetBtn').addEventListener('click', function (ev) {
    ev.preventDefault();
    var r = window.SfereStore ? window.SfereStore.reset() : null;
    // Report in the page, never a modal: a dialog blocks everything else on the page.
    if (r) {
      try { sessionStorage.setItem('sfere_reset_report', JSON.stringify(r)); } catch (e) {}
    }
    location.href = './';
  });
})();
