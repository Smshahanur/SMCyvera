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

  // 3. Calculators for tools.html
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
      initGuidesFilter();
      initTools();
    });
  } else {
    initNavigation();
    initGuidesFilter();
    initTools();
  }
})();
