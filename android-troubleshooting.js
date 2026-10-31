/**
 * SMCyvera by Shahanur Mollah — Android Troubleshooting Engine
 * Handles interactive diagnosis state machine, search, 12-category filtering,
 * OEM-specific tabs, safety callouts, and localStorage Fix History management.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'smcyvera_android_fix_history';
  const data = window.ANDROID_TROUBLESHOOTING_DATA;

  if (!data || !data.problems) {
    console.error('Android troubleshooting data not loaded.');
    return;
  }

  // State
  let currentFilter = 'all';
  let searchQuery = '';
  let selectedOEM = 'all'; // 'all', 'samsung', 'pixel', 'xiaomi', 'oneplus'
  let activeDiagnosis = null; // currently running diagnosis session

  // DOM Elements
  const problemGrid = document.getElementById('problemGrid');
  const searchInput = document.getElementById('troubleshootSearch');
  const clearSearchBtn = document.getElementById('clearSearch');
  const categoryFilters = document.getElementById('categoryFilters');
  const oemSelector = document.getElementById('oemSelector');
  const activeCountEl = document.getElementById('activeProblemCount');
  const noMatchesEl = document.getElementById('noTroubleshootMatches');
  const historyBadge = document.getElementById('historyBadge');

  // Modal / Drawer elements
  const diagnosisModal = document.getElementById('diagnosisModal');
  const diagnosisBody = document.getElementById('diagnosisBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const historyDrawer = document.getElementById('historyDrawer');
  const historyList = document.getElementById('historyList');
  const closeHistoryBtn = document.getElementById('closeHistoryBtn');
  const viewHistoryBtn = document.getElementById('viewHistoryBtn');
  const clearAllHistoryBtn = document.getElementById('clearAllHistoryBtn');
  const exportHistoryJsonBtn = document.getElementById('exportHistoryJsonBtn');
  const exportHistoryTextBtn = document.getElementById('exportHistoryTextBtn');

  // ----------------------------------------------------
  // 1. History (localStorage) Functions
  // ----------------------------------------------------
  function getFixHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Could not read history from localStorage', e);
      return [];
    }
  }

  function saveFixHistory(history) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      updateHistoryBadge();
    } catch (e) {
      console.warn('Could not save history to localStorage', e);
    }
  }

  function addHistoryEntry(entry) {
    const history = getFixHistory();
    // Insert at beginning
    history.unshift({
      id: 'fix_' + Date.now(),
      problemId: entry.problemId,
      problemTitle: entry.problemTitle,
      categoryName: entry.categoryName,
      status: entry.status || 'Resolved', // 'Resolved', 'Unresolved', 'Escalated'
      timestamp: new Date().toISOString(),
      dateFormatted: new Date().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }),
      notes: entry.notes || '',
      oemUsed: entry.oemUsed || 'Generic Android'
    });
    // Keep max 50 records
    if (history.length > 50) history.pop();
    saveFixHistory(history);
    renderHistoryDrawer();
  }

  function deleteHistoryEntry(id) {
    let history = getFixHistory();
    history = history.filter(item => item.id !== id);
    saveFixHistory(history);
    renderHistoryDrawer();
  }

  function clearAllHistory() {
    localStorage.removeItem(STORAGE_KEY);
    updateHistoryBadge();
    renderHistoryDrawer();
  }

  function updateHistoryBadge() {
    const count = getFixHistory().length;
    if (historyBadge) {
      historyBadge.textContent = String(count);
      historyBadge.hidden = count === 0;
    }
  }

  function renderHistoryDrawer() {
    if (!historyList) return;
    const history = getFixHistory();
    if (history.length === 0) {
      historyList.innerHTML = `
        <div class="empty-history-box">
          <p class="empty-history-text">No diagnostic sessions saved yet.</p>
          <p class="empty-history-sub">When you start an interactive diagnosis and complete troubleshooting steps, your results will be securely remembered here in your browser.</p>
        </div>
      `;
      return;
    }

    historyList.innerHTML = history.map(item => `
      <div class="history-item-card" data-history-id="${item.id}">
        <div class="history-item-header">
          <span class="history-status-badge ${item.status.toLowerCase()}">${item.status}</span>
          <span class="history-time">${item.dateFormatted}</span>
        </div>
        <h4 class="history-item-title">${escapeHtml(item.problemTitle)}</h4>
        <div class="history-item-meta">
          <span>${escapeHtml(item.categoryName)}</span> · <span>Device: ${escapeHtml(item.oemUsed)}</span>
        </div>
        ${item.notes ? `<p class="history-notes">${escapeHtml(item.notes)}</p>` : ''}
        <div class="history-item-actions">
          <button type="button" class="btn-sm btn-subtle resume-history-btn" data-problem-id="${item.problemId}">Reopen Diagnostic</button>
          <button type="button" class="btn-sm btn-danger delete-history-btn" data-delete-id="${item.id}" aria-label="Delete entry">Delete</button>
        </div>
      </div>
    `).join('');

    // Attach listeners
    historyList.querySelectorAll('.delete-history-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-delete-id');
        deleteHistoryEntry(id);
      });
    });

    historyList.querySelectorAll('.resume-history-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const problemId = e.currentTarget.getAttribute('data-problem-id');
        closeDrawer();
        openDiagnosis(problemId);
      });
    });
  }

  function exportHistoryAsJson() {
    const history = getFixHistory();
    if (history.length === 0) {
      showHistoryStatus('No diagnostic history to export.');
      return;
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `SMCyvera-Android-Diagnosis-History-${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
    showHistoryStatus('Exported JSON successfully.');
  }

  function exportHistoryAsText() {
    const history = getFixHistory();
    if (history.length === 0) {
      showHistoryStatus('No diagnostic history to export.');
      return;
    }
    let text = `SMCyvera by Shahanur Mollah — Android Diagnosis History\nGenerated on: ${new Date().toLocaleString()}\n`;
    text += `=================================================================\n\n`;
    history.forEach((item, index) => {
      text += `[${index + 1}] ${item.problemTitle.toUpperCase()}\n`;
      text += `Status: ${item.status} | Category: ${item.categoryName} | Date: ${item.dateFormatted}\n`;
      text += `Device Profile: ${item.oemUsed}\n`;
      if (item.notes) text += `Outcome/Notes: ${item.notes}\n`;
      text += `-----------------------------------------------------------------\n\n`;
    });

    const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `SMCyvera-Android-Diagnosis-Report-${new Date().toISOString().slice(0, 10)}.txt`);
    dlAnchor.click();
    showHistoryStatus('Exported text report successfully.');
  }

  function showHistoryStatus(msg) {
    const sub = document.querySelector('.history-drawer-sub');
    if (!sub) return;
    const original = sub.textContent;
    sub.textContent = msg;
    sub.style.color = '#38bdf8';
    setTimeout(() => {
      sub.textContent = original;
      sub.style.color = '';
    }, 2800);
  }

  // ----------------------------------------------------
  // 2. Rendering the 60 Problem Cards
  // ----------------------------------------------------
  function renderProblems() {
    if (!problemGrid) return;

    const query = searchQuery.trim().toLowerCase();
    const filtered = data.problems.filter(prob => {
      const matchCat = currentFilter === 'all' || prob.category === currentFilter;
      if (!matchCat) return false;

      if (!query) return true;

      const titleMatch = prob.title.toLowerCase().includes(query);
      const symptomMatch = prob.symptom.toLowerCase().includes(query);
      const causesMatch = prob.causes.some(c => c.toLowerCase().includes(query));
      const categoryMatch = prob.categoryName.toLowerCase().includes(query);

      return titleMatch || symptomMatch || causesMatch || categoryMatch;
    });

    if (activeCountEl) {
      activeCountEl.textContent = `${filtered.length} of ${data.problems.length} issues`;
    }

    if (noMatchesEl) {
      noMatchesEl.hidden = filtered.length > 0;
    }

    problemGrid.innerHTML = filtered.map(prob => {
      const guideHtml = prob.relatedGuide ? `
        <a class="prob-guide-link" href="${prob.relatedGuide}" title="Read detailed explainer guide">
          <span class="guide-icon">📖</span> ${escapeHtml(prob.relatedGuideTitle || 'Read In-Depth Guide')}
        </a>
      ` : '';

      return `
        <article class="prob-card card" data-id="${prob.id}" data-category="${prob.category}">
          <div class="prob-card-header">
            <span class="prob-cat-tag">${escapeHtml(prob.categoryName)}</span>
            <span class="prob-severity-badge ${prob.severity}">${prob.severity}</span>
          </div>
          <h3 class="prob-title">${escapeHtml(prob.title)}</h3>
          <p class="prob-symptom">${escapeHtml(prob.symptom)}</p>
          
          <div class="prob-causes-preview">
            <strong class="causes-label">Likely causes:</strong>
            <ul class="causes-list">
              ${prob.causes.slice(0, 2).map(c => `<li>${escapeHtml(c)}</li>`).join('')}
            </ul>
          </div>

          ${guideHtml}

          <div class="prob-card-footer">
            <button type="button" class="btn btn-sm btn-primary start-diag-btn" data-problem-id="${prob.id}">
              Start Interactive Diagnosis →
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to cards and buttons
    problemGrid.querySelectorAll('.start-diag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-problem-id');
        openDiagnosis(id);
      });
    });
  }

  // ----------------------------------------------------
  // 3. Interactive Diagnosis State Machine
  // ----------------------------------------------------
  function openDiagnosis(problemId) {
    const prob = data.problems.find(p => p.id === problemId);
    if (!prob) return;

    activeDiagnosis = {
      problem: prob,
      stepIndex: 0,
      currentStepId: prob.steps[0].id,
      selectedOem: selectedOEM !== 'all' ? selectedOEM : 'samsung',
      userSelections: [],
      history: [] // step history stack for back navigation
    };

    renderDiagnosisModal();
    if (diagnosisModal) {
      diagnosisModal.classList.add('active');
      diagnosisModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Focus modal
      modalCloseBtn && modalCloseBtn.focus();
    }
  }

  function closeDiagnosis() {
    if (diagnosisModal) {
      diagnosisModal.classList.remove('active');
      diagnosisModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    activeDiagnosis = null;
  }

  function goBackStep() {
    if (!activeDiagnosis || !activeDiagnosis.history || activeDiagnosis.history.length === 0) return;
    const prevStepId = activeDiagnosis.history.pop();
    activeDiagnosis.userSelections.pop();
    activeDiagnosis.currentStepId = prevStepId;
    renderDiagnosisModal();
  }

  function restartDiagnosis() {
    if (!activeDiagnosis) return;
    activeDiagnosis.history = [];
    activeDiagnosis.userSelections = [];
    activeDiagnosis.currentStepId = activeDiagnosis.problem.steps[0].id;
    renderDiagnosisModal();
  }

  function renderDiagnosisModal() {
    if (!diagnosisBody || !activeDiagnosis) return;
    const { problem, currentStepId, selectedOem, history } = activeDiagnosis;
    const currentStep = problem.steps.find(s => s.id === currentStepId) || problem.steps[0];
    const stepNumber = problem.steps.indexOf(currentStep) + 1;
    const totalSteps = problem.steps.length;
    const canGoBack = history && history.length > 0;

    let oemSpecificHtml = '';
    if (currentStep.oemNotes) {
      const oemEntries = Object.entries(currentStep.oemNotes);
      if (oemEntries.length > 0) {
        oemSpecificHtml = `
          <div class="oem-notes-container">
            <div class="oem-tabs-header">
              <span class="oem-tabs-title">Manufacturer-Specific Settings:</span>
              <div class="oem-mini-tabs">
                ${oemEntries.map(([oemKey]) => `
                  <button type="button" class="oem-mini-tab ${selectedOem === oemKey ? 'active' : ''}" data-oem-key="${oemKey}">
                    ${getOemLabel(oemKey)}
                  </button>
                `).join('')}
              </div>
            </div>
            <div class="oem-note-content">
              <strong>${getOemLabel(selectedOem)} instructions:</strong>
              <p>${escapeHtml(currentStep.oemNotes[selectedOem] || currentStep.oemNotes[oemEntries[0][0]])}</p>
            </div>
          </div>
        `;
      }
    }

    let warningHtml = '';
    if (problem.safetyWarning || currentStep.isCritical) {
      warningHtml = `
        <div class="safety-alert-box ${currentStep.isCritical ? 'critical' : 'warning'}">
          <div class="safety-alert-icon">⚠️</div>
          <div class="safety-alert-text">
            <strong>Important Safety Notice:</strong>
            <p>${escapeHtml(problem.safetyWarning || 'Hardware safety threshold reached. Disconnect power and follow safety steps.')}</p>
          </div>
        </div>
      `;
    }

    let questionOptionsHtml = '';
    if (currentStep.question && currentStep.options) {
      questionOptionsHtml = `
        <div class="diag-question-block">
          <h4 class="diag-question-text">${escapeHtml(currentStep.question)}</h4>
          <div class="diag-options-list">
            ${currentStep.options.map(opt => `
              <button type="button" class="diag-option-btn" data-next-step="${opt.next}">
                <span class="option-bullet">→</span>
                <span class="option-label">${escapeHtml(opt.text)}</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    let instructionHtml = '';
    if (currentStep.instruction) {
      instructionHtml = `
        <div class="diag-instruction-block">
          <h4 class="diag-step-title">${escapeHtml(currentStep.title || 'Step ' + stepNumber + ': Action Required')}</h4>
          <div class="diag-step-text">${formatInstructionText(currentStep.instruction)}</div>
        </div>
      `;
    }

    let testBlockHtml = '';
    if (currentStep.test) {
      testBlockHtml = `
        <div class="diag-test-block">
          <div class="test-header">
            <span class="test-badge">Verification Test</span>
            <span class="test-expected"><strong>Expected:</strong> ${escapeHtml(currentStep.expectedResult || 'Issue resolves')}</span>
          </div>
          <p class="test-action-text">${escapeHtml(currentStep.test)}</p>
        </div>
      `;
    }

    let guideCrossLinkHtml = '';
    if (currentStep.crossLink) {
      guideCrossLinkHtml = `
        <div class="diag-guide-box">
          <span>📖 In-Depth Explainer:</span>
          <a href="${currentStep.crossLink.url}" target="_blank" rel="noopener">${escapeHtml(currentStep.crossLink.text)} ↗</a>
        </div>
      `;
    }

    diagnosisBody.innerHTML = `
      <div class="diag-header-bar">
        <div class="diag-title-group">
          <span class="diag-cat-badge">${escapeHtml(problem.categoryName)}</span>
          <h2 class="diag-problem-title">${escapeHtml(problem.title)}</h2>
          <div class="diag-header-actions" style="margin-top: 8px; display: flex; gap: 8px;">
            ${canGoBack ? `
              <button type="button" class="btn-sm btn-subtle" id="btnDiagBackHeader">← Back</button>
            ` : ''}
            <button type="button" class="btn-sm btn-subtle" id="btnDiagRestartHeader">↺ Restart</button>
          </div>
        </div>
        <div class="diag-progress-indicator">
          <span>Step ${stepNumber} of ${totalSteps}</span>
          <div class="progress-track"><div class="progress-fill" style="width: ${(stepNumber / totalSteps) * 100}%"></div></div>
        </div>
      </div>

      <div class="diag-content-area">
        ${warningHtml}
        ${questionOptionsHtml}
        ${instructionHtml}
        ${oemSpecificHtml}
        ${testBlockHtml}
        ${guideCrossLinkHtml}
      </div>

      <div class="diag-footer-actions">
        <div class="diag-feedback-prompt">
          <span>${currentStep.question ? 'Choose an observation above, or proceed below:' : 'Did this step resolve the issue?'}</span>
        </div>
        <div class="diag-action-buttons">
          ${canGoBack ? `
            <button type="button" class="btn btn-secondary" id="btnDiagBackFooter">← Back</button>
          ` : ''}
          ${!currentStep.question ? `
            <button type="button" class="btn btn-success" id="btnSolved">
              ✓ Yes, Problem Solved!
            </button>
            <button type="button" class="btn btn-secondary" id="btnNextStep">
              No, Try Next Step →
            </button>
          ` : ''}
          <button type="button" class="btn btn-danger-outline" id="btnEscalate">
            Need Advanced Escalation
          </button>
        </div>
      </div>
    `;

    // Event listeners inside modal
    diagnosisBody.querySelectorAll('.diag-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const nextStepId = e.currentTarget.getAttribute('data-next-step');
        activeDiagnosis.history.push(activeDiagnosis.currentStepId);
        activeDiagnosis.userSelections.push(e.currentTarget.querySelector('.option-label').textContent);
        activeDiagnosis.currentStepId = nextStepId;
        renderDiagnosisModal();
      });
    });

    diagnosisBody.querySelectorAll('.oem-mini-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const oemKey = e.currentTarget.getAttribute('data-oem-key');
        activeDiagnosis.selectedOem = oemKey;
        renderDiagnosisModal();
      });
    });

    const btnDiagBackHeader = document.getElementById('btnDiagBackHeader');
    if (btnDiagBackHeader) btnDiagBackHeader.addEventListener('click', goBackStep);

    const btnDiagBackFooter = document.getElementById('btnDiagBackFooter');
    if (btnDiagBackFooter) btnDiagBackFooter.addEventListener('click', goBackStep);

    const btnDiagRestartHeader = document.getElementById('btnDiagRestartHeader');
    if (btnDiagRestartHeader) btnDiagRestartHeader.addEventListener('click', restartDiagnosis);

    const btnSolved = document.getElementById('btnSolved');
    if (btnSolved) {
      btnSolved.addEventListener('click', () => {
        recordOutcome('Resolved', `Resolved at Step ${stepNumber} (${currentStep.title || 'Diagnostic action'})`);
        showResolutionScreen(true);
      });
    }

    const btnNextStep = document.getElementById('btnNextStep');
    if (btnNextStep) {
      btnNextStep.addEventListener('click', () => {
        const nextIndex = problem.steps.indexOf(currentStep) + 1;
        if (nextIndex < problem.steps.length) {
          activeDiagnosis.history.push(activeDiagnosis.currentStepId);
          activeDiagnosis.currentStepId = problem.steps[nextIndex].id;
          renderDiagnosisModal();
        } else {
          recordOutcome('Unresolved', 'All guided software and setting checks completed without resolution.');
          showResolutionScreen(false);
        }
      });
    }

    const btnEscalate = document.getElementById('btnEscalate');
    if (btnEscalate) {
      btnEscalate.addEventListener('click', () => {
        recordOutcome('Escalated', 'Hardware inspection or authorized technician service recommended.');
        showEscalationScreen();
      });
    }
  }

  function recordOutcome(status, notes) {
    if (!activeDiagnosis) return;
    addHistoryEntry({
      problemId: activeDiagnosis.problem.id,
      problemTitle: activeDiagnosis.problem.title,
      categoryName: activeDiagnosis.problem.categoryName,
      status: status,
      notes: notes,
      oemUsed: getOemLabel(activeDiagnosis.selectedOem)
    });
  }

  function showResolutionScreen(isSuccessful) {
    if (!diagnosisBody || !activeDiagnosis) return;
    const { problem } = activeDiagnosis;

    diagnosisBody.innerHTML = `
      <div class="resolution-container ${isSuccessful ? 'success' : 'partial'}">
        <div class="resolution-icon">${isSuccessful ? '🎉' : 'ℹ️'}</div>
        <h2 class="resolution-heading">${isSuccessful ? 'Issue Successfully Resolved!' : 'All Routine Steps Completed'}</h2>
        <p class="resolution-lead">
          ${isSuccessful 
            ? `Great job! Your diagnostic session for <strong>${escapeHtml(problem.title)}</strong> has been recorded in your local Fix History.`
            : `You have completed all standard software and configuration checks for <strong>${escapeHtml(problem.title)}</strong>.`
          }
        </p>

        <div class="resolution-card">
          <h4>Recommended Maintenance & Prevention:</h4>
          <ul>
            <li>Restart your phone at least once every 1–2 weeks to clear lingering kernel cache and memory leaks.</li>
            <li>Maintain at least 15% free internal storage to avoid flash memory controller wear and performance degradation.</li>
            <li>Keep Android System WebView and Google Play Services updated regularly.</li>
          </ul>
        </div>

        ${problem.relatedGuide ? `
          <div class="resolution-guide-box">
            <p>Want to understand the underlying technical reason behind this behavior?</p>
            <a href="${problem.relatedGuide}" class="btn btn-secondary">Read: ${escapeHtml(problem.relatedGuideTitle)} →</a>
          </div>
        ` : ''}

        <div class="resolution-actions" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
          <button type="button" class="btn btn-secondary" id="btnRestartFromResolution">↺ Restart Diagnostic</button>
          <button type="button" class="btn btn-primary" id="btnFinishDiag">Done / Return to Troubleshooting Center</button>
        </div>
      </div>
    `;

    document.getElementById('btnFinishDiag')?.addEventListener('click', closeDiagnosis);
    document.getElementById('btnRestartFromResolution')?.addEventListener('click', restartDiagnosis);
  }

  function showEscalationScreen() {
    if (!diagnosisBody || !activeDiagnosis) return;
    const { problem } = activeDiagnosis;

    diagnosisBody.innerHTML = `
      <div class="escalation-container">
        <div class="escalation-icon">🛠️</div>
        <h2 class="escalation-heading">Hardware & Authorized Service Escalation</h2>
        <p class="escalation-sub">
          When software switches, cache resets, and Safe Mode tests fail to resolve <strong>${escapeHtml(problem.title)}</strong>, physical hardware component failure is the primary probability.
        </p>

        <div class="escalation-steps-grid">
          <div class="escalation-step">
            <span class="esc-num">1</span>
            <h4>Back Up Personal Data</h4>
            <p>Prior to visiting a repair shop, ensure contacts, photos, and messaging apps are backed up to Google Drive or a PC.</p>
            <a href="/android-backup-reset.html" class="esc-link">Android Backup Guide →</a>
          </div>
          <div class="escalation-step">
            <span class="esc-num">2</span>
            <h4>Verify Warranty Status</h4>
            <p>Check your device IMEI (*#06# in dialer) on your manufacturer support portal (Samsung Care+, Google Store Support, Xiaomi Warranty).</p>
          </div>
          <div class="escalation-step">
            <span class="esc-num">3</span>
            <h4>Insist on OEM Parts</h4>
            <p>Third-party replacement batteries and digitizer screens often lack temperature sensor thermistors or high-refresh rate ICs.</p>
          </div>
        </div>

        <div class="resolution-actions" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
          <button type="button" class="btn btn-secondary" id="btnRestartFromEscalation">↺ Restart Diagnostic</button>
          <button type="button" class="btn btn-primary" id="btnFinishEscalate">Return to Troubleshooting Center</button>
        </div>
      </div>
    `;

    document.getElementById('btnFinishEscalate')?.addEventListener('click', closeDiagnosis);
    document.getElementById('btnRestartFromEscalation')?.addEventListener('click', restartDiagnosis);
  }

  // ----------------------------------------------------
  // 4. History Drawer UI Handlers
  // ----------------------------------------------------
  function openDrawer() {
    if (!historyDrawer) return;
    renderHistoryDrawer();
    historyDrawer.classList.add('open');
    historyDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    if (!historyDrawer) return;
    historyDrawer.classList.remove('open');
    historyDrawer.setAttribute('aria-hidden', 'true');
  }

  // ----------------------------------------------------
  // 5. Helpers
  // ----------------------------------------------------
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  function formatInstructionText(text) {
    if (!text) return '';
    // Format numbered lines or paragraphs
    return text.split('\n').map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (/^\d+\./.test(trimmed)) {
        return `<p class="step-line">${escapeHtml(trimmed)}</p>`;
      }
      return `<p>${escapeHtml(trimmed)}</p>`;
    }).join('');
  }

  function getOemLabel(key) {
    switch (key) {
      case 'samsung': return 'Samsung One UI';
      case 'pixel': return 'Google Pixel';
      case 'xiaomi': return 'Xiaomi HyperOS / MIUI';
      case 'oneplus': return 'OnePlus OxygenOS';
      default: return 'Standard Android';
    }
  }

  // ----------------------------------------------------
  // 6. Initialization & Event Listeners
  // ----------------------------------------------------
  function init() {
    // 1. Initial renders
    renderProblems();
    updateHistoryBadge();

    // 2. Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.hidden = !searchQuery;
        }
        renderProblems();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.hidden = true;
        renderProblems();
        searchInput.focus();
      });
    }

    // 3. Category filters
    if (categoryFilters) {
      categoryFilters.querySelectorAll('.cat-pill-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          categoryFilters.querySelectorAll('.cat-pill-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          currentFilter = e.currentTarget.getAttribute('data-category-id') || 'all';
          renderProblems();
        });
      });
    }

    // 4. OEM selector
    if (oemSelector) {
      oemSelector.addEventListener('change', (e) => {
        selectedOEM = e.target.value;
      });
    }

    // 5. Modal and Drawer triggers
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeDiagnosis);
    }

    if (diagnosisModal) {
      diagnosisModal.addEventListener('click', (e) => {
        if (e.target === diagnosisModal) closeDiagnosis();
      });
    }

    if (viewHistoryBtn) {
      viewHistoryBtn.addEventListener('click', openDrawer);
    }

    if (closeHistoryBtn) {
      closeHistoryBtn.addEventListener('click', closeDrawer);
    }

    if (clearAllHistoryBtn) {
      clearAllHistoryBtn.addEventListener('click', clearAllHistory);
    }

    if (exportHistoryJsonBtn) {
      exportHistoryJsonBtn.addEventListener('click', exportHistoryAsJson);
    }

    if (exportHistoryTextBtn) {
      exportHistoryTextBtn.addEventListener('click', exportHistoryAsText);
    }

    // 6. Global Escape key handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (diagnosisModal && diagnosisModal.classList.contains('active')) {
          closeDiagnosis();
        } else if (historyDrawer && historyDrawer.classList.contains('open')) {
          closeDrawer();
        }
      }
    });

    // 7. Check URL params for category or problem launch
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    const problemParam = urlParams.get('problem');

    if (catParam) {
      const matchBtn = categoryFilters?.querySelector(`[data-category-id="${catParam}"]`);
      if (matchBtn) {
        matchBtn.click();
      }
    }

    if (problemParam) {
      openDiagnosis(problemParam);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
