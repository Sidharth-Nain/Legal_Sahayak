# Legal Sahayak — Design Blueprint (v1)

Status: **DESIGN PHASE — no implementation until the user says "BUILD THE WEBSITE" / "Start building".**
Product: SIH 2026, PS ID SIH1703 — "Let's Learn Constitution in a Simpler Manner — Citizen Perspective" (Smart Education).
Team: TechGeeks. Goal: constitutional **awareness and understanding** from real-life situations — NOT Article memorization.

---

## 1. Locked decisions (do not change without user approval)

| Decision | Choice |
|---|---|
| Frontend | **React + Vite** (ReactJS is in the approved SIH stack; Vite is a build tool, not a framework swap) |
| Backend | **Node.js + Express REST API** |
| Database | **PostgreSQL** |
| Auth (MVP) | **No login** — progress stored on-device (localStorage), accounts/cloud-sync deferred to Phase 2 |
| Content | **Versioned JSON in repo + validation script**; Postgres mirrors schema at runtime; admin panel Phase 2 |
| Languages | English + हिन्दी via a **multilingual content layer** (extensible to more languages) |
| Theme | **Light**, clean/modern/educational; constitutional identity subtle, never dominant |
| AI role | Support tool only (offline drafting pipeline first; live AI later, feature-flagged, grounded on verified text) |

### Approved-stack guardrails
- Never introduce another language/framework/service without explicit user approval.
- Styling: Tailwind CSS (utility CSS, not a framework swap). Games: pure SVG/Canvas. Icons: inline SVG. Charts: none needed.
- TTS: browser-native Web Speech API — zero audio assets, works offline, tiny footprint.

---

## 2. Product principles (from brief — binding)

1. Situation → Constitution's answer → simple explanation → why it matters → **then** optional Article reference.
2. Correct terminology: Parts, Articles, clauses/sub-clauses, Schedules. Never "section of the Constitution".
3. Official sources are the truth: legislative.gov.in (primary), indiacode.nic.in, then other GoI sources. Secondary sources never override official text.
4. Every concept traceable: provision → verified meaning → simple explanation → example → game content; review status visible internally.
5. "+1 must not create −1": Hindi, animations, or AI must not degrade English UX, performance, accuracy, or accessibility.
6. Priority order: Reliability → Performance → Accuracy → Usability → Accessibility → visual extras.
7. Every game has simple "How to play" (Class 9 reading level, numbered short steps).

---

## 3. Information architecture / sitemap (MVP)

```
/                    Home — value prop, Start Learning + Play & Practice, language toggle
/learn               Learn hub — themes: Preamble · Fundamental Rights · Fundamental Duties (intro)
/learn/:concept      Concept lesson — full learning-flow page
/play                Play hub — 4 game cards, one-line how-to each
/play/quiz           Quiz Challenge
/play/spin-wheel     Spin Wheel
/play/cards          Card Flip / Match
/play/snake-ladder   Constitution Snake & Ladder
/about               Project, official sources, accuracy & review statement, disclaimer
/profile             On-device progress, badges, streaks (no login)
```

Header: subtle chakra/Constitution-inspired SVG icon + "Legal Sahayak" upper-left; nav: Learn, Play, About; language toggle EN/हिंदी; text-size control (A−/A/A+).
Footer: official source links + "Learning aid — not legal advice" disclaimer + review-status note.

Background watermark: very low-opacity Ashoka/Lion Capital motif, used sparingly (hero areas only), never behind critical text/buttons, `prefers-reduced-motion` respected.

---

## 4. Concept lesson page — learning flow (the core UX)

1. **Real-life situation** (question format, one sentence) — e.g. "Can you express your opinion?"
2. **What does the Constitution say?** — 1–2 sentence plain-language answer.
3. **Simple explanation** — max 2–3 short paragraphs; one idea per paragraph.
4. **Why it matters?** — citizen-impact framing.
5. **Example** — concrete everyday scenario.
6. **📜 Want to know more?** (collapsible) — Constitutional Reference: "Article 14 · Part III — Fundamental Rights" + [View original provision] → official source link; original text verbatim.
7. **Practice** — inline mini-question (single item) linking to related quiz set.
8. Feedback → progress recorded on device → related concepts suggested.

---

## 5. Content architecture

Single source: `content/` JSON in repo. One **ConceptRecord** per concept (e.g. `equality-before-law`). All user-facing fields bilingual: `{ "en": "...", "hi": "..." }`.

```jsonc
{
  "id": "equality-before-law",
  "theme": "fundamental-rights",          // preamble | fundamental-rights | duties
  "title": { "en": "Equality Before Law", "hi": "कानून के सामने समानता" },
  "situation": { "en": "Can the law treat two people differently?", "hi": "…" },
  "constitutionSays": { "en": "…", "hi": "…" },
  "explanation": [{ "en": "…", "hi": "…" }],   // short paragraphs
  "whyItMatters": { "en": "…", "hi": "…" },
  "example": { "en": "…", "hi": "…" },
  "provisions": [{
    "kind": "article",                     // article | part | clause | schedule
    "ref": "14", "part": "III",
    "label": { "en": "Article 14", "hi": "अनुच्छेद 14" },
    "originalText": { "en": "verbatim official text", "hi": "official Hindi text" },
    "sourceUrl": "https://legislative.gov.in/…",
    "verifiedOn": "2026-09-01"
  }],
  "relatedConceptIds": ["…"],
  "difficulty": 1,                          // 1 easy | 2 medium | 3 advanced
  "quizIds": ["…"], "cardIds": ["…"], "wheelCategories": ["equality"],
  "snakeEvents": ["…"],
  "audio": { "mode": "tts" },               // or { "mode": "files", "en": "url", "hi": "url" }
  "review": { "status": "published",        // draft | fact-checked | expert-reviewed | published
              "reviewedBy": "…", "reviewedOn": "2026-09-05", "notes": "…" }
}
```

Separate collections: `quiz-items.json` (situation-based MCQs; each maps to a conceptId; fields: question, options, correctIndex, explanationAfter, learnMore with provision ref, difficulty, bilingual), `cards.json` (front situation, back concept + Article ref), `wheel-categories.json`, `snake-events.json`, `themes.json`, `ui-strings.json` (navigation/buttons/labels per language), `badges.json`.

### Content pipeline (offline authoring)
1. Draft (AI may assist language simplification/translation) →
2. Fact-check against legislative.gov.in / India Code text →
3. Expert review (status updated in-file) →
4. `npm run validate:content` — schema check, bilingual completeness report, referential integrity (every quiz/card/wheel/snake item maps to an existing published concept with ≥1 provision + source), terminology lint (bans "section of the Constitution" style errors) →
5. Build bundles only **published** items; API serves from Postgres mirror (same schema, seeded from JSON).

Hindi policy: no blind machine translation of legal language; where official Hindi constitutional text exists (legislative.gov.in publishes Hindi versions), use it as reference; missing Hindi → graceful fallback (English text + subtle "हिंदी अनुवाद उपलब्ध नहीं" tag), never broken UI.

---

## 6. Games — mechanics

All games share: How-to-play modal (numbered simple steps, first launch + "?" button), same points system, same concept feedback panel ("Learn more" with Article ref), same accessibility support (keyboard, TTS read-aloud of questions).

1. **Quiz Challenge** — 8–10 situation-based MCQs per session; difficulty adapts (start 2, adjust ±1 on streaks; AI-assisted selection later, flag-gated); instant right/wrong + explanation; end screen: score, concepts learnt list, retry weaker concepts.
2. **Spin Wheel** — 8 categories (Preamble, Equality, Freedom, Rights & Remedies, Duties, Justice, Liberty, Mixed). Click → accelerate → rotate ~2.5–3s with ease-out → land on precomputed result → concept question from that category. SVG wheel, no physics engine, requestAnimationFrame only while spinning.
3. **Card Flip / Match** — two modes: (a) Flip-to-learn: 6 cards, tap to reveal concept + Article ref; (b) Match pairs: situation ↔ concept. Back shows "Equality before Law — Article 14".
4. **Constitution Snake & Ladder** — 10×10 board, themed zones (Preamble path → Rights → Duties). Cell types: question (answer to advance correctly), civic-action bonus (advance), civic-lapse (themed setback), ladders named after protections ("Constitutional remedy lifts you up — Art 32"), snakes named after rights violations. 1–2 players (pass-and-play) + vs. simple computer.

Gamification: points per correct answer, badges (e.g., "Preamble Explorer", "Rights Rookie", "Duty Star"), streak counter, per-theme progress rings. No leaderboards in MVP (school/classroom mode Phase 2).

---

## 7. i18n, audio, accessibility

- **i18n:** language context (React) + `t(key)` for UI strings; content fields carry their own `{en, hi}`; fallback chain hi→en per field; `<html lang>` updated; Devanagari-safe typography; direction-safe layouts (both LTR now, architecture allows future RTL).
- **Audio:** Web Speech API `speechSynthesis`, voice matched to current language; speaker button on concept pages, quiz questions, and how-to-play; stops/pauses on navigation; respects reduced-motion and mute preference.
- **Accessibility:** WCAG-minded — semantic HTML, full keyboard navigation, visible focus, contrast ≥ 4.5:1, text-size control (A−/A/A+), large tap targets, TTS read-aloud, simple-language content itself is an accessibility feature, low-bandwidth: no large images (SVG only), code-split per route, lazy-load games.
- **Performance budgets:** initial JS < ~150KB gzipped; game interaction < 100ms; no layout shift from watermark; Lighthouse ≥ 90 on content pages; works on 3G-ish connections; localStorage persistence is synchronous and instant.

---

## 8. MVP content scope (prototype)

- Themes: **Preamble** (key values), **Fundamental Rights** (~12 concepts: equality 14, non-discrimination 15, equal opportunity 16, untouchability abolished 17, freedoms 19, life & liberty 21, education 21A, constitutional remedies 32…), **Fundamental Duties** (intro set, Art 51A highlights).
- All 4 games fully playable over this content; complete Hindi layer for the same content; TTS everywhere.
- Explicitly deferred: full Duties coverage, more languages, login/cloud sync, admin panel, classroom mode, PWA offline, live AI features.

---

## 9. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Constitutional inaccuracy | Official-source-only rule + verbatim original text + review-status pipeline + terminology lint |
| Hindi quality | Official Hindi constitutional text as reference; per-field fallback; completeness report in validation |
| Hindi breaking UX | Same layout/strings system; fallback tags; no separate Hindi site |
| Perf on low-end devices | SVG-only art, route code-splitting, tiny bundles, no heavy animation, budgets enforced |
| Scope creep | Fixed MVP list; every "+1" checked against "+1 must not create −1" |
| Judges/team bandwidth | JSON content is transparent and offline-reviewable; validation script automates integrity |

---

## 10. Open items for user (before build)

1. Branding assets: do you have a logo, or should the icon be a pure-SVG chakra/Constitution-inspired mark?
2. Color direction preference within light theme (e.g., saffron/white/green accents + navy ink vs. indigo/teal palette)?
3. Confirm MVP concept list (~15 concepts above) or adjust.
4. Team language: should UI defaults load in English or हिंदी for the SIH demo?

---

*Next step per user instruction: discussion only. Implementation begins exclusively on an explicit "BUILD THE WEBSITE" / "Start building" signal.*
