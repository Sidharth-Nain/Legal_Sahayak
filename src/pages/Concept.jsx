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
  }, [conceptId])

  if (!concept) {
    return (
      <div className="wrap center" style={{ padding: '60px 0' }}>
        <p>Concept not found.</p>
        <Link to="/learn" className="btn ghost" style={{ marginTop: 12 }}>{t('backToLearn')}</Link>
      </div>
    )
  }

  const related = concept.relatedConceptIds
    .map(id => concepts.find(c => c.id === id))
    .filter(Boolean)

  const listenText = [
    pick(concept.situation),
    pick(concept.constitutionSays),
    ...concept.explanation.map(p => pick(p)),
    pick(concept.whyItMatters),
    pick(concept.example),
  ].join(' ')

  const relatedQuiz = quizItems.filter(q => q.conceptId === concept.id)

  return (
    <div className="wrap lesson">
      <p className="breadcrumb">
        <Link to="/learn">{t('backToLearn')}</Link> · {concept.theme === 'preamble' ? t('themePreamble') : concept.theme === 'fundamental-rights' ? t('themeRights') : t('themeDuties')}
      </p>
      <h2 style={{ fontSize: 'clamp(24px,3.5vw,32px)', margin: '4px 0 2px' }}>{pick(concept.title)}</h2>
      <ListenButton text={listenText} />

      <div className="situation-box">
        <div className="label">{t('yourSituation')}</div>
        <div className="q">“{pick(concept.situation)}”</div>
      </div>

      <h3 className="answer">{t('constitutionSays')}</h3>
      <p className="prose" style={{ fontWeight: 600, color: 'var(--ink)' }}>{pick(concept.constitutionSays)}</p>

      {concept.explanation.map((p, i) => <p key={i}>{pick(p)}</p>)}

      <h3 className="answer">{t('whyMatters')}</h3>
      <p>{pick(concept.whyItMatters)}</p>

      <h3 className="answer">{t('example')}</h3>
      <p>{pick(concept.example)}</p>

      <details className="more">
        <summary>{t('wantMore')}</summary>
        {concept.provisions.map((p, i) => (
          <div className="provision" key={i}>
            <span className="ref">{pick(p.label)}</span>
            {p.part ? <span className="part">Part {p.part === 'III' ? (lang === 'hi' ? 'III' : 'III') : p.part}</span> : null}
            <blockquote>{pick(p.originalText)}</blockquote>
            <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer">{t('viewOriginal')} ↗</a>
          </div>
        ))}
      </details>

      {relatedQuiz.length > 0 && (
        <div className="game-actions">
          <button className="btn primary" onClick={() => navigate(`/play/quiz?c=${concept.id}`)}>
            {t('navPlay')} — {t('chooseOption')}
          </button>
        </div>
      )}

      {related.length > 0 && (
        <section className="block">
          <div className="section-title">{t('relatedConcepts')}</div>
          <div className="grid two">
            {related.map(r => (
              <Link key={r.id} to={`/learn/${r.id}`} className="card concept-card">
                <span className="situation">“{pick(r.situation)}”</span>
                <span className="muted">{pick(r.title)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
