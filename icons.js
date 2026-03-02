/* ═══════════════════════════════════════════════════════════
   ULTIMATE REPORTER — Icons Library v2
   Polar Noir / Hand-drawn ink illustrations
   ───────────────────────────────────────────────────────
   Uses external .svg illustration files (black filled paths).
   Color adaptation via CSS filters:
   - Dark bg → .illu-dark class → filter: invert + sepia (cream)
   - Light bg → .illu-light class → stays black naturally
   ═══════════════════════════════════════════════════════════ */

const ICONS = {

  /* ── CATEGORIES (external .svg illustrations) ── */
  sante:    (s=32, ctx='dark') => `<img src="sante.svg" class="illu illu--${ctx}" width="${s}" alt="Santé">`,
  tech:     (s=32, ctx='dark') => `<img src="tech.svg" class="illu illu--${ctx}" width="${s}" alt="Tech">`,
  societe:  (s=32, ctx='dark') => `<img src="societe.svg" class="illu illu--${ctx}" width="${s}" alt="Société">`,
  medias:   (s=32, ctx='dark') => `<img src="medias.svg" class="illu illu--${ctx}" width="${s}" alt="Médias">`,

  /* ── RANKS (external .svg illustrations) ── */
  stagiaire:       (s=32, ctx='dark') => `<img src="stagiaire.svg" class="illu illu--${ctx}" width="${s}" alt="Stagiaire">`,
  pigiste:         (s=32, ctx='dark') => `<img src="pigiste.svg" class="illu illu--${ctx}" width="${s}" alt="Pigiste">`,
  correspondant:   (s=32, ctx='dark') => `<img src="correspondant.svg" class="illu illu--${ctx}" width="${s}" alt="Correspondant">`,
  redacteurEnChef: (s=32, ctx='dark') => `<img src="redacteur_en_chef.svg" class="illu illu--${ctx}" width="${s}" alt="Rédacteur en chef">`,

  /* ── SOURCE TYPES (external .svg illustrations) ── */
  document_officiel: (s=32, ctx='dark') => `<img src="document_officiel.svg" class="illu illu--${ctx}" width="${s}" alt="Document officiel">`,
  temoignage:        (s=32, ctx='dark') => `<img src="temoignage.svg" class="illu illu--${ctx}" width="${s}" alt="Témoignage">`,
  enquete_media:     (s=32, ctx='dark') => `<img src="enquete_media.svg" class="illu illu--${ctx}" width="${s}" alt="Enquête média">`,

  /* ── TECHNIQUES (inline SVG — small icons for toolbar & badges) ── */
  // These stay as inline SVG because they're used at small sizes in tight UI
  // They use currentColor so they adapt automatically

  mots_charges: (s=16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 3h16c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H7l-4 3V4c0-.6.4-1 1-1z"/>
    <line x1="12" y1="7" x2="12" y2="12"/>
    <circle cx="12" cy="14.5" r="1" fill="currentColor"/>
  </svg>`,

  selection_sources: (s=16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 4h18l-7 9v7l-4-2v-5L3 4z"/>
    <line x1="6" y1="7.5" x2="18" y2="7.5"/>
  </svg>`,

  omission: (s=16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="7" x2="9" y2="7"/>
    <rect x="9.5" y="5.5" width="8" height="3" rx="0.5" fill="currentColor" stroke="none"/>
    <line x1="18.5" y1="7" x2="21" y2="7"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <rect x="5" y="15.5" width="10" height="3" rx="0.5" fill="currentColor" stroke="none"/>
    <line x1="16" y1="17" x2="21" y2="17"/>
  </svg>`,

  generalisation: (s=16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="12" r="8"/>
    <path d="M11 4c0 0-4 3.5-4 8s4 8 4 8"/>
    <path d="M11 4c0 0 4 3.5 4 8"/>
    <line x1="3" y1="12" x2="19" y2="12"/>
    <path d="M18 10l3-3.5"/>
    <path d="M21 6.5l-3-1.5 3.5-1.5"/>
  </svg>`,

  appel_emotion: (s=16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21C12 21 3 14.5 3 8.5 3 5.4 5.4 3 8.5 3c1.7 0 3.2.8 4.2 2C13.7 3.8 15.3 3 17 3c3.1 0 5.5 2.4 5.5 5.5C22.5 14.5 12 21 12 21z"/>
    <path d="M12 8l-1.5 4 3-2-1.5 5"/>
  </svg>`,

  /* ── UI ICONS (inline SVG — small, functional) ── */

  lock: (s=16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="11" width="14" height="11" rx="2"/>
    <path d="M8 11V7a4 4 0 018 0v4"/>
    <circle cx="12" cy="17" r="1.5"/>
    <line x1="12" y1="18.5" x2="12" y2="20"/>
  </svg>`,

  lock_open: (s=16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="11" width="14" height="11" rx="2"/>
    <path d="M8 11V8a4 4 0 016.9-2.8"/>
    <path d="M16 11V8"/>
  </svg>`,

  clock: (s=16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="13" r="8"/>
    <path d="M12 9v4l3 2"/>
    <path d="M10 3h4"/>
    <path d="M12 3v2"/>
  </svg>`,

  articles: (s=16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6h14v16H6z" rx="1"/>
    <path d="M4 4h14v16"/>
    <line x1="8" y1="10" x2="16" y2="10"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="16" x2="12" y2="16"/>
  </svg>`,

  difficulty: (s=16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.9 19.1A9 9 0 1019.1 19.1"/>
    <path d="M12 12l-3.5-4"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    <path d="M8 19h8"/>
  </svg>`,
};

// Make available globally
if (typeof module !== 'undefined') module.exports = ICONS;
