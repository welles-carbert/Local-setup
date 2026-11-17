/* Local Setup - Shared static client script */

(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* OS Switcher Tabs */
  var tabLists = document.querySelectorAll('.tab-list');
  var allPanels = document.querySelectorAll('.tab-panel');

  function detectOS() {
    var stored = null;
    try {
      stored = localStorage.getItem('preferred-os');
    } catch (e) {}
    if (stored && (stored === 'mac' || stored === 'win' || stored === 'linux')) {
      return stored;
    }
    var nav = (navigator.userAgent || navigator.platform || '').toLowerCase();
    if (nav.indexOf('mac') !== -1) return 'mac';
    if (nav.indexOf('win') !== -1) return 'win';
    if (nav.indexOf('linux') !== -1) return 'linux';
    return 'mac';
  }

  function setActiveOS(os, persist) {
    if (persist) {
      try {
        localStorage.setItem('preferred-os', os);
      } catch (e) {}
    }

    var allButtons = document.querySelectorAll('.tab-list button[data-os]');
    for (var i = 0; i < allButtons.length; i++) {
      var btn = allButtons[i];
      var matches = btn.getAttribute('data-os') === os;
      btn.setAttribute('aria-selected', matches ? 'true' : 'false');
      btn.setAttribute('tabindex', matches ? '0' : '-1');
    }

    for (var j = 0; j < allPanels.length; j++) {
      var panel = allPanels[j];
      if (panel.getAttribute('data-os') === os) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    }
  }

  if (tabLists.length > 0 && allPanels.length > 0) {
    var initialOS = detectOS();

    for (var i = 0; i < tabLists.length; i++) {
      var list = tabLists[i];
      list.setAttribute('role', 'tablist');

      var buttons = list.querySelectorAll('button[data-os]');
      for (var b = 0; b < buttons.length; b++) {
        (function (button, index, btnGroup) {
          button.setAttribute('role', 'tab');
          button.addEventListener('click', function () {
            setActiveOS(button.getAttribute('data-os'), true);
          });

          button.addEventListener('keydown', function (e) {
            var targetIndex = -1;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
              targetIndex = (index + 1) % btnGroup.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
              targetIndex = (index - 1 + btnGroup.length) % btnGroup.length;
            } else if (e.key === 'Home') {
              targetIndex = 0;
            } else if (e.key === 'End') {
              targetIndex = btnGroup.length - 1;
            }

            if (targetIndex !== -1) {
              e.preventDefault();
              var targetBtn = btnGroup[targetIndex];
              targetBtn.focus();
              setActiveOS(targetBtn.getAttribute('data-os'), true);
            }
          });
        })(buttons[b], b, buttons);
      }
    }

    for (var p = 0; p < allPanels.length; p++) {
      allPanels[p].setAttribute('role', 'tabpanel');
    }

    setActiveOS(initialOS, false);
  }

  /* Interactive Step Checklist */
  var checkBoxes = document.querySelectorAll('.check');
  var pagePath = window.location.pathname.split('/').pop() || 'index';

  for (var k = 0; k < checkBoxes.length; k++) {
    (function (el, index) {
      var key = 'step-done-' + pagePath + '-' + index;
      var existingHTML = el.innerHTML;
      var isDone = false;

      try {
        isDone = localStorage.getItem(key) === 'true';
      } catch (e) {}

      if (isDone) {
        el.classList.add('is-done');
      }

      var wrapper = document.createElement('label');
      wrapper.className = 'check-toggle';

      var input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = isDone;
      input.setAttribute('aria-label', 'Mark step complete');

      var textSpan = document.createElement('div');
      textSpan.className = 'check-text';
      textSpan.innerHTML = existingHTML;

      wrapper.appendChild(input);
      wrapper.appendChild(textSpan);

      el.innerHTML = '';
      el.appendChild(wrapper);

      input.addEventListener('change', function () {
        var checked = input.checked;
        if (checked) {
          el.classList.add('is-done');
        } else {
          el.classList.remove('is-done');
        }
        try {
          localStorage.setItem(key, checked ? 'true' : 'false');
        } catch (e) {}
      });
    })(checkBoxes[k], k);
  }

  /* Code snippet copy buttons */
  var codeBlocks = document.querySelectorAll('.code');
  for (var c = 0; c < codeBlocks.length; c++) {
    (function (wrapper) {
      if (wrapper.querySelector('.copy')) return;

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy';
      button.setAttribute('aria-label', 'Copy code snippet to clipboard');
      button.textContent = 'Copy';

      button.addEventListener('click', function () {
        var pre = wrapper.querySelector('pre');
        var text = pre ? pre.textContent : '';

        function feedback() {
          button.textContent = 'Copied';
          setTimeout(function () {
            button.textContent = 'Copy';
          }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(feedback, function () {
            fallbackCopy(text, feedback);
          });
        } else {
          fallbackCopy(text, feedback);
        }
      });

      wrapper.appendChild(button);
    })(codeBlocks[c]);
  }

  function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      if (cb) cb();
    } catch (err) {}
    document.body.removeChild(ta);
  }

  /* Calculator on savings.html (#calc) */
  var calcContainer = document.getElementById('calc');
  if (calcContainer) {
    var planSelect = document.getElementById('calc-plan');
    var monthlyInput = document.getElementById('calc-monthly');
    var hwInput = document.getElementById('calc-hw');
    var powerInput = document.getElementById('calc-power');
    var outEl = document.getElementById('calc-out');

    function updateCalc() {
      if (!outEl || !monthlyInput || !hwInput || !powerInput) return;

      var monthly = parseFloat(monthlyInput.value) || 0;
      var hw = parseFloat(hwInput.value) || 0;
      var power = parseFloat(powerInput.value) || 0;

      if (monthly <= 0) {
        outEl.innerHTML = 'Enter what you pay each month to calculate your savings.';
        return;
      }

      var net = monthly - power;

      if (net <= 0) {
        outEl.innerHTML = '<strong>No savings:</strong> electricity ($' + power + '/month) costs as much as or more than your current subscription ($' + monthly + '/month).';
        return;
      }

      var annual = Math.round(net * 12);

      if (hw <= 0) {
        outEl.innerHTML = '<strong>Breaks even immediately.</strong> You save <strong>$' + net + '</strong> a month (about <strong>$' + annual + '</strong> a year) after electricity.';
        return;
      }

      var months = Math.ceil(hw / net);
      if (months === 1) {
        outEl.innerHTML = 'Hardware pays for itself in <strong>1 month</strong>. After that, you save <strong>$' + net + '</strong> a month (about <strong>$' + annual + '</strong> a year).';
      } else if (months < 12) {
        outEl.innerHTML = 'Hardware pays for itself in <strong>' + months + ' months</strong>. After that, you save <strong>$' + net + '</strong> a month (about <strong>$' + annual + '</strong> a year).';
      } else {
        var years = (months / 12).toFixed(1).replace(/\.0$/, '');
        outEl.innerHTML = 'Hardware pays for itself in <strong>' + months + ' months</strong> (about <strong>' + years + ' years</strong>). After that, you save <strong>$' + net + '</strong> a month (about <strong>$' + annual + '</strong> a year).';
      }
    }

    if (planSelect) {
      planSelect.addEventListener('change', function () {
        if (planSelect.value !== '') {
          monthlyInput.value = planSelect.value;
          updateCalc();
        }
      });
    }

    if (monthlyInput) {
      monthlyInput.addEventListener('input', function () {
        if (planSelect) {
          var val = monthlyInput.value;
          var found = false;
          for (var i = 0; i < planSelect.options.length; i++) {
            if (planSelect.options[i].value === val) {
              planSelect.selectedIndex = i;
              found = true;
              break;
            }
          }
          if (!found) planSelect.value = '';
        }
        updateCalc();
      });
    }

    if (hwInput) hwInput.addEventListener('input', updateCalc);
    if (powerInput) powerInput.addEventListener('input', updateCalc);

    updateCalc();
  }

  /* Standalone Calculator on cost-calculator.html (#full-calc) */
  var fullCalcContainer = document.getElementById('full-calc');
  if (fullCalcContainer) {
    var fPlanSelect = document.getElementById('fcalc-plan');
    var fMonthlyInput = document.getElementById('fcalc-monthly');
    var fHwInput = document.getElementById('fcalc-hw');
    var fPowerInput = document.getElementById('fcalc-power');
    var fResultEl = document.getElementById('fcalc-result');

    function updateFullCalc() {
      if (!fResultEl || !fMonthlyInput || !fHwInput || !fPowerInput) return;

      var monthly = parseFloat(fMonthlyInput.value) || 0;
      var hw = parseFloat(fHwInput.value) || 0;
      var power = parseFloat(fPowerInput.value) || 0;

      if (monthly <= 0) {
        fResultEl.innerHTML = '<p style="margin:0;">Enter your monthly subscription fee to calculate your comparative costs.</p>';
        return;
      }

      var netMonthly = monthly - power;
      var paidYear1 = monthly * 12;
      var localYear1 = hw + (power * 12);
      var diffYear1 = paidYear1 - localYear1;

      var paidYear2 = monthly * 24;
      var localYear2 = hw + (power * 24);
      var diffYear2 = paidYear2 - localYear2;

      var breakEvenSentence = '';
      if (netMonthly <= 0) {
        breakEvenSentence = 'At an estimated $' + power + ' per month in electricity, running locally costs as much as or more than your subscription, so hardware will not pay for itself.';
      } else if (hw <= 0) {
        breakEvenSentence = 'Because you are using hardware you already own ($0 cost), you <strong>break even immediately</strong> from your very first month.';
      } else {
        var months = Math.ceil(hw / netMonthly);
        if (months === 1) {
          breakEvenSentence = 'Your hardware investment pays for itself in <strong>1 month</strong>.';
        } else if (months < 12) {
          breakEvenSentence = 'Your hardware investment pays for itself in <strong>' + months + ' months</strong>.';
        } else {
          var years = (months / 12).toFixed(1).replace(/\.0$/, '');
          breakEvenSentence = 'Your hardware investment pays for itself in <strong>' + months + ' months</strong> (about <strong>' + years + ' years</strong>).';
        }
      }

      var year1Sentence = '';
      if (diffYear1 > 0) {
        year1Sentence = 'After 1 year, the paid plan will have cost <strong>$' + paidYear1.toLocaleString() + '</strong>, while your local setup will have cost <strong>$' + localYear1.toLocaleString() + '</strong> (saving you <strong>$' + diffYear1.toLocaleString() + '</strong>).';
      } else if (diffYear1 < 0) {
        year1Sentence = 'After 1 year, the paid plan will have cost <strong>$' + paidYear1.toLocaleString() + '</strong>, while your local setup will have cost <strong>$' + localYear1.toLocaleString() + '</strong> ($' + Math.abs(diffYear1).toLocaleString() + ' more due to the initial hardware purchase).';
      } else {
        year1Sentence = 'After 1 year, both routes cost exactly the same (<strong>$' + paidYear1.toLocaleString() + '</strong>).';
      }

      var year2Sentence = '';
      if (diffYear2 > 0) {
        year2Sentence = 'After 2 years, the paid plan will have cost <strong>$' + paidYear2.toLocaleString() + '</strong>, while your local setup will have cost <strong>$' + localYear2.toLocaleString() + '</strong> (saving you <strong>$' + diffYear2.toLocaleString() + '</strong>).';
      } else if (diffYear2 < 0) {
        year2Sentence = 'After 2 years, the paid plan will have cost <strong>$' + paidYear2.toLocaleString() + '</strong>, while your local setup will have cost <strong>$' + localYear2.toLocaleString() + '</strong> ($' + Math.abs(diffYear2).toLocaleString() + ' more due to the hardware cost).';
      } else {
        year2Sentence = 'After 2 years, both routes cost exactly the same (<strong>$' + paidYear2.toLocaleString() + '</strong>).';
      }

      fResultEl.innerHTML =
        '<p style="margin:0 0 10px;">' + breakEvenSentence + '</p>' +
        '<p style="margin:0 0 10px;">' + year1Sentence + '</p>' +
        '<p style="margin:0;">' + year2Sentence + '</p>';
    }

    if (fPlanSelect) {
      fPlanSelect.addEventListener('change', function () {
        if (fPlanSelect.value !== '') {
          fMonthlyInput.value = fPlanSelect.value;
          updateFullCalc();
        }
      });
    }

    if (fMonthlyInput) {
      fMonthlyInput.addEventListener('input', function () {
        if (fPlanSelect) {
          var val = fMonthlyInput.value;
          var found = false;
          for (var i = 0; i < fPlanSelect.options.length; i++) {
            if (fPlanSelect.options[i].value === val) {
              fPlanSelect.selectedIndex = i;
              found = true;
              break;
            }
          }
          if (!found) fPlanSelect.value = '';
        }
        updateFullCalc();
      });
    }

    if (fHwInput) fHwInput.addEventListener('input', updateFullCalc);
    if (fPowerInput) fPowerInput.addEventListener('input', updateFullCalc);

    updateFullCalc();
  }

  /* Hardware Checker on what-can-i-run.html (#hardware-checker) */
  var hwChecker = document.getElementById('hardware-checker');
  if (hwChecker) {
    var typeEl = document.getElementById('hw-type');
    var ramEl = document.getElementById('hw-ram');
    var vramEl = document.getElementById('hw-vram');
    var vramGroup = document.getElementById('vram-group');
    var resultEl = document.getElementById('hw-result');

    function updateHardwareReport() {
      if (!typeEl || !ramEl || !vramEl || !resultEl) return;

      var type = typeEl.value;
      var ram = parseInt(ramEl.value, 10) || 8;
      var vram = parseInt(vramEl.value, 10) || 4;

      if (type === 'nvidia') {
        if (vramGroup) vramGroup.style.display = 'block';
      } else {
        if (vramGroup) vramGroup.style.display = 'none';
      }

      var runsWell = '';
      var runsSlowly = '';
      var willNotFit = '';
      var startingModel = '';

      if (type === 'mac') {
        if (ram <= 8) {
          runsWell = 'Small 4-billion parameter models (downloads up to 3 GB).';
          runsSlowly = '7B to 8B models (will crowd system memory and answer slowly).';
          willNotFit = '14B models and larger (exceeds available memory).';
          startingModel = '<code>qwen3:4b</code> (2.5 GB download).';
        } else if (ram <= 16) {
          runsWell = '7B to 8B models and all smaller models.';
          runsSlowly = '12B to 14B models (will fit tightly, with slower generation).';
          willNotFit = '27B to 32B models and larger.';
          startingModel = '<code>qwen3:8b</code> (5.2 GB download) or <code>gemma4:12b</code>.';
        } else if (ram <= 24) {
          runsWell = '8B and 14B models with plenty of room for long documents.';
          runsSlowly = '26B to 32B models (will fit tightly, leaving little room for apps).';
          willNotFit = '70B models.';
          startingModel = '<code>qwen3:14b</code> (9.3 GB download) or <code>qwen3:8b</code>.';
        } else if (ram <= 36) {
          runsWell = '14B models and medium 27B models.';
          runsSlowly = '32B models during extended multi-turn conversations.';
          willNotFit = '70B models.';
          startingModel = '<code>qwen3:14b</code> or <code>gemma4:26b</code>.';
        } else {
          runsWell = '30B to 32B models with full speed and deep context windows.';
          runsSlowly = '70B models (on 48 GB; will run comfortably on 64 GB+).';
          willNotFit = 'Models over 70 billion parameters.';
          startingModel = '<code>gemma4:31b</code> (about 20 GB download) or <code>qwen3:30b</code>.';
        }
      } else if (type === 'nvidia') {
        if (vram <= 4) {
          runsWell = 'Small 4B models entirely within graphics memory.';
          runsSlowly = '8B models (layers will be split between your GPU and slower system RAM).';
          willNotFit = (ram < 16) ? '14B models and larger.' : '30B models and larger.';
          startingModel = '<code>qwen3:4b</code> (2.5 GB download).';
        } else if (vram <= 8) {
          runsWell = '8B models running at full graphics card speed.';
          runsSlowly = '14B models (partially offloaded to CPU and system RAM).';
          willNotFit = '30B models and larger (unless you have 32 GB+ of system RAM).';
          startingModel = '<code>qwen3:8b</code> (5.2 GB download).';
        } else if (vram <= 12) {
          runsWell = '8B and 14B models running completely inside your card\'s VRAM.';
          runsSlowly = '27B to 32B models (fits partially in VRAM, remainder in system RAM).';
          willNotFit = '70B models.';
          startingModel = '<code>qwen3:14b</code> (9.3 GB download) or <code>qwen3:8b</code>.';
        } else if (vram <= 16) {
          runsWell = '14B models with large context windows, and tight 26B models.';
          runsSlowly = '30B to 32B models (will split a few layers into system RAM).';
          willNotFit = '70B models.';
          startingModel = '<code>qwen3:14b</code> (fastest) or <code>gemma4:26b</code>.';
        } else if (vram <= 32) {
          runsWell = '30B to 32B models running entirely on the graphics card.';
          runsSlowly = '70B models (split with 64 GB system RAM).';
          willNotFit = 'Models exceeding your combined VRAM and RAM.';
          startingModel = '<code>gemma4:31b</code> (around 20 GB download).';
        } else {
          runsWell = '70B-class models entirely on the graphics card, and every smaller size.';
          runsSlowly = 'The very largest open models (well over 100B parameters).';
          willNotFit = 'Models bigger than your VRAM plus system RAM.';
          startingModel = '<code>gemma4:31b</code> for speed, then a 70B-class model from the Ollama library.';
        }
      } else {
        if (ram <= 8) {
          runsWell = 'Small 4B models (at steady processor speeds).';
          runsSlowly = '8B models (will feel slow without a dedicated graphics accelerator).';
          willNotFit = '14B models and larger.';
          startingModel = '<code>qwen3:4b</code> (2.5 GB download).';
        } else if (ram <= 16) {
          runsWell = '4B and 8B models (functional for writing and notes, slower than GPU).';
          runsSlowly = '14B models (will answer at 1 to 3 words per second).';
          willNotFit = '30B models and larger.';
          startingModel = '<code>qwen3:8b</code> (5.2 GB download).';
        } else {
          runsWell = '8B and 14B models at standard CPU generation speeds.';
          runsSlowly = '30B models (heavy processor load).';
          willNotFit = '70B models.';
          startingModel = '<code>qwen3:8b</code> or <code>qwen3:14b</code>.';
        }
      }

      resultEl.innerHTML =
        '<p style="margin:0 0 10px;"><strong>Runs well:</strong> ' + runsWell + '</p>' +
        '<p style="margin:0 0 10px;"><strong>Runs slowly:</strong> ' + runsSlowly + '</p>' +
        '<p style="margin:0 0 10px;"><strong>Will not fit:</strong> ' + willNotFit + '</p>' +
        '<p style="margin:0;"><strong>Recommended starting model:</strong> ' + startingModel + ' — <a href="install-ollama.html#step-4">Follow the download steps in Part 2 →</a></p>';
    }

    typeEl.addEventListener('change', updateHardwareReport);
    ramEl.addEventListener('change', updateHardwareReport);
    vramEl.addEventListener('change', updateHardwareReport);

    updateHardwareReport();
  }
})();
