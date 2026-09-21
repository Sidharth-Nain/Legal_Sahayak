import React, { createContext, useContext, useEffect, useState } from 'react'

// Multilingual UI layer. Content fields carry their own {en, hi} objects
// (see content/). UI strings live here; fallback chain is hi -> en.
const UI = {
  navLearn: { en: 'Learn', hi: 'सीखें' },
  navPlay: { en: 'Play', hi: 'खेलें' },
  navAbout: { en: 'About', hi: 'परिचय' },
  navProfile: { en: 'My Progress', hi: 'मेरी प्रगति' },
  heroTitle: {
    en: 'Understand the Constitution through real life — not memorising Articles.',
    hi: 'जीवन के उदाहरणों से समझें संविधान — अनुच्छेद रटना नहीं।',
  },
  heroLede: {
    en: 'Every lesson starts with a citizen\'s question, answers it in simple language, and only then shows the constitutional reference — verified against official Government of India sources.',
    hi: 'हर पाठ एक नागरिक के प्रश्न से शुरू होता है, सरल भाषा में उत्तर देता है, और तभी संवैधानिक संदर्भ दिखाता है — सरकारी आधिकारिक स्रोतों से सत्यापित।',
  },
  startLearning: { en: 'Start Learning', hi: 'सीखना शुरू करें' },
  playPractice: { en: 'Play & Practice', hi: 'खेलें और अभ्यास करें' },
  themes: { en: 'Learning themes', hi: 'सीखने के विषय' },
  themePreamble: { en: 'Preamble', hi: 'उद्देशिका' },
  themeRights: { en: 'Fundamental Rights', hi: 'मूल अधिकार' },
  themeDuties: { en: 'Fundamental Duties', hi: 'मूल कर्तव्य' },
  conceptsCount: { en: 'concepts', hi: 'अवधारणाएँ' },
  yourSituation: { en: 'A citizen asks', hi: 'नागरिक पूछता है' },
  constitutionSays: { en: 'What does the Constitution say?', hi: 'संविधान क्या कहता है?' },
  whyMatters: { en: 'Why does it matter?', hi: 'यह क्यों ज़रूरी है?' },
  example: { en: 'Example', hi: 'उदाहरण' },
  wantMore: { en: '📜 Want to know more? (Constitutional reference)', hi: '📜 और जानना चाहते हैं? (संवैधानिक संदर्भ)' },
  viewOriginal: { en: 'View original provision', hi: 'मूल उपबंध देखें' },
  listen: { en: '🔊 Listen', hi: '🔊 सुनें' },
  stop: { en: '⏹ Stop', hi: '⏹ रोकें' },
  relatedConcepts: { en: 'Related concepts', hi: 'संबंधित अवधारणाएँ' },
  gamesTitle: { en: 'Learning games', hi: 'सीखने के खेल' },
  gamesLede: {
    en: 'All four games use the same verified constitutional content — play to understand, practise, remember.',
    hi: 'चारों खेल एक ही सत्यापित संवैधानिक सामग्री से चलते हैं — समझने, अभ्यास और याद रखने के लिए खेलें।',
  },
  howToPlay: { en: 'How to play', hi: 'कैसे खेलें' },
  score: { en: 'Score', hi: 'अंक' },
  question: { en: 'Question', hi: 'प्रश्न' },
  next: { en: 'Next question', hi: 'अगला प्रश्न' },
  seeResult: { en: 'See result', hi: 'परिणाम देखें' },
  correct: { en: 'Correct!', hi: 'सही!' },
  notCorrect: { en: 'Not quite.', hi: 'सही नहीं।' },
  learnMore: { en: 'Learn more', hi: 'और जानें' },
  quizDone: { en: 'Session complete!', hi: 'सत्र पूरा!' },
  conceptsLearnt: { en: 'Concepts covered in this session', hi: 'इस सत्र में शामिल अवधारणाएँ' },
  playAgain: { en: 'Play again', hi: 'फिर खेलें' },
  spin: { en: 'SPIN', hi: 'घुमाएँ' },
  wheelTopic: { en: 'Topic selected', hi: 'चुना गया विषय' },
  wheelHint: { en: 'Tap SPIN, wait for the wheel to stop, then answer.', hi: 'घुमाएँ दबाएँ, पहिया रुकने दें, फिर उत्तर दें।' },
  flipHint: { en: 'Tap a card: front is a situation, back is the concept + reference.', hi: 'कार्ड दबाएँ: आगे स्थिति, पीछे अवधारणा + संदर्भ।' },
  diceRoll: { en: '🎲 Roll dice', hi: '🎲 पासा फेंकें' },
  turn: { en: 'Turn', hi: 'बारी' },
  restart: { en: 'Restart', hi: 'फिर से शुरू' },
  winner: { en: 'reached the Constitution first! 🎉', hi: 'संविधान तक पहले पहुँच गए! 🎉' },
  backHome: { en: 'Back to home', hi: 'होम पर जाएँ' },
  points: { en: 'Points', hi: 'अंक' },
  conceptsDone: { en: 'Concepts completed', hi: 'पूर्ण अवधारणाएँ' },
  streak: { en: 'Day streak', hi: 'दिन की लय' },
  badges: { en: 'Badges', hi: 'बैज' },
  noBadges: { en: 'Play games and complete lessons to earn badges.', hi: 'बैज कमाने के लिए खेल खेलें और पाठ पूरे करें।' },
  badgeFirstSteps: { en: 'First Steps', hi: 'पहले कदम' },
  badgeQuizStar: { en: 'Quiz Star', hi: 'प्रश्नोत्तरी सितारा' },
  badgeWheelMaster: { en: 'Wheel Master', hi: 'चक्र गुरु' },
  badgeCardSharp: { en: 'Card Explorer', hi: 'कार्ड अन्वेषक' },
  badgeBoardWalker: { en: 'Board Walker', hi: 'बोर्ड यात्री' },
  aboutSources: { en: 'Official sources of constitutional truth', hi: 'संवैधानिक सत्य के आधिकारिक स्रोत' },
  aboutAccuracy: {
    en: 'Simplified language must never simplify away the constitutional meaning. Original provision texts above are quoted from official publications.',
    hi: 'सरल भाषा का अर्थ संवैधानिक अर्थ को कमज़ोर करना नहीं है। ऊपर दिए मूल उपबंध आधिकारिक प्रकाशनों से उद्धृत हैं।',
  },
  disclaimer: {
    en: 'Learning aid only — not legal advice. Constitutional meaning is preserved; language is simplified, never the substance.',
    hi: 'केवल शिक्षा सहायक — कानूनी सलाह नहीं। संवैधानिक अर्थ सुरक्षित है; केवल भाषा सरल है, सार नहीं।',
  },
  sourcesNote: {
    en: 'Primary: Legislative Department, Ministry of Law & Justice. Secondary: India Code.',
    hi: 'प्राथमिक: विधायी विभाग, विधि एवं न्याय मंत्रालय। द्वितीय: इंडिया कोड।',
  },
  backToLearn: { en: 'Back to Learn', hi: 'सीखें पर वापस' },
  chooseOption: { en: 'Choose an answer', hi: 'उत्तर चुनें' },
  gameOver: { en: 'Game over', hi: 'खेल समाप्त' },
}

const LangCtx = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('ls-lang') || 'en')
  useEffect(() => {
    localStorage.setItem('ls-lang', lang)
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en'
  }, [lang])
  const t = (key) => {
    const entry = UI[key]
    if (!entry) return key
    return entry[lang] || entry.en
  }
  const pick = (field) => {
    if (field == null) return ''
    if (typeof field === 'string') return field
    return field[lang] || field.en || ''
  }
  return (
    <LangCtx.Provider value={{ lang, setLang, t, pick }}>
      {children}
    </LangCtx.Provider>
  )
}

export function useLang() {
  return useContext(LangCtx)
}
