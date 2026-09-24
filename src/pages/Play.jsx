import React from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'

export default function Play() {
  const { t, pick } = useLang()
  const games = [
    { to: '/play/build-constitution', emoji: '🏛️', name: { en: 'Build Your Constitution', hi: 'संविधान निर्माण' }, how: { en: 'Drag and arrange constitutional pillars, rights, and organs of state into India\'s grand framework!', hi: 'भारत के भव्य ढांचे में संवैधानिक स्तंभों, अधिकारों और शासन के अंगों को सही स्थान पर व्यवस्थित करें!' } },
    { to: '/play/quiz', emoji: '🧠', name: { en: 'Quiz Challenge', hi: 'प्रश्नोत्तरी चुनौती' }, how: { en: 'Answer situation-based questions at your own pace. Instant feedback helps you learn.', hi: 'स्थिति आधारित प्रश्नों के उत्तर दें। तुरंत प्रतिक्रिया से सीखें।' } },
    { to: '/play/spin-wheel', emoji: '🎡', name: { en: 'Spin Wheel', hi: 'चक्र घुमाएँ' }, how: { en: 'Spin the wheel, get a topic, answer its question.', hi: 'पहिया घुमाएँ, विषय पाएँ, उसका प्रश्न हल करें।' } },
    { to: '/play/cards', emoji: '🃏', name: { en: 'Card Flip', hi: 'कार्ड पलटें' }, how: { en: 'Flip cards: a situation on the front, the concept behind it.', hi: 'कार्ड पलटें: आगे स्थिति, पीछे उसकी अवधारणा।' } },
  ]
  return (
    <div className="wrap">
      <div className="hero" style={{ paddingBottom: 8 }}>
        <h2 style={{ fontSize: 'clamp(24px,3.5vw,32px)' }}>{t('gamesTitle')}</h2>
        <p className="lede" style={{ fontSize: 15 }}>{t('gamesLede')}</p>
      </div>
      <section className="block">
        <div className="grid two">
          {games.map(g => (
            <Link key={g.to} to={g.to} className="card game-card">
              <span className="emoji" aria-hidden="true">{g.emoji}</span>
              <h4>{pick(g.name)}</h4>
              <p>{pick(g.how)}</p>
              <span className="how">{t('howToPlay')} ↓</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
