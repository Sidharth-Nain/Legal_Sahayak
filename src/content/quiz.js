// Situation-based quiz items. Each maps to a concept; explanations teach
// the concept (with constitutional reference) AFTER the answer.
export const quizItems = [
  {
    id: 'q-powerful-driver', conceptId: 'fr-equality', difficulty: 1,
    question: {
      en: 'Two drivers jump a red light. One is a well-known powerful person. What does the Constitution expect?',
      hi: 'दो चालक लाल बत्ती पार करते हैं। एक प्रसिद्ध प्रभावशाली व्यक्ति है। संविधान क्या अपेक्षा करता है?',
    },
    options: {
      en: [
        'The powerful person should get extra time',
        'Only ordinary people are punished',
        'The law should apply equally to both',
        'Depends on the mood of the officer',
      ],
      hi: [
        'प्रभावशाली व्यक्ति को अतिरिक्त समय मिले',
        'केवल आम लोगों को दंडित किया जाए',
        'कानून दोनों पर समान लागू हो',
        'अधिकारी की इच्छा पर निर्भर करे',
      ],
    },
    correctIndex: 2,
    learnMore: {
      en: 'This is equality before law and equal protection of the laws — the State cannot deny it to any person.',
      hi: 'यह विधि के समक्ष समानता और विधियों की समान सुरक्षा है — राज्य इसे किसी व्यक्ति से वंचित नहीं कर सकता।',
    },
  },
  {
    id: 'q-express-opinion', conceptId: 'fr-freedom-of-speech', difficulty: 2,
    question: {
      en: 'Ravi wants to criticise a new government policy in a blog post. Which constitutional freedom is relevant?',
      hi: 'रवि एक ब्लॉग पोस्ट में सरकारी नीति की आलोचना करना चाहता है। कौन-सी संवैधानिक स्वतंत्रता प्रासंगिक है?',
    },
    options: {
      en: [
        'Freedom of religion',
        'Freedom of speech and expression',
        'Right against exploitation',
        'Right to property',
      ],
      hi: [
        'धर्म की स्वतंत्रता',
        'वाक् और अभिव्यक्ति की स्वतंत्रता',
        'शोषण के विरुद्ध अधिकार',
        'संपत्ति का अधिकार',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Freedom of speech and expression protects expressing opinions, subject to reasonable restrictions listed in the Constitution itself.',
      hi: 'वाक् और अभिव्यक्ति की स्वतंत्रता राय व्यक्त करने की रक्षा करती है, संविधान में ही अंकित युक्तियुक्त निर्बंधनों के अधीन।',
    },
  },
  {
    id: 'q-shop-refusal', conceptId: 'fr-non-discrimination', difficulty: 2,
    question: {
      en: 'A State-run hospital turns a patient away because of her religion. What does the Constitution say?',
      hi: 'राज्य का अस्पताल एक मरीज़ को उसके धर्म के कारण लौटा देता है। संविधान क्या कहता है?',
    },
    options: {
      en: [
        'The hospital can choose its patients',
        'Only private hospitals must not discriminate',
        'Religion can matter in treatment',
        'The State cannot discriminate on grounds of religion',
      ],
      hi: [
        'अस्पताल अपने मरीज़ चुन सकता है',
        'केवल निजी अस्पतालों को भेदभाव नहीं करना चाहिए',
        'इलाज में धर्म का ध्यान रखा जा सकता है',
        'राज्य धर्म के आधार पर भेदभाव नहीं कर सकता',
      ],
    },
    correctIndex: 3,
    learnMore: {
      en: 'The State cannot discriminate against any citizen on grounds only of religion, race, caste, sex or place of birth.',
      hi: 'राज्य किसी नागरिक के विरुद्ध केवल धर्म, मूलवंश, जाति, लिंग या जन्म-स्थान के आधार पर भेदभाव नहीं कर सकता।',
    },
  },
  {
    id: 'q-tea-stall', conceptId: 'fr-abolition-untouchability', difficulty: 1,
    question: {
      en: 'A tea-stall keeper forces a customer to use a separate glass because of his caste. This practice is…',
      hi: 'चाय वाला एक ग्राहक को उसकी जाति के कारण अलग गिलास इस्तेमाल करने को बाध्य करता है। यह प्रथा है…',
    },
    options: {
      en: [
        'Forbidden — untouchability is abolished and its practice punishable',
        'Allowed if the keeper\'s tradition says so',
        'Allowed outside cities',
        'A matter for the customer to adjust',
      ],
      hi: [
        'वर्जित — अस्पृश्यता समाप्त है और आचरण दंडनीय है',
        'अनुज्ञेय यदि विक्रेता की परंपरा ऐसी हो',
        'शहरों के बाहर अनुज्ञेय',
        'ग्राहक के समझौते का विषय',
      ],
    },
    correctIndex: 0,
    learnMore: {
      en: '"Untouchability" is abolished; its practice in any form is forbidden, and enforcing such disability is an offence punishable by law.',
      hi: '"अस्पृश्यता" समाप्त है; इसका किसी भी रूप में आचरण वर्जित है, और ऐसी अयोग्यता का प्रवर्तन विधि द्वारा दंडनीय अपराध है।',
    },
  },
  {
    id: 'q-detention', conceptId: 'fr-life-liberty', difficulty: 3,
    question: {
      en: 'Police hold a person in custody without telling him why, for weeks. Which constitutional protection is violated?',
      hi: 'पुलिस एक व्यक्ति को हफ़्तों हिरासत में रखती है, कारण बताए बिना। कौन-सा संवैधानिक संरक्षण उल्लंघित हुआ?',
    },
    options: {
      en: [
        'Freedom of trade',
        'Right to vote',
        'Protection of life and personal liberty',
        'Right to form associations',
      ],
      hi: [
        'व्यापार की स्वतंत्रता',
        'मतदान का अधिकार',
        'जीवन और व्यक्तिगत स्वतंत्रता का संरक्षण',
        'संघ बनाने का अधिकार',
      ],
    },
    correctIndex: 2,
    learnMore: {
      en: 'No person can be deprived of life or personal liberty except by fair procedure established by law.',
      hi: 'किसी व्यक्ति को विधि द्वारा स्थापित निष्पक्ष प्रक्रिया के अतिरिक्त जीवन या व्यक्तिगत स्वतंत्रता से वंचित नहीं किया जा सकता।',
    },
  },
  {
    id: 'q-school-fees', conceptId: 'fr-education', difficulty: 1,
    question: {
      en: 'A 9-year-old from a poor family is denied free elementary schooling. What does the Constitution provide?',
      hi: 'एक गरीब परिवार की 9 वर्षीय बच्ची को निःशुल्क प्रारंभिक शिक्षा से वंचित किया जाता है। संविधान क्या उपबंध करता है?',
    },
    options: {
      en: [
        'Education only for those who pay',
        'Free and compulsory education for children aged 6–14',
        'Schooling is a luxury, not a right',
        'Only boys must be educated free',
      ],
      hi: [
        'केवल वही जो भुगतान करें',
        '6–14 वर्ष के बच्चों के लिए निःशुल्क और अनिवार्य शिक्षा',
        'स्कूली शिक्षा विलासिता है, अधिकार नहीं',
        'केवल लड़कों की निःशुल्क शिक्षा',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'The State shall provide free and compulsory education to all children aged six to fourteen years.',
      hi: 'राज्य छह से चौदह वर्ष तक की आयु के सभी बच्चों को निःशुल्क और अनिवार्य शिक्षा उपलब्ध कराएगा।',
    },
  },
  {
    id: 'q-rights-violated', conceptId: 'fr-remedies', difficulty: 3,
    question: {
      en: 'If the government violates your Fundamental Rights, where can you directly go to enforce them?',
      hi: 'यदि सरकार आपके मूल अधिकारों का उल्लंघन करे, तो उन्हें लागू कराने के लिए आप सीधे कहाँ जा सकते हैं?',
    },
    options: {
      en: [
        'Only the office that violated them',
        'Social media only',
        'Nowhere — rights are only symbolic',
        'The Supreme Court (Article 32) and High Courts',
      ],
      hi: [
        'केवल वही दफ्तर जिसने उल्लंघन किया',
        'केवल सोशल मीडिया',
        'कहीं नहीं — अधिकार केवल प्रतीकात्मक हैं',
        'उच्चतम न्यायालय (अनुच्छेद 32) और उच्च न्यायालय',
      ],
    },
    correctIndex: 3,
    learnMore: {
      en: 'Moving the Supreme Court for enforcement of Fundamental Rights is itself a Fundamental Right — the "heart and soul" of the Constitution.',
      hi: 'मूल अधिकारों के प्रवर्तन हेतु उच्चतम न्यायालय जाना स्वयं मूल अधिकार है — संविधान की "आत्मा"।',
    },
  },
  {
    id: 'q-viral-rumour', conceptId: 'fd-scientific-tempor', difficulty: 1,
    question: {
      en: 'A fake "miracle cure" message is going viral. As a citizen, what does the Constitution encourage you to do?',
      hi: 'एक नकली "चमत्कारी इलाज" का संदेश वायरल हो रहा है। नागरिक होने के नाते संविधान आपसे क्या करवाने को प्रोत्साहित करता है?',
    },
    options: {
      en: [
        'Forward it to everyone quickly',
        'Verify facts and share responsibly (scientific temper)',
        'Believe it blindly',
        'Start a rumour in reply',
      ],
      hi: [
        'तुरंत सबको आगे भेजें',
        'तथ्य जाँचें और ज़िम्मेदारी से साझा करें (वैज्ञानिक दृष्टिकोण)',
        'आँख मूंदकर मान लें',
        'जवाब में अफवाह शुरू करें',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Developing scientific temper, humanism and the spirit of inquiry and reform is a Fundamental Duty of citizens.',
      hi: 'वैज्ञानिक दृष्टिकोण, मानववाद तथा ज्ञानार्जन और सुधार की भावना विकसित करना नागरिकों का मूल कर्तव्य है।',
    },
  },
  {
    id: 'q-peaceful-meeting', conceptId: 'fr-freedom-of-assembly', difficulty: 2,
    question: {
      en: 'Residents want to hold a peaceful, unarmed public meeting about a local issue. Can they?',
      hi: 'निवासी किसी स्थानीय मुद्दे पर शांतिपूर्ण, निःशस्त्र सार्वजनिक बैठक करना चाहते हैं। क्या वे कर सकते हैं?',
    },
    options: {
      en: [
        'No — meetings need a court order always',
        'Only political parties can assemble',
        'Yes — peaceful assembly without arms is a fundamental freedom',
        'Only indoors',
      ],
      hi: [
        'नहीं — बैठक के लिए सदैव न्यायालय का आदेश चाहिए',
        'केवल राजनीतिक दल सभा कर सकते हैं',
        'हाँ — शांतिपूर्ण निःशस्त्र सभा मूल स्वतंत्रता है',
        'केवल भवन के भीतर',
      ],
    },
    correctIndex: 2,
    learnMore: {
      en: 'Citizens have the right to assemble peaceably and without arms, subject to reasonable restrictions for public order.',
      hi: 'नागरिकों को शांतिपूर्वक और बिना हथियारों के सम्मेलन का अधिकार है, लोक-व्यवस्था हेतु युक्तियुक्त निर्बंधनों के अधीन।',
    },
  },
  {
    id: 'q-preamble-owner', conceptId: 'preamble-overview', difficulty: 1,
    question: {
      en: 'According to the Preamble, from whom does the Constitution draw its authority?',
      hi: 'उद्देशिका के अनुसार, संविधान की शक्ति किससे आती है?',
    },
    options: {
      en: [
        'Only the Parliament',
        'Only the President',
        'The judiciary',
        'We, the People of India',
      ],
      hi: [
        'केवल संसद',
        'केवल राष्ट्रपति',
        'न्यायपालिका',
        'हम, भारत के लोग',
      ],
    },
    correctIndex: 3,
    learnMore: {
      en: 'The Preamble opens with "WE, THE PEOPLE OF INDIA" — the people are the source of constitutional authority.',
      hi: 'उद्देशिका "हम, भारत के लोग" से शुरू होती है — जनता संवैधानिक शक्ति का स्रोत है।',
    },
  },
]

// Returns a new question object with options shuffled in sync across all languages,
// and the correctIndex updated to match the new position of the correct answer.
export function shuffleOptions(q) {
  if (!q || !q.options) return q
  const keys = Object.keys(q.options)
  const len = q.options[keys[0]]?.length || 0
  if (len <= 1) return q

  const indices = Array.from({ length: len }, (_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }

  const newOptions = {}
  for (const k of keys) {
    newOptions[k] = indices.map(i => q.options[k][i])
  }

  return {
    ...q,
    options: newOptions,
    correctIndex: indices.indexOf(q.correctIndex),
  }
}
