import React, { useEffect } from 'react'
import { Link, navigate } from '../router.jsx'
import { useLang } from '../i18n.jsx'
import { ListenButton } from '../components/shared.jsx'
import { concepts } from '../content/concepts.js'
import { quizItems } from '../content/quiz.js'
import { recordLessonCompletion } from '../progress.js'

export default function Concept({ conceptId }) {
  const { t, pick, lang } = useLang()
  const concept = concepts.find(c => c.id === conceptId)

  useEffect(() => {
    if (concept) {
      const timer = setTimeout(() => {
        recordLessonCompletion(concept.id, concept.theme)
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [conceptId, concept])

  if (!concept) {
    return (
      <div className="wrap center" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h3>{pick({ en: 'Concept not found.', hi: 'अवधारणा नहीं मिली।' })}</h3>
        <Link to="/learn" className="btn ghost" style={{ marginTop: 12 }}>{t('backToLearn')}</Link>
      </div>
    )
  }

  const related = (concept.relatedConceptIds || [])
    .map(id => concepts.find(c => c.id === id))
    .filter(Boolean)

  const listenText = [
    pick(concept.situation),
    pick(concept.constitutionSays),
    ...(concept.explanation || []).map(p => pick(p)),
    pick(concept.whyItMatters),
    pick(concept.example),
  ].join(' ')

  const relatedQuiz = quizItems.filter(q => q.conceptId === concept.id)
  const themeLabel = concept.theme === 'preamble'
    ? t('themePreamble')
    : concept.theme === 'fundamental-rights'
      ? t('themeRights')
      : t('themeDuties')

  return (
    <div className="wrap lesson-view-container">
      {/* Navigation Breadcrumb */}
      <div className="lesson-breadcrumb">
        <Link to="/learn" className="btn ghost small" style={{ padding: '4px 10px' }}>
          ← {t('backToLearn')}
        </Link>
        <span>/</span>
        <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{themeLabel}</span>
      </div>

      {/* Header & Speech Read Aloud */}
      <div className="lesson-title-head">
        <div>
          <span className="section-kicker">CONSTITUTIONAL LESSON</span>
          <h2>{pick(concept.title)}</h2>
        </div>
        <ListenButton text={listenText} />
      </div>

      {/* 1. Real-Life Situation Card */}
      <div className="lesson-situation-hero-card">
        <div className="situation-hero-label">
          ❓ {pick({ en: 'THE REAL-LIFE SITUATION', hi: 'वास्तविक जीवन की स्थिति' })}
        </div>
        <div className="situation-hero-question">
          “{pick(concept.situation)}”
        </div>
      </div>

      {/* 2. What the Constitution Says */}
      <div className="lesson-saying-box">
        <div className="saying-box-label">
          ⚖️ {t('constitutionSays')}
        </div>
        <p className="saying-box-text">
          {pick(concept.constitutionSays)}
        </p>
      </div>

      {/* 3. Detailed Explanations */}
      <div className="lesson-prose-block">
        <h3 className="lesson-section-subheading">
          💡 {pick({ en: 'Understanding the Principle', hi: 'संवैधानिक सिद्धांत को समझें' })}
        </h3>
        {(concept.explanation || []).map((p, i) => (
          <p key={i}>{pick(p)}</p>
        ))}

        <h3 className="lesson-section-subheading" style={{ marginTop: 24 }}>
          🌟 {t('whyMatters')}
        </h3>
        <p>{pick(concept.whyItMatters)}</p>

        <h3 className="lesson-section-subheading" style={{ marginTop: 24 }}>
          🚗 {t('example')}
        </h3>
        <p>{pick(concept.example)}</p>
      </div>

      {/* 4. Official Constitutional Provision Accordion */}
      {concept.provisions && concept.provisions.length > 0 && (
        <details className="lesson-official-provision-card">
          <summary>
            📜 {t('wantMore')} ({pick({ en: 'Read original text from Constitution of India', hi: 'भारतीय संविधान से मूल विधिक पाठ पढ़ें' })})
          </summary>
          {concept.provisions.map((p, i) => (
            <div className="official-provision-body" key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span className="provision-ref-tag">{pick(p.label)}</span>
                {p.part && (
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-faint)' }}>
                    Part {p.part}
                  </span>
                )}
              </div>
              <blockquote className="official-quote">{pick(p.originalText)}</blockquote>
              <a
                href={p.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}
              >
                {t('viewOriginal')} ↗
              </a>
            </div>
          ))}
        </details>
      )}

      {/* Practice CTA Bar */}
      {relatedQuiz.length > 0 && (
        <div style={{
          background: 'var(--accent-soft)',
          border: '1.5px solid var(--accent-border)',
          borderRadius: '16px',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 36
        }}>
          <div>
            <strong style={{ fontSize: 16, color: 'var(--accent-deep)', display: 'block' }}>
              🧠 {pick({ en: 'Test Your Understanding Now', hi: 'अपने ज्ञान की तुरंत परीक्षा लें' })}
            </strong>
            <span style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>
              {pick({ en: 'Answer situational questions about this concept to earn +15 to +50 XP!', hi: 'इस अवधारणा पर स्थिति-आधारित प्रश्नों के उत्तर दें और +15 से +50 XP पाएं!' })}
            </span>
          </div>

          <button
            className="btn primary"
            onClick={() => navigate(`/play/quiz?c=${concept.id}`)}
          >
            🎯 {pick({ en: 'Take Quiz Challenge →', hi: 'क्विज़ चुनौती शुरू करें →' })}
          </button>
        </div>
      )}

      {/* Related Concepts Grid */}
      {related.length > 0 && (
        <section style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 14 }}>
            🔗 {t('relatedConcepts')}
          </h3>
          <div className="concepts-grid-modern">
            {related.map(r => (
              <Link key={r.id} to={`/learn/${r.id}`} className="concept-card-modern" style={{ padding: 18 }}>
                <span className="concept-tag-pill" style={{ width: 'fit-content', marginBottom: 8 }}>
                  {r.provisions && r.provisions[0] ? pick(r.provisions[0].label) : 'Article'}
                </span>
                <strong style={{ fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{pick(r.title)}</strong>
                <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', fontStyle: 'italic', margin: 0 }}>
                  “{pick(r.situation)}”
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
