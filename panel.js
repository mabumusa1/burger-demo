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
      rows.push(['first-party id', '<span class="bad">none minted</span>']);
      rows.push(['sent to pixels', '<span class="bad">nothing</span>']);
    } else if (b) {
      rows.push(['first-party id', '<code>' + esc(b.externalId) + '</code>']);
      rows.push(['on the wire (SHA-256)', '<code class="small">' + esc(short(b.externalIdHashed, 32)) + '</code>']);
      rows.push(['visitor', b.isNewVisitor ? 'new' : 'returning, page view ' + b.pageviews]);
      rows.push(['cookie', '<span class="bad">JavaScript-set</span> <span class="hint">static hosting; server-set HttpOnly in production</span>']);
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
  window.addEventListener('sfere:net', function () { renderNet(); });
  window.addEventListener("sfere:collect", function (e) { renderCapi(e.detail.capi, e.detail.ip); renderCompare(e.detail.comparison); });

  renderMode(); renderIdentity(); renderCompare(null);
  setInterval(renderNet, 1500);

  $('resetBtn').addEventListener('click', function (ev) {
    ev.preventDefault();
    if (window.SfereStore) window.SfereStore.reset();
    location.href = './';
  });
})();
