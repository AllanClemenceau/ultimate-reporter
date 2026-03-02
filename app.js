/* ═══════════════════════════════════════════════════════════
   ULTIMATE REPORTER v0.4 — "Polar Journalistique" DARK
   Dual card system: dark (border cream) / light (cream bg)
   ═══════════════════════════════════════════════════════════ */

// ── STATE ──
const state = {
  currentPage: 'home',
  currentDossier: null,
  gameState: null,
  score: 0,
  annotations: [],
  selectedText: null,
  selectedRange: null,
  selectedParagraphId: null,
  pendingTechnique: null,
};


// ── ROUTER ──
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || 'home';

  if (hash === 'home') {
    showPage('home');
    renderHome();
  } else if (hash.startsWith('dossier/')) {
    const slug = hash.replace('dossier/', '');
    showPage('dossier');
    loadDossier(slug);
  } else if (hash === 'analyse') {
    showPage('analyse');
    renderAnalyse();
  } else if (hash === 'verdict') {
    showPage('verdict');
    renderVerdict();
  } else {
    showPage('home');
    renderHome();
  }
}

function showPage(pageId) {
  state.currentPage = pageId;
  document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(`page-${pageId}`);
  if (page) page.classList.add('active');

  // Update nav active state removed — no sidebar/bottom bar
}

function navigate(hash) {
  window.location.hash = hash;
}


// ── HOME PAGE ──
function renderHome() {
  const container = document.getElementById('home-content');
  if (!container) return;

  const dossiers = (typeof DOSSIERS_INDEX !== 'undefined') ? DOSSIERS_INDEX : [];

  container.innerHTML = `
    <div class="home-hero">
      <div class="home-hero__eyebrow">Dossier d'investigation</div>
      <h1 class="home-hero__title">Ultimate <span>Reporter</span></h1>
      <p class="home-hero__desc">
        Analysez des articles de presse, identifiez les techniques de manipulation et devenez un expert de l'information.
      </p>
      <div class="stats-strip">
        <div class="stats-strip__item">
          <div class="stats-strip__value">${ICONS.stagiaire(44, 'dark')}</div>
        </div>
        <div class="stats-strip__item stats-strip__item--inline">
          <span class="stats-strip__value stats-strip__value--num">0</span>
          <span class="stats-strip__label">XP</span>
        </div>
        <div class="stats-strip__item stats-strip__item--inline">
          <span class="stats-strip__value stats-strip__value--num">0</span>
          <span class="stats-strip__label">Dossiers</span>
        </div>
      </div>
    </div>

    <div class="section-label">Dossiers disponibles</div>

    <div class="dossier-grid">
      ${dossiers.map((d, i) => renderDossierCard(d, i)).join('')}
    </div>
  `;

  // Attach card click events
  container.querySelectorAll('.dossier-card').forEach(card => {
    card.addEventListener('click', () => {
      const slug = card.dataset.slug;
      navigate(`dossier/${slug}`);
    });
  });

  animateIn(container);
}


function renderDossierCard(d, index) {
  // Alternate: 0=dark, 1=light, 2=light, 3=dark (checkerboard pattern)
  const isDark = (index % 4 === 0 || index % 4 === 3);
  const variant = isDark ? 'dark' : 'light';
  const illuCtx = isDark ? 'dark' : 'light';
  const isPlayable = d.playable || d.slug === 'lactalis-2017';

  // Category icon key
  const catKey = d.categorie === 'Santé' ? 'sante'
    : d.categorie === 'Tech' ? 'tech'
    : d.categorie === 'Société' ? 'societe'
    : d.categorie === 'Médias' ? 'medias' : 'sante';

  // Lock icon for premium (subtle, no color)
  const lockIcon = d.gratuit
    ? '' // free = no indicator needed
    : `<span class="lock-indicator lock-indicator--${illuCtx}">${ICONS.lock(14)}</span>`;

  return `
    <div class="dossier-card dossier-card--${variant}" data-slug="${d.slug}">
      <div class="dossier-card__body">
        <div class="dossier-card__top">
          <span class="dossier-card__cat-label">${ICONS[catKey](44, illuCtx)} ${d.categorie}</span>
          ${lockIcon}
        </div>
        <h3 class="dossier-card__title">${d.titre}</h3>
        <p class="dossier-card__sub">${d.sousTitre}</p>
      </div>
      <div class="dossier-card__footer">
        <div class="dossier-card__meta">
          <span class="dossier-card__meta-item">
            <span class="diff-pips">${renderDiffPips(d.difficulte)}</span>
          </span>
          <span class="dossier-card__meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            ${d.tempsEstime}
          </span>
          <span class="dossier-card__meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
            ${d.nombreArticles} articles
          </span>
        </div>
        ${!isPlayable ? '<span style="font-size: var(--text-xs); opacity: 0.5; font-style: italic;">Bientôt</span>' : ''}
      </div>
    </div>
  `;
}


function renderDiffPips(level) {
  return Array.from({length: 3}, (_, i) =>
    `<span class="diff-pip${i < level ? ' active' : ''}"></span>`
  ).join('');
}


function getCategoryColor(cat) {
  const colors = {
    'Santé': '#C62828',
    'Tech': '#1565C0',
    'Société': '#E65100',
    'Médias': '#6A1B9A',
  };
  return colors[cat] || '#1A1A1A';
}


// ── DOSSIER BRIEFING ──
function loadDossier(slug) {
  // Map slug to data object
  const dossierMap = {
    'lactalis-2017': (typeof DOSSIER_LACTALIS !== 'undefined') ? DOSSIER_LACTALIS : null,
  };
  const dossier = dossierMap[slug];
  if (!dossier) {
    document.getElementById('dossier-content').innerHTML = `
      <div class="briefing" style="text-align:center; padding: 80px 32px;">
        <div style="font-family: var(--font-display); font-size: var(--text-3xl); text-transform: uppercase; margin-bottom: 16px; color: var(--cream);">
          Dossier verrouillé
        </div>
        <p style="color: var(--cream-muted); margin-bottom: 24px;">
          Ce dossier sera disponible prochainement.
        </p>
        <a href="#home" class="btn btn--ghost">Retour aux dossiers</a>
      </div>
    `;
    return;
  }

  // Find index entry for extra metadata
  const indexEntry = ((typeof DOSSIERS_INDEX !== 'undefined') ? DOSSIERS_INDEX : []).find(d => d.slug === slug);

  state.currentDossier = dossier;
  state.currentDossierIndex = indexEntry;
  state.gameState = {
    dossierSlug: slug,
    phase: 'briefing',
    articleIndex: 0,
    annotations: [],
    results: [],
    score: 0,
    scoreMax: dossier.scoring.pointsMaximum,
    startTime: Date.now(),
  };
  state.score = 0;
  state.annotations = [];

  renderBriefing(dossier);
}


function renderBriefing(dossier) {
  const container = document.getElementById('dossier-content');
  const m = dossier.meta;
  const idx = state.currentDossierIndex || {};
  const tempsEstime = idx.tempsEstime || '15-20 min';
  const nombreArticles = idx.nombreArticles || dossier.articles?.length || 1;
  const dossierImage = idx.image || null;

  // Category icon key
  const catKey = m.categorie === 'Santé' ? 'sante'
    : m.categorie === 'Tech' ? 'tech'
    : m.categorie === 'Société' ? 'societe'
    : m.categorie === 'Médias' ? 'medias' : 'sante';

  container.innerHTML = `
    <div class="briefing">

      <!-- Header: LIGHT CARD (cream bg, black text) -->
      <div class="briefing__header">
        <div class="briefing__cat-label">
          ${ICONS[catKey](64, 'light')} <span>${m.categorie}</span>
        </div>
        <h1 class="briefing__title">${m.titre}</h1>
        <p class="briefing__subtitle">${m.sousTitre}</p>
        ${dossierImage ? `
        <div class="briefing__image">
          <img src="${dossierImage}" alt="${m.titre}" class="img-noir" loading="lazy">
        </div>` : ''}
        <div class="briefing__meta">
          <span class="briefing__meta-item">
            <span class="diff-pips">${renderDiffPips(m.difficulte)}</span>
          </span>
          <span class="briefing__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            ${tempsEstime}
          </span>
          <span class="briefing__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            ${nombreArticles} articles
          </span>
        </div>
      </div>

      <!-- Briefing block: DARK CARD (dark bg + cream border) -->
      <div class="briefing__block">
        <span class="briefing__block-label">Briefing</span>
        <p>${m.contexteHistorique}</p>
        <p>${m.description}</p>
      </div>

      <div class="section-label mt-8">Sources du dossier</div>

      <!-- Sources: alternating dark/light cards -->
      <div class="sources-grid">
        ${dossier.sources.map((s, i) => renderSourceCard(s, i)).join('')}
      </div>

      <div class="briefing__cta">
        <p>Lisez attentivement les sources avant de commencer votre analyse.</p>
        <button class="btn btn--primary" id="start-analyse-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Commencer l'analyse
        </button>
      </div>

    </div>
  `;

  document.getElementById('start-analyse-btn')?.addEventListener('click', () => {
    if (state.gameState) state.gameState.phase = 'analyse';
    navigate('analyse');
  });

  animateIn(container);
}


function renderSourceCard(source, index) {
  // Alternate: 0=dark, 1=light, 2=dark, 3=light
  const isDark = (index % 2 === 0);
  const variant = isDark ? 'dark' : 'light';
  const illuCtx = isDark ? 'dark' : 'light';

  const typeIconKey = source.type === 'document-officiel' ? 'document_officiel'
    : source.type === 'temoignage' ? 'temoignage'
    : 'enquete_media';

  const dateStr = formatDate(source.date);

  const imageHtml = source.image ? `
    <div class="source-card__image">
      <img src="${source.image}" alt="${source.titre}" class="img-noir" loading="lazy">
    </div>` : '';

  return `
    <div class="source-card source-card--${variant}">
      ${imageHtml}
      <div class="source-card__top">
        <span class="source-card__type-label">${ICONS[typeIconKey](40, illuCtx)} ${source.type === 'document-officiel' ? 'Document officiel' : source.type === 'temoignage' ? 'Témoignage' : 'Enquête média'}</span>
        <span class="source-card__date">${dateStr}</span>
      </div>
      <div class="source-card__title">${source.titre}</div>
      <div class="source-card__author">${source.auteur}</div>
      <p class="source-card__summary">${source.resume}</p>
      ${source.extraits.map(ext => `
        <blockquote class="source-card__extract">« ${ext.texte} »</blockquote>
      `).join('')}
    </div>
  `;
}


// ── ANALYSE PAGE ──
function renderAnalyse() {
  if (!state.currentDossier || !state.gameState) {
    navigate('home');
    return;
  }

  const dossier = state.currentDossier;
  const article = dossier.articles[state.gameState.articleIndex];
  if (!article) return;

  const reader = document.getElementById('article-reader');
  reader.innerHTML = `
    <div class="article-reader__header">
      <div class="article-reader__media">
        <span class="article-reader__media-name">${article.media}</span>
        <span class="article-reader__media-sep">—</span>
        <span class="article-reader__media-date">${formatDate(article.date)}</span>
      </div>
      <h2 class="article-reader__title">${article.titre}</h2>
      <div class="article-reader__author">Par ${article.auteur}</div>
    </div>
    <div class="article-reader__body">
      ${article.contenu.map(p => `
        <p class="article-reader__paragraph" data-pid="${p.id}">${p.texte}</p>
      `).join('')}
    </div>
    <div class="article-reader__instruction">
      <strong>Sélectionnez un passage suspect</strong> pour identifier la technique de manipulation utilisée.
    </div>
  `;

  // Score panel
  updateScorePanel();

  // Analyse actions — btn--primary for CTA
  const actionsContainer = document.getElementById('analyse-actions');
  actionsContainer.innerHTML = `
    <button class="btn btn--primary" id="finish-analyse-btn" style="width:100%">
      Terminer l'analyse
    </button>
  `;

  document.getElementById('finish-analyse-btn')?.addEventListener('click', () => {
    if (state.gameState) state.gameState.phase = 'verdict';
    navigate('verdict');
  });

  // Setup text selection
  setupTextSelection();

  animateIn(reader);
}


function updateScorePanel() {
  const scoreEl = document.getElementById('panel-score');
  const maxEl = document.getElementById('panel-score-max');
  const countEl = document.getElementById('panel-annotation-count');
  const ringFill = document.getElementById('score-ring-fill');
  const listEl = document.getElementById('panel-annotations');

  if (scoreEl) scoreEl.textContent = Math.max(0, state.score);
  if (maxEl) maxEl.textContent = `/ ${state.gameState?.scoreMax || 60}`;
  if (countEl) countEl.textContent = state.annotations.length;

  // Update ring
  if (ringFill) {
    const max = state.gameState?.scoreMax || 60;
    const pct = Math.max(0, state.score) / max;
    const circumference = 2 * Math.PI * 52;
    ringFill.style.strokeDashoffset = circumference * (1 - pct);
  }

  // Update annotation list
  if (listEl) {
    if (state.annotations.length === 0) {
      listEl.innerHTML = '<div class="annotation-list__empty">Sélectionnez du texte pour commencer</div>';
    } else {
      listEl.innerHTML = state.annotations.map(a => `
        <div class="annotation-item annotation-item--${a.correct ? 'correct' : 'wrong'}">
          <div class="annotation-item__technique">${getTechniqueName(a.technique)}</div>
          <div class="annotation-item__text">« ${truncate(a.text, 60)} »</div>
          <div class="annotation-item__points">${a.points > 0 ? '+' : ''}${a.points} pts</div>
        </div>
      `).join('');
    }
  }
}


// ── TEXT SELECTION & GAMEPLAY ──

// Technique definitions for toolbar buttons
const TOOLBAR_TECHNIQUES = [
  { id: 'mots-charges', icon: ICONS.mots_charges(16), label: 'Mots chargés' },
  { id: 'selection-sources', icon: ICONS.selection_sources(16), label: 'Sélection sources' },
  { id: 'omission-contextuelle', icon: ICONS.omission(16), label: 'Omission' },
  { id: 'generalisation-abusive', icon: ICONS.generalisation(16), label: 'Généralisation' },
  { id: 'appel-emotion', icon: ICONS.appel_emotion(16), label: 'Appel émotion' },
];

function createToolbar(container) {
  // Remove any existing toolbar
  const old = document.getElementById('floating-toolbar');
  if (old) old.remove();

  const toolbar = document.createElement('div');
  toolbar.id = 'floating-toolbar';
  toolbar.className = 'floating-toolbar';
  toolbar.innerHTML = TOOLBAR_TECHNIQUES.map(t => `
    <button class="technique-btn" data-technique="${t.id}">
      <span class="icon icon--sm">${t.icon}</span> ${t.label}
    </button>
  `).join('');

  // Attach technique click handlers
  toolbar.querySelectorAll('.technique-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const technique = btn.dataset.technique;
      if (!state.selectedText || !state.selectedParagraphId) return;
      state.pendingTechnique = technique;
      hideToolbar();
      showSourceLinker(technique);
    });
  });

  container.appendChild(toolbar);
  return toolbar;
}

function setupTextSelection() {
  const body = document.querySelector('.article-reader__body');
  if (!body) return;

  // Make body the positioning context for the absolute toolbar
  body.style.position = 'relative';

  // Create toolbar fresh inside body
  createToolbar(body);

  body.addEventListener('mouseup', handleTextSelection);
  body.addEventListener('touchend', handleTextSelection);

  // Close toolbar on click outside — works reliably
  document.addEventListener('pointerdown', (e) => {
    const tb = document.getElementById('floating-toolbar');
    if (tb && tb.classList.contains('active') && !tb.contains(e.target)) {
      hideToolbar();
      window.getSelection()?.removeAllRanges();
    }
  });
}


function handleTextSelection() {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || sel.toString().trim().length < 3) {
    return;
  }

  const text = sel.toString().trim();
  const range = sel.getRangeAt(0);
  const paragraph = range.startContainer.parentElement?.closest('[data-pid]');
  if (!paragraph) return;

  state.selectedText = text;
  state.selectedRange = range.cloneRange();
  state.selectedParagraphId = paragraph.dataset.pid;

  showToolbar(range);
}


function showToolbar(range) {
  const toolbar = document.getElementById('floating-toolbar');
  if (!toolbar) return;

  // Make toolbar visible off-screen first to measure it
  toolbar.classList.add('active');
  toolbar.style.top = '-9999px';
  toolbar.style.left = '-9999px';

  // Force layout to get real dimensions
  const tbRect = toolbar.getBoundingClientRect();
  const tbW = tbRect.width;
  const tbH = tbRect.height;

  const selRect = range.getBoundingClientRect();
  const selMidX = selRect.left + selRect.width / 2;

  // Position: place above selection (BD speech bubble style)
  const body = document.querySelector('.article-reader__body');
  if (!body) { toolbar.classList.remove('active'); return; }
  const bodyRect = body.getBoundingClientRect();

  // Desired top: above the selection, accounting for the 12px tail
  let top = selRect.top - bodyRect.top - tbH - 16;
  let left = selMidX - bodyRect.left - tbW / 2;

  // Clamp: don't go off the left/right edges of the body
  const minLeft = 0;
  const maxLeft = bodyRect.width - tbW;
  left = Math.max(minLeft, Math.min(left, maxLeft));

  // If it would go above the body container, place below the selection instead
  if (top < -bodyRect.top + 8) {
    top = selRect.bottom - bodyRect.top + 16;
    toolbar.classList.add('toolbar--below');
  } else {
    toolbar.classList.remove('toolbar--below');
  }

  // Position the tail to point at the selection center
  const tailX = selMidX - bodyRect.left - left;
  const tailClamped = Math.max(20, Math.min(tailX, tbW - 20));
  toolbar.style.setProperty('--tail-x', `${tailClamped}px`);

  toolbar.style.top = `${top}px`;
  toolbar.style.left = `${left}px`;
}


function hideToolbar() {
  const toolbar = document.getElementById('floating-toolbar');
  if (toolbar) toolbar.classList.remove('active');
}


// Technique button clicks — handled by createToolbar() now
document.addEventListener('DOMContentLoaded', () => {
  // Skip source button (static in HTML)
  document.getElementById('skip-source-btn')?.addEventListener('click', () => {
    submitAnnotation(null);
  });
});


function showSourceLinker(technique) {
  const linker = document.getElementById('source-linker');
  const extractsEl = document.getElementById('source-linker-extracts');
  if (!linker || !extractsEl || !state.currentDossier) return;

  const sources = state.currentDossier.sources;

  extractsEl.innerHTML = sources.flatMap(source =>
    source.extraits.map(ext => `
      <button class="source-extract-btn" data-extract-id="${ext.id}">
        <span class="source-extract-btn__source">${source.titre}</span>
        « ${truncate(ext.texte, 120)} »
      </button>
    `)
  ).join('');

  // Source click
  extractsEl.querySelectorAll('.source-extract-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      submitAnnotation(btn.dataset.extractId);
    });
  });

  linker.classList.add('active');
}


function submitAnnotation(sourceId) {
  if (!state.currentDossier || !state.gameState || !state.pendingTechnique) return;

  const article = state.currentDossier.articles[state.gameState.articleIndex];
  const paragraph = article.contenu.find(p => p.id === state.selectedParagraphId);

  if (!paragraph || !state.selectedText) return;

  // Find offset
  const startOffset = paragraph.texte.indexOf(state.selectedText);
  const endOffset = startOffset + state.selectedText.length;

  // Validate
  const result = validateAnnotation(
    state.selectedParagraphId,
    startOffset,
    endOffset,
    state.pendingTechnique,
    sourceId,
    article,
    state.currentDossier
  );

  state.annotations.push({
    text: state.selectedText,
    technique: state.pendingTechnique,
    source: sourceId,
    correct: result.correct,
    points: result.points,
    techniqueCorrect: result.techniqueCorrect,
    sourceCorrect: result.sourceCorrect,
  });

  state.score += result.points;
  state.gameState.score = state.score;

  // Highlight the text
  highlightSelection(result.correct);

  // Flash
  flashOverlay(result.correct);

  // Update UI
  updateScorePanel();

  // Hide source linker
  document.getElementById('source-linker')?.classList.remove('active');

  // Reset
  state.selectedText = null;
  state.selectedRange = null;
  state.selectedParagraphId = null;
  state.pendingTechnique = null;
  window.getSelection()?.removeAllRanges();
}


function validateAnnotation(paragraphId, startOffset, endOffset, technique, sourceId, article, dossier) {
  const match = article.annotations.find(ann => {
    if (ann.paragrapheId !== paragraphId) return false;
    const oStart = Math.max(ann.debutOffset, startOffset);
    const oEnd = Math.min(ann.finOffset, endOffset);
    const overlap = Math.max(0, oEnd - oStart);
    const annLen = ann.finOffset - ann.debutOffset;
    return overlap / annLen > 0.5;
  });

  if (!match) {
    return { correct: false, points: dossier.scoring.penaliteFauxPositif, techniqueCorrect: false, sourceCorrect: false };
  }

  const techniqueCorrect = technique === match.technique;
  const sourceCorrect = sourceId && match.sourcesContradictoires.includes(sourceId);

  let points = 0;
  if (techniqueCorrect) {
    points = match.points;
  } else {
    points = Math.floor(match.points * 0.3);
  }
  if (sourceCorrect) {
    points += dossier.scoring.bonusSourceCorrecte;
  }

  return { correct: true, points, techniqueCorrect, sourceCorrect };
}


function highlightSelection(correct) {
  if (!state.selectedRange) return;
  try {
    const span = document.createElement('span');
    span.className = 'highlight';
    span.style.borderBottomColor = correct ? 'var(--green)' : 'var(--red)';
    if (correct) {
      span.style.background = 'rgba(46, 125, 50, 0.15)';
    }
    state.selectedRange.surroundContents(span);
  } catch (e) {
    // Range may span multiple nodes — fallback silently
  }
}


function flashOverlay(correct) {
  const overlay = document.getElementById('flash-overlay');
  if (!overlay) return;
  overlay.className = `flash-overlay flash-${correct ? 'correct' : 'wrong'}`;
  setTimeout(() => { overlay.className = 'flash-overlay'; }, 400);
}


// ── VERDICT PAGE ──
function renderVerdict() {
  if (!state.currentDossier || !state.gameState) {
    navigate('home');
    return;
  }

  const container = document.getElementById('verdict-content');
  const dossier = state.currentDossier;
  const allAnnotations = dossier.articles[0]?.annotations || [];
  const score = Math.max(0, state.score);
  const maxScore = state.gameState.scoreMax;
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  // Calculate stats
  const found = state.annotations.filter(a => a.correct).length;
  const falsePositives = state.annotations.filter(a => !a.correct).length;
  const precision = state.annotations.length > 0
    ? Math.round((found / state.annotations.length) * 100)
    : 0;

  // Determine rank
  const rank = getRank(score, dossier.scoring.seuils);

  container.innerHTML = `
    <div class="verdict">

      <!-- Header: LIGHT CARD -->
      <div class="verdict__header">
        <div class="verdict__stamp">Analyse terminée</div>
        <div class="verdict__score">${score} / ${maxScore}</div>
        <div class="verdict__rank">
          <span class="verdict__rank-icon">${getRankIcon(rank)}</span>
          ${rank}
        </div>
      </div>

      <!-- Stats: DARK CARDS with cream border -->
      <div class="verdict__stats">
        <div class="verdict__stat">
          <div class="verdict__stat-value verdict__stat-value--green">${found}/${allAnnotations.length}</div>
          <div class="verdict__stat-label">Techniques trouvées</div>
        </div>
        <div class="verdict__stat">
          <div class="verdict__stat-value verdict__stat-value--red">${falsePositives}</div>
          <div class="verdict__stat-label">Faux positifs</div>
        </div>
        <div class="verdict__stat">
          <div class="verdict__stat-value verdict__stat-value--blue">${precision}%</div>
          <div class="verdict__stat-label">Précision</div>
        </div>
      </div>

      <div class="verdict__review-title">Relecture détaillée</div>
      <div class="verdict__review-list">
        ${allAnnotations.map((ann, i) => renderReviewCard(ann, i)).join('')}
      </div>

      <div class="verdict__cta">
        <a href="#home" class="btn btn--dark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 22V12h6v10"/></svg>
          Retour aux dossiers
        </a>
      </div>

    </div>
  `;

  // Toggle explanations
  container.querySelectorAll('.review-card__toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const body = toggle.closest('.review-card__body');
      const explanation = body?.querySelector('.review-card__explanation');
      if (explanation) {
        explanation.classList.toggle('open');
        toggle.textContent = explanation.classList.contains('open') ? 'Masquer' : 'Voir l\'explication';
      }
    });
  });

  animateIn(container);
}


function renderReviewCard(ann, index) {
  const wasFound = state.annotations.some(a =>
    a.correct && a.technique === ann.technique
  );

  const points = wasFound
    ? state.annotations.find(a => a.correct && a.technique === ann.technique)?.points || 0
    : 0;

  return `
    <div class="review-card">
      <div class="review-card__header">
        <span class="review-card__status review-card__status--${wasFound ? 'found' : 'missed'}">
          ${wasFound ? '✓ Identifié' : '✗ Non identifié'}
        </span>
        <span class="review-card__points">${points} pts</span>
      </div>
      <div class="review-card__body">
        <blockquote class="review-card__quote">« ${ann.texteCible} »</blockquote>
        <div class="review-card__technique">
          <span class="review-card__technique-label">
            <span class="icon icon--sm">${getTechniqueIcon(ann.technique)}</span>
            ${getTechniqueName(ann.technique)}
          </span>
        </div>
        <button class="review-card__toggle">Voir l'explication</button>
        <div class="review-card__explanation">
          <p style="margin-top: 12px; line-height: 1.7;">${ann.explication}</p>
        </div>
      </div>
    </div>
  `;
}


// ── HELPERS ──
function getRank(score, seuils) {
  if (score >= (seuils.redacteurEnChef || 55)) return 'Rédacteur en chef';
  if (score >= (seuils.correspondant || 45)) return 'Correspondant';
  if (score >= (seuils.reporter || 35)) return 'Reporter';
  if (score >= (seuils.pigiste || 20)) return 'Pigiste';
  return 'Stagiaire';
}

function getRankIcon(rank) {
  const rankIcons = {
    'Stagiaire': ICONS.stagiaire(36, 'light'),
    'Pigiste': ICONS.pigiste(36, 'light'),
    'Reporter': ICONS.correspondant(36, 'light'),
    'Correspondant': ICONS.correspondant(36, 'light'),
    'Rédacteur en chef': ICONS.redacteurEnChef(36, 'light'),
  };
  return rankIcons[rank] || ICONS.stagiaire(36, 'light');
}

function getTechniqueName(id) {
  const names = {
    'mots-charges': 'Mots chargés',
    'selection-sources': 'Sélection de sources',
    'omission-contextuelle': 'Omission contextuelle',
    'generalisation-abusive': 'Généralisation abusive',
    'appel-emotion': 'Appel à l\'émotion',
    'anonymisation': 'Anonymisation',
    'faux-equilibre': 'Faux équilibre',
    'deplacement-temporel': 'Déplacement temporel',
    'recontextualisation': 'Recontextualisation',
  };
  return names[id] || id;
}

function getTechniqueIcon(id) {
  const techIcons = {
    'mots-charges': ICONS.mots_charges(16),
    'selection-sources': ICONS.selection_sources(16),
    'omission-contextuelle': ICONS.omission(16),
    'generalisation-abusive': ICONS.generalisation(16),
    'appel-emotion': ICONS.appel_emotion(16),
    'anonymisation': ICONS.mots_charges(16),
    'faux-equilibre': ICONS.generalisation(16),
    'deplacement-temporel': ICONS.clock(16),
    'recontextualisation': ICONS.generalisation(16),
  };
  return techIcons[id] || ICONS.mots_charges(16);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  // Already a readable string (e.g., "Février 2018")
  if (/^[A-ZÀ-Ü]/i.test(dateStr) && !/^\d/.test(dateStr)) {
    return dateStr;
  }

  // Handle "2018-02" format
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    const [y, m] = dateStr.split('-');
    return `${months[parseInt(m) - 1]} ${y}`;
  }

  // Handle "2018-01-15" format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split('-');
    return `${parseInt(d)} ${months[parseInt(m) - 1].toLowerCase()} ${y}`;
  }

  return dateStr;
}

function truncate(str, len) {
  if (!str) return '';
  return str.length > len ? str.substring(0, len) + '…' : str;
}


// ── ANIMATIONS ──
function animateIn(container) {
  if (typeof gsap === 'undefined') return;

  const elements = container.querySelectorAll(
    '.home-hero, .stats-strip, .section-label, .dossier-card, ' +
    '.briefing__header, .briefing__block, .source-card, .briefing__cta, ' +
    '.article-reader, .score-panel__card, ' +
    '.verdict__header, .verdict__stat, .verdict__review-title, .review-card'
  );

  // Kill any lingering tweens on these elements first
  gsap.killTweensOf(elements);

  gsap.fromTo(elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
    }
  );
}


// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // Set initial rank icon in topbar
  const rankIconEl = document.getElementById('user-rank-icon');
  if (rankIconEl && typeof ICONS !== 'undefined') {
    rankIconEl.innerHTML = ICONS.stagiaire(18, 'dark');
  }
  initRouter();
});
