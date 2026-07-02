const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');
const errs = [];
const vc = new VirtualConsole();
vc.on('jsdomError', function (e) { errs.push(String((e.detail && e.detail.message) || e.message).slice(0, 160)); });
const dom = new JSDOM(fs.readFileSync('tub-app.html', 'utf8'), {
  runScripts: 'dangerously', resources: 'usable',
  url: 'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html', virtualConsole: vc,
  beforeParse: function (w) {
    w.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } };
    w.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
    w.matchMedia = function (q) { return { matches: false, media: q, addEventListener() {}, removeEventListener() {} }; };
    w.scrollTo = function () {}; w.requestAnimationFrame = function (cb) { setTimeout(function () { cb(0); }, 0); };
    w.localStorage = { getItem: function () { return null; }, setItem: function () {}, removeItem: function () {} };
  }
});
setTimeout(function () {
  var w = dom.window, d = w.document;
  var out = [];
  out.push('fav-btn on cards: ' + d.querySelectorAll('.card .fav-btn').length);
  // toggle favourite
  w.toggleFav('carbonara');
  var b = d.querySelector('.fav-btn[data-slug="carbonara"]');
  out.push('toggle carbonara: btn.on=' + b.classList.contains('on') + ' text=' + b.textContent);
  // My Cookbook
  d.querySelector('.occ-btn[data-occ="favs"]').click();
  var carbInFavs = [].slice.call(d.querySelectorAll('#grid .card')).some(function (c) { return /openRecipe\('carbonara'\)/.test(c.getAttribute('onclick') || ''); });
  var secs = [].slice.call(d.querySelectorAll('#grid h3')).map(function (h) { return h.textContent; }).join(' / ');
  out.push('My Cookbook sections: ' + secs);
  out.push('carbonara in Saved: ' + carbInFavs);
  // cook finish -> recently cooked
  w.startCook('salmon'); w.exitCook();
  d.querySelector('.occ-btn[data-occ="favs"]').click();
  var hasRecent = [].slice.call(d.querySelectorAll('#grid h3')).some(function (h) { return /Recently cooked/.test(h.textContent); });
  var salmonInRecent = [].slice.call(d.querySelectorAll('#grid .card')).some(function (c) { return /openRecipe\('salmon'\)/.test(c.getAttribute('onclick') || ''); });
  out.push('Recently-cooked section: ' + hasRecent + ' | salmon in recent: ' + salmonInRecent);
  // unfavorite
  w.toggleFav('carbonara'); d.querySelector('.occ-btn[data-occ="favs"]').click();
  out.push('after unfavorite — Saved empty-state: ' + !!d.querySelector('#grid .empty'));
  console.log(out.join('\n'));
  console.log('JS ERRORS (' + errs.length + '): ' + (errs.length ? errs.slice(0, 3).join('\n  ') : 'none OK'));
  process.exit(0);
}, 2800);
