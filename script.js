/**
 * SMCyvera by Shahanur Mollah — Core Website Scripts
 * Provides mobile navigation, guide search & category filtering,
 * URL parameter handling (?category=Android), and tool calculators.
 */

(function () {
  'use strict';

  // 1. Mobile Navigation Toggle
  function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (!navToggle || !mainNav) return;

    function toggleMenu(show) {
      const isExpanded = show !== undefined ? show : navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(isExpanded));
      if (isExpanded) {
        mainNav.classList.add('open');
        navToggle.textContent = '✕';
        navToggle.setAttribute('aria-label', 'Close menu');
      } else {
        mainNav.classList.remove('open');
        navToggle.textContent = '☰';
        navToggle.setAttribute('aria-label', 'Open menu');
      }
    }

    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (mainNav.classList.contains('open') && !mainNav.contains(e.target) && e.target !== navToggle) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        toggleMenu(false);
        navToggle.focus();
      }
    });

    // Highlight active link based on current path
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      const cleanHref = href.replace(/\/$/, '') || '/';
      if (cleanHref === currentPath || (currentPath === '' && cleanHref === '/index.html') || (currentPath === '/index.html' && cleanHref === '/')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // 2. Guides Page Filter & Search
  function initGuidesFilter() {
    const guideGrid = document.getElementById('guideGrid');
    const searchInput = document.getElementById('siteSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');

    if (!guideGrid) return;

    const cards = Array.from(guideGrid.querySelectorAll('.guide-card'));
    let activeFilter = 'All';
    let searchQuery = '';

    function applyFilter() {
      let visibleCount = 0;
      const query = searchQuery.trim().toLowerCase();

      cards.forEach(function (card) {
        const category = card.getAttribute('data-category') || '';
        const searchData = (card.getAttribute('data-search') || card.textContent || '').toLowerCase();

        const matchesCategory = activeFilter === 'All' || category.toLowerCase() === activeFilter.toLowerCase();
        const matchesSearch = !query || searchData.includes(query);

        if (matchesCategory && matchesSearch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResults) {
        noResults.hidden = visibleCount > 0;
      }
    }

    // Filter button click
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter') || 'All';
        applyFilter();
      });
    });

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = searchInput.value;
        applyFilter();
      });
    }

    // Check URL parameters: e.g. ?category=Android or ?category=Solar%20%26%20Power
    try {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      const searchParam = params.get('search');

      if (catParam) {
        const matchingBtn = Array.from(filterButtons).find(function (btn) {
          const f = (btn.getAttribute('data-filter') || '').toLowerCase();
          return f === catParam.toLowerCase() || f.replace('&amp;', '&') === catParam.toLowerCase();
        });
        if (matchingBtn) {
          filterButtons.forEach(b => b.classList.remove('active'));
          matchingBtn.classList.add('active');
          activeFilter = matchingBtn.getAttribute('data-filter') || 'All';
        }
      }

      if (searchParam && searchInput) {
        searchInput.value = searchParam;
        searchQuery = searchParam;
      }

      applyFilter();
    } catch (err) {
      console.error('Error parsing URL params:', err);
    }
  }

  // 3. Homepage Live Search (indexes all 28 guides and 7 digital tools)
  function initHeroSearch() {
    const input = document.getElementById('heroSearchInput');
    const resultsContainer = document.getElementById('heroSearchResults');
    if (!input || !resultsContainer) return;

    const searchableItems = [
      // 28 Guides
      { title: 'How to Calculate Solar Battery Backup Time', cat: 'Solar & Power', type: 'Guide', url: '/solar-battery-backup.html', keywords: 'solar battery backup runtime watt hour inverter load discharge calculation' },
      { title: 'Why Wi-Fi Is Slow and How to Troubleshoot It', cat: 'Internet', type: 'Guide', url: '/wifi-slow.html', keywords: 'wifi internet slow speed connection latency ping 5ghz 2.4ghz router' },
      { title: 'How to Make an Android Phone Faster', cat: 'Android', type: 'Guide', url: '/android-make-phone-faster.html', keywords: 'android phone speed lag stutter ram animations cache apps' },
      { title: 'Windows PC Running Slow: Step-by-Step Diagnosis', cat: 'PC', type: 'Guide', url: '/windows-slow.html', keywords: 'windows pc computer slow startup task manager disk 100 ssd cpu' },
      { title: 'USB-C Charging Explained: Power, Cables and Chargers', cat: 'Electronics', type: 'Guide', url: '/usb-c-charging.html', keywords: 'usb-c pd power delivery fast charging watts cable thunderbolt amps' },
      { title: 'How to Calculate the Right Inverter Size', cat: 'Solar & Power', type: 'Guide', url: '/inverter-size.html', keywords: 'inverter size wattage surge pure sine wave solar load capacity' },
      { title: 'How to Back Up Android Before a Factory Reset', cat: 'Android', type: 'Guide', url: '/android-backup-reset.html', keywords: 'android backup factory reset photos contacts google drive data restore' },
      { title: 'Wi-Fi Connected but No Internet: What to Check', cat: 'Internet', type: 'Guide', url: '/wifi-no-internet.html', keywords: 'wifi connected no internet dns gateway ip address router modem' },
      { title: 'Battery Ah vs Wh Explained', cat: 'Solar & Power', type: 'Guide', url: '/battery-ah-wh.html', keywords: 'battery ah amp-hour wh watt-hour formula calculation nominal voltage' },
      { title: 'How to Check Laptop Battery Health', cat: 'PC', type: 'Guide', url: '/laptop-battery-health.html', keywords: 'laptop battery health windows powercfg cycle count wear capacity' },
      { title: 'Android Storage Full: How to Free Up Space Safely', cat: 'Android', type: 'Guide', url: '/android-storage-full.html', keywords: 'android storage full clear cache delete duplicate media files' },
      { title: 'Improve Home Wi-Fi Coverage & Eliminate Dead Zones', cat: 'Internet', type: 'Guide', url: '/wifi-coverage.html', keywords: 'wifi coverage dead zone access point mesh extender range 5ghz' },
      { title: 'MPPT vs PWM Solar Charge Controllers Explained', cat: 'Solar & Power', type: 'Guide', url: '/mppt-vs-pwm.html', keywords: 'mppt pwm solar charge controller efficiency solar panels voltage' },
      { title: 'SSD vs HDD: Why Upgrading Your Hard Drive Matters', cat: 'PC', type: 'Guide', url: '/ssd-vs-hdd.html', keywords: 'ssd hdd hard drive solid state nvme sata boot speed benchmark' },
      { title: 'How to Clean a Dusty PC Safely', cat: 'PC', type: 'Guide', url: '/clean-pc-dust.html', keywords: 'clean pc dust compressed air fans cpu thermal paste overheating' },
      { title: 'How to Fix Android Apps Crashing Repeatedly', cat: 'Android', type: 'Guide', url: '/android-app-crashing.html', keywords: 'android app crash force close webview clear data cache permissions' },
      { title: 'Android Battery Drain: Find the Culprit App', cat: 'Android', type: 'Guide', url: '/android-battery-drain.html', keywords: 'android battery drain battery usage background apps screen time' },
      { title: 'How to Test Internet Speed Accurately', cat: 'Internet', type: 'Guide', url: '/test-internet-speed.html', keywords: 'test internet speed bandwidth jitter ping fast ookla download' },
      { title: 'Router Placement Guide for Best Wi-Fi Signal', cat: 'Internet', type: 'Guide', url: '/router-placement.html', keywords: 'router placement position signal obstruction height walls interference' },
      { title: 'Phone Overheating: Safe Temperature & Cooling Tips', cat: 'Android', type: 'Guide', url: '/phone-overheating.html', keywords: 'phone overheating temperature hot battery gaming charging cpu safe limits' },
      { title: 'PC RAM Explained: How Much Memory Do You Really Need?', cat: 'PC', type: 'Guide', url: '/pc-ram-guide.html', keywords: 'pc ram memory 8gb 16gb 32gb ddr4 ddr5 multitasking' },
      { title: 'Lead-Acid vs Lithium Batteries for Solar Inverters', cat: 'Solar & Power', type: 'Guide', url: '/lead-acid-vs-lithium.html', keywords: 'lead acid lithium lifepo4 cycle life dod depth of discharge solar' },
      { title: 'Safe Charging Habits: Prolong Smartphone Battery Life', cat: 'Electronics', type: 'Guide', url: '/safe-charging-habits.html', keywords: 'safe charging smartphone 80 percent battery degradation heat cycles' },
      { title: 'Power Bank Buying Guide: Capacity, Watts & Ports', cat: 'Electronics', type: 'Guide', url: '/power-bank-guide.html', keywords: 'power bank mah capacity fast charge pd airline allowed watts' },
      { title: 'How to Choose the Right Ethernet Cable: Cat 5e, 6, 6a', cat: 'Internet', type: 'Guide', url: '/ethernet-cable-guide.html', keywords: 'ethernet cable cat5e cat6 cat6a rj45 lan gigabit bandwidth speed' },
      { title: 'Fix Windows Blue Screen (BSOD) Basic Troubleshooting', cat: 'PC', type: 'Guide', url: '/windows-bsod-basics.html', keywords: 'windows bsod blue screen crash dump minidump driver stop error' },
      { title: 'Solar Panel Angle and Tilt Calculation Guide', cat: 'Solar & Power', type: 'Guide', url: '/solar-panel-angle.html', keywords: 'solar panel angle tilt latitude seasonal orientation south' },
      { title: 'Surge Protectors vs Extension Cords: Safety Guide', cat: 'Electronics', type: 'Guide', url: '/surge-protector-safety.html', keywords: 'surge protector extension cord power strip joules clamping voltage' },
      // 7 Tools
      { title: 'Battery Runtime Calculator', cat: 'Solar & Power', type: 'Tool', url: '/tools.html#battery-runtime', keywords: 'battery runtime calculator inverter hours backup estimator ah volts watts' },
      { title: 'Solar Panel Daily Energy Estimator', cat: 'Solar & Power', type: 'Tool', url: '/tools.html#solar-energy', keywords: 'solar energy daily output calculator watt hours peak sun hours generation' },
      { title: 'Inverter Continuous Load Calculator', cat: 'Solar & Power', type: 'Tool', url: '/tools.html#inverter-load', keywords: 'inverter load sizing calculator wattage safety margin rating appliance' },
      { title: 'Android Troubleshooting Center (60 Problems)', cat: 'Android', type: 'Interactive Tool', url: '/android-troubleshooting.html', keywords: 'android troubleshooting diagnostic interactive tool fix battery wifi screen bluetooth' },
      { title: 'Amp-Hours to Watt-Hours Converter', cat: 'Electronics', type: 'Tool', url: '/tools.html#ah-wh', keywords: 'amp hour to watt hour converter ah wh formula battery capacity' },
      { title: 'Wi-Fi Bandwidth & Transfer Time Calculator', cat: 'Internet', type: 'Tool', url: '/tools.html#wifi-calc', keywords: 'wifi bandwidth transfer download time calculator file size speed mbps' },
      { title: 'Power Consumption & Electricity Cost Calculator', cat: 'Electronics', type: 'Tool', url: '/tools.html#power-cost', keywords: 'power consumption electricity cost kwh running cost appliance monthly' }
    ];

    function renderResults(query) {
      const q = query.trim().toLowerCase();
      if (q.length < 2) {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('active');
        return;
      }

      const matches = searchableItems.filter(item => {
        return item.title.toLowerCase().includes(q) ||
               item.cat.toLowerCase().includes(q) ||
               item.keywords.toLowerCase().includes(q);
      }).slice(0, 6);

      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div class="hero-search-no-match">
            <p>No guides or tools found matching "<strong>${escapeHtml(query)}</strong>"</p>
            <a href="/guides.html?search=${encodeURIComponent(query)}" class="hero-search-fallback-link">Search full 28-guide library →</a>
          </div>
        `;
        resultsContainer.classList.add('active');
        return;
      }

      const itemsHtml = matches.map(item => `
        <a href="${item.url}" class="hero-search-item">
          <span class="hero-search-badge ${item.type === 'Tool' || item.type === 'Interactive Tool' ? 'badge-tool' : 'badge-guide'}">${item.type}</span>
          <div class="hero-search-info">
            <span class="hero-search-title">${escapeHtml(item.title)}</span>
            <span class="hero-search-category">${escapeHtml(item.cat)}</span>
          </div>
          <span class="hero-search-arrow" aria-hidden="true">→</span>
        </a>
      `).join('');

      resultsContainer.innerHTML = `
        <div class="hero-search-list">${itemsHtml}</div>
        <div class="hero-search-footer">
          <a href="/guides.html?search=${encodeURIComponent(query)}">Explore all results for "${escapeHtml(query)}" in Library →</a>
        </div>
      `;
      resultsContainer.classList.add('active');
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    input.addEventListener('input', function () {
      renderResults(input.value);
    });

    input.addEventListener('focus', function () {
      if (input.value.trim().length >= 2) {
        renderResults(input.value);
      }
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = input.value.trim();
        if (q) {
          window.location.href = `/guides.html?search=${encodeURIComponent(q)}`;
        }
      } else if (e.key === 'Escape') {
        resultsContainer.classList.remove('active');
      }
    });

    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.classList.remove('active');
      }
    });
  }

  // 4. Calculators for tools.html
  function initTools() {
    // Utility helper
    function getVal(id) {
      const el = document.getElementById(id);
      return el ? parseFloat(el.value) || 0 : 0;
    }

    window.calc = function () {
      const v = getVal('v');
      const ah = getVal('ah');
      const w = getVal('w');
      const eff = getVal('eff') || 90;
      const out = document.getElementById('out');
      if (!out) return;

      if (w <= 0) {
        out.innerHTML = '<span class="calc-err">Please enter an appliance load greater than 0 W.</span>';
        return;
      }
      if (v <= 0 || ah <= 0) {
        out.innerHTML = '<span class="calc-err">Please enter valid positive battery voltage and capacity.</span>';
        return;
      }

      const totalWh = v * ah;
      const usableWh = totalWh * (eff / 100);
      const hours = usableWh / w;
      const currentDraw = w / v;

      out.innerHTML = `
        <div class="result-box">
          <div class="result-primary">Estimated Runtime: <strong>${hours.toFixed(2)} hours</strong> (${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m)</div>
          <div class="result-details">
            <span>Rated Energy: ${totalWh.toFixed(0)} Wh</span> · 
            <span>Usable Energy: ${usableWh.toFixed(0)} Wh (@ ${eff}%)</span> · 
            <span>Battery Draw: ~${currentDraw.toFixed(1)} A</span>
          </div>
        </div>
      `;
    };

    window.energy = function () {
      const pw = getVal('pw');
      const ph = getVal('ph');
      const out = document.getElementById('eout');
      if (!out) return;

      if (pw <= 0 || ph <= 0) {
        out.innerHTML = '<span class="calc-err">Enter positive power and operating hours.</span>';
        return;
      }

      const dailyKwh = (pw * ph) / 1000;
      const monthlyKwh = dailyKwh * 30;
      const yearlyKwh = dailyKwh * 365;

      out.innerHTML = `
        <div class="result-box">
          <div class="result-primary">Estimated Daily Energy: <strong>${dailyKwh.toFixed(2)} kWh/day</strong></div>
          <div class="result-details">
            <span>~${monthlyKwh.toFixed(1)} kWh/month</span> · 
            <span>~${yearlyKwh.toFixed(0)} kWh/year</span>
          </div>
        </div>
      `;
    };

    window.dataConvert = function () {
      const x = getVal('dv');
      const unitEl = document.getElementById('du');
      const u = unitEl ? unitEl.value : 'gb';
      const out = document.getElementById('dout');
      if (!out) return;

      if (x < 0) {
        out.innerHTML = '<span class="calc-err">Please enter a non-negative number.</span>';
        return;
      }

      if (u === 'gb') {
        const mb = x * 1000;
        const mib = x * 1024;
        out.innerHTML = `
          <div class="result-box">
            <div class="result-primary">${x} GB = <strong>${mb.toLocaleString()} MB</strong> (Decimal)</div>
            <div class="result-details">
              <span>Binary: ${mib.toLocaleString()} MiB</span> · 
              <span>${(x / 1000).toFixed(3)} TB</span>
            </div>
          </div>
        `;
      } else {
        const gb = x / 1000;
        const gib = x / 1024;
        out.innerHTML = `
          <div class="result-box">
            <div class="result-primary">${x} MB = <strong>${gb.toFixed(3)} GB</strong> (Decimal)</div>
            <div class="result-details">
              <span>Binary: ${gib.toFixed(3)} GiB</span> · 
              <span>${(x * 1000).toLocaleString()} KB</span>
            </div>
          </div>
        `;
      }
    };

    window.solar = function () {
      const spw = getVal('spw');
      const sph = getVal('sph');
      const spe = getVal('spe') || 80;
      const out = document.getElementById('sout');
      if (!out) return;

      if (spw <= 0 || sph <= 0) {
        out.innerHTML = '<span class="calc-err">Enter positive panel wattage and peak sun hours.</span>';
        return;
      }

      const dailyKwh = (spw * sph * (spe / 100)) / 1000;
      const monthlyKwh = dailyKwh * 30;

      out.innerHTML = `
        <div class="result-box">
          <div class="result-primary">Estimated Daily Generation: <strong>${dailyKwh.toFixed(2)} kWh/day</strong></div>
          <div class="result-details">
            <span>~${monthlyKwh.toFixed(1)} kWh/month</span> · 
            <span>System Derate Factor: ${spe}%</span>
          </div>
        </div>
      `;
    };

    window.inv = function () {
      const l1 = getVal('l1');
      const l2 = getVal('l2');
      const l3 = getVal('l3');
      const margin = getVal('lm') || 25;
      const out = document.getElementById('iout');
      if (!out) return;

      const totalLoad = l1 + l2 + l3;
      if (totalLoad <= 0) {
        out.innerHTML = '<span class="calc-err">Enter at least one load value above 0 W.</span>';
        return;
      }

      const recommended = Math.ceil(totalLoad * (1 + margin / 100));

      out.innerHTML = `
        <div class="result-box">
          <div class="result-primary">Suggested Continuous Rating: <strong>${recommended} W</strong></div>
          <div class="result-details">
            <span>Total Base Load: ${totalLoad} W</span> · 
            <span>Safety Margin: +${margin}% (${recommended - totalLoad} W headroom)</span>
          </div>
        </div>
      `;
    };
  }

  // Initialize all scripts on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initNavigation();
      initHeroSearch();
      initGuidesFilter();
      initTools();
    });
  } else {
    initNavigation();
    initHeroSearch();
    initGuidesFilter();
    initTools();
  }
})();
