(function () {
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  // Copy buttons on every code block
  document.querySelectorAll('.code').forEach(function (block) {
    var btn = document.createElement('button');
    btn.className = 'copy';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var text = block.querySelector('code').innerText;
      var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy'; }, 1500); };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done, function () { btn.textContent = 'Select it'; });
      } else { btn.textContent = 'Select it'; }
    });
    block.appendChild(btn);
  });

  // OS tabs. All tab groups switch together, and the choice is remembered.
  var groups = document.querySelectorAll('.tabs');
  function show(os) {
    groups.forEach(function (g) {
      var has = g.querySelector('.tab-panel[data-os="' + os + '"]');
      var pick = has ? os : g.querySelector('.tab-panel').getAttribute('data-os');
      g.querySelectorAll('.tab-list button').forEach(function (b) {
        b.setAttribute('aria-selected', b.getAttribute('data-os') === pick ? 'true' : 'false');
      });
      g.querySelectorAll('.tab-panel').forEach(function (p) {
        p.hidden = p.getAttribute('data-os') !== pick;
      });
    });
    try { localStorage.setItem('os', os); } catch (e) {}
  }
  groups.forEach(function (g) {
    g.querySelectorAll('.tab-list button').forEach(function (b) {
      b.addEventListener('click', function () { show(b.getAttribute('data-os')); });
    });
  });
  if (groups.length) {
    var saved = null;
    try { saved = localStorage.getItem('os'); } catch (e) {}
    if (!saved) {
      var ua = navigator.userAgent;
      saved = /Windows/.test(ua) ? 'win' : /Mac/.test(ua) ? 'mac' : /Linux/.test(ua) ? 'linux' : 'mac';
    }
    show(saved);
  }

  // Break-even calculator
  var calc = document.getElementById('calc');
  if (calc) {
    var plan = document.getElementById('calc-plan');
    var monthly = document.getElementById('calc-monthly');
    var hw = document.getElementById('calc-hw');
    var power = document.getElementById('calc-power');
    var out = document.getElementById('calc-out');
    var money = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
    plan.addEventListener('change', function () { if (plan.value) { monthly.value = plan.value; } run(); });
    function run() {
      var m = parseFloat(monthly.value) || 0;
      var h = parseFloat(hw.value) || 0;
      var p = parseFloat(power.value) || 0;
      var net = m - p;
      var text;
      if (m <= 0) {
        text = 'Enter what you pay each month.';
      } else if (net <= 0) {
        text = 'With these numbers the local setup costs as much as the subscription each month, so it never pays for itself.';
      } else if (h <= 0) {
        text = 'You save <strong>' + money(net) + ' a month</strong> from day one, which is <strong>' + money(net * 12) + ' a year</strong>.';
      } else {
        var months = h / net;
        text = 'You break even after <strong>' + (Math.ceil(months * 10) / 10) + ' months</strong>' +
          (months > 36 ? ' (that is over three years, so think twice before buying)' : '') +
          '. After that you save <strong>' + money(net * 12) + ' a year</strong>. Over three years you come out ' +
          (net * 36 - h >= 0 ? '<strong>' + money(net * 36 - h) + ' ahead</strong>.' : '<strong>' + money(h - net * 36) + ' behind</strong>.');
      }
      out.innerHTML = text;
    }
    [monthly, hw, power].forEach(function (el) { el.addEventListener('input', run); });
    run();
  }

  var y = document.getElementById('year');
  if (y) { y.textContent = new Date().getFullYear(); }
})();
