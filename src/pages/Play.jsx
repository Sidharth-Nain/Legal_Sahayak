import React from 'react'
import { Link } from '../router.jsx'
import { useLang } from '../i18n.jsx'

export default function Play() {
  const { t, pick } = useLang()

  const games = [
    {
      to: '/play/build-constitution',
      themeClass: 'game-builder',
      icon: '🏛️',
      name: { en: 'Build Your Constitution', hi: 'संविधान निर्माण' },
      tag: { en: 'GRAND ARCHITECTURE', hi: 'संवैधानिक संरचना' },
      difficulty: { en: 'Levels 1–3', hi: 'स्तर 1–3' },
      reward: '+100 XP & 🎓 Certificate',
      desc: {
        en: 'Drag and arrange constitutional pillars, tripartite organs of government, and watchdogs into India\'s grand framework.',
        hi: 'भारत के भव्य ढांचे में संवैधानिक स्तंभों, शासन के तीनों अंगों और स्वतंत्र संस्थाओं को व्यवस्थित करें।'
      },
      cta: { en: 'Architect Now →', hi: 'निर्माण शुरू करें →' }
    },
    {
      to: '/play/quiz',
      themeClass: 'game-quiz',
      icon: '🧠',
      name: { en: 'Quiz Challenge', hi: 'प्रश्नोत्तरी चुनौती' },
      tag: { en: '51 REAL DILEMMAS', hi: '51 वास्तविक प्रश्न' },
      difficulty: { en: 'All Levels', hi: 'सभी स्तर' },
      reward: '+15 to +50 XP',
      desc: {
        en: 'Answer situation-based questions at your own pace. Instant legal explanations help you learn why rights apply.',
        hi: 'दैनिक स्थितियों पर आधारित प्रश्नों को हल करें। तुरंत मिलने वाले विधिक स्पष्टीकरण से वास्तविक अधिकार समझें।'
      },
      cta: { en: 'Start Quiz →', hi: 'क्विज़ खेलें →' }
    },
    {
      to: '/play/spin-wheel',
      themeClass: 'game-wheel',
      icon: '🎡',
      name: { en: 'Spin Wheel', hi: 'अधिकार चक्र' },
      tag: { en: 'TOPIC ROULETTE', hi: 'विषय चक्र' },
      difficulty: { en: 'Fast & Fun', hi: 'त्वरित चक्र' },
      reward: '+10 XP per win',
      desc: {
        en: 'Spin the constitutional wheel, land on a democratic pillar (Equality, Freedom, Duties, Justice), and solve its question.',
        hi: 'संविधान चक्र घुमाएं, किसी स्तंभ (समता, स्वतंत्रता, कर्तव्य, न्याय) पर रुकें और उसका प्रश्न हल करें।'
      },
      cta: { en: 'Spin the Wheel →', hi: 'पहिया घुमाएँ →' }
    },
    {
      to: '/play/cards',
      themeClass: 'game-cards',
      icon: '🃏',
      name: { en: 'Card Flip', hi: 'कार्ड पलटें' },
      tag: { en: 'FLASH RECALL', hi: 'स्मरण कार्ड' },
      difficulty: { en: 'Interactive 3D', hi: 'इंटरैक्टिव 3D' },
      reward: '+15 XP per deck',
      desc: {
        en: 'Collectible flip cards: a real-world dilemma on the front, the governing Article and constitutional concept on the back.',
        hi: 'कार्ड पलटें: आगे वास्तविक जीवन की स्थिति, पीछे उसका संबंधित अनुच्छेद और संवैधानिक अवधारणा।'
      },
      cta: { en: 'Flip Deck →', hi: 'कार्ड पलटें →' }
    },
  ]

  return (
    <div className="wrap play-hub-page">
      {/* Game Hub Header */}
      <div className="play-hub-hero">
        <span className="section-kicker">GAMIFIED CONSTITUTIONAL ARENA</span>
        <h2>{pick({ en: 'Play & Learn', hi: 'खेलें और सीखें' })}</h2>
        <p>
          {pick({
            en: 'Turn constitutional knowledge into challenges. Earn XP, maintain your streak, level up to Rank 50, and claim official E-Certificates.',
            hi: 'संवैधानिक ज्ञान को चुनौतियों में बदलें। XP अर्जित करें, अध्ययन लय बनाए रखें, स्तर 50 तक पहुँचें और आधिकारिक ई-प्रमाणपत्र प्राप्त करें।'
          })}
        </p>
      </div>

      {/* 4 Distinct Games Grid */}
      <div className="game-hub-grid">
        {games.map(g => (
          <Link key={g.to} to={g.to} className={`hub-game-card ${g.themeClass}`}>
            <div>
              {/* Badge & Reward Header */}
              <div className="game-card-badge-row">
                <span className="game-reward-pill">⭐ {g.reward}</span>
                <span className="game-difficulty-pill">{pick(g.difficulty)}</span>
              </div>

              {/* Game Icon Emblem */}
              <div className="game-card-icon-emblem" aria-hidden="true">
                {g.icon}
              </div>

              {/* Title & Tag */}
              <h3 className="game-card-title">{pick(g.name)}</h3>
              <p className="game-card-desc">{pick(g.desc)}</p>
            </div>

            {/* Play CTA Button */}
            <div className="game-card-cta-btn">
              {pick(g.cta)}
            </div>
          </Link>
        ))}
      </div>

      {/* Gamification Motivation Strip */}
      <div style={{
        marginTop: 40,
        background: '#ffffff',
        border: '1.5px solid var(--line)',
        borderRadius: '16px',
        padding: '24px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 32 }}>🏆</span>
          <div>
            <strong style={{ fontSize: 16, color: 'var(--ink)' }}>
              {pick({ en: 'Unlock 17 Collectible Badges', hi: '17 संग्रहणीय उपलब्धि बैज अनलॉक करें' })}
            </strong>
            <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', margin: '2px 0 0' }}>
              {pick({ en: 'Complete challenges, answer questions without failing, and maintain your learning streak.', hi: 'चुनौतियाँ पूरी करें, बिना गलती किए क्विज़ हल करें और अपनी अध्ययन लय बनाए रखें।' })}
            </p>
          </div>
        </div>

        <Link to="/profile" className="btn ghost small">
          🏅 {pick({ en: 'View Your Badges & Journey →', hi: 'अपने बैज व यात्रा देखें →' })}
        </Link>
      </div>
    </div>
  )
}
