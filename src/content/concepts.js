// Constitutional content — English + हिन्दी.
// Simplified explanations must preserve the constitutional meaning.
// Original provision texts are quoted from the Constitution of India
// (Legislative Department, Ministry of Law & Justice — legislative.gov.in).
export const concepts = [
  {
    id: 'preamble-overview',
    theme: 'preamble',
    title: { en: 'We, the People of India', hi: 'हम, भारत के लोग' },
    situation: {
      en: 'Who does the Constitution actually belong to?',
      hi: 'संविधान असल में किसका है?',
    },
    constitutionSays: {
      en: 'The Constitution begins with the Preamble, which opens with "WE, THE PEOPLE OF INDIA" — the Constitution draws its authority from the citizens of India themselves.',
      hi: 'संविधान की शुरुआत उद्देशिका से होती है, जो "हम, भारत के लोग" से शुरू होती है — संविधान की शक्ति स्वयं भारत के नागरिकों से आती है।',
    },
    explanation: [
      { en: 'The Preamble is the introduction to the Constitution. In a few lines it states the goals of the Indian Republic: Justice, Liberty, Equality and Fraternity for all citizens.', hi: 'उद्देशिका संविधान की भूमिका है। कुछ ही पंक्तियों में यह भारतीय गणराज्य के लक्ष्य बताती है: सभी नागरिकों के लिए न्याय, स्वतंत्रता, समानता और बंधुता।' },
      { en: 'It declares India a Sovereign, Socialist, Secular, Democratic Republic. Sovereign means India decides its own affairs; democratic means the people elect their government.', hi: 'यह भारत को संप्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य घोषित करती है। संप्रभु का अर्थ है भारत अपने मामले स्वयं तय करता है; लोकतांत्रिक का अर्थ है जनता अपनी सरकार चुनती है।' },
      { en: 'Because it says "We, the People", every citizen — not just leaders or lawyers — is an owner of this Constitution.', hi: 'क्योंकि इसमें लिखा है "हम, भारत के लोग", इसलिए हर नागरिक — सिर्फ नेता या वकील नहीं — इस संविधान का स्वामी है।' },
    ],
    whyItMatters: {
      en: 'Knowing that the Constitution belongs to the people changes how you see your rights and duties — they are not favours from the government; they are guarantees you hold.',
      hi: 'यह जानना कि संविधान जनता का है, आपके अधिकारों और कर्तव्यों को देखने का तरीका बदल देता है — ये सरकार की देन नहीं हैं; ये आपकी गारंटी हैं।',
    },
    example: {
      en: 'When citizens vote in an election, they are exercising the democratic power the Preamble describes — "We, the People" choosing our government.',
      hi: 'जब नागरिक चुनाव में मतदान करते हैं, तो वे उद्देशिका में वर्णित लोकतांत्रिक शक्ति का प्रयोग करते हैं — "हम, भारत के लोग" अपनी सरकार चुनते हैं।',
    },
    provisions: [
      {
        kind: 'preamble', ref: 'Preamble', part: null,
        label: { en: 'The Preamble', hi: 'उद्देशिका' },
        originalText: {
          en: 'WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation.',
          hi: 'हम, भारत के लोग, भारत को एक संपूर्ण प्रभुत्व-संपन्न, समाजवादी, पंथनिरपेक्ष, लोकतंत्रात्मक गणराज्य बनाने के लिए तथा उसके समस्त नागरिकों को: सामाजिक, आर्थिक और राजनीतिक न्याय; विचार, अभिव्यक्ति, विश्वास, धर्म और उपासना की स्वतंत्रता; प्रतिष्ठा और अवसर की समता प्राप्त कराने के लिए तथा उन सब में व्यक्ति की गरिमा और राष्ट्र की एकता और अखंडता सुनिश्चित करने वाली बंधुता बढ़ाने के लिए दृढ़ संकल्प होकर अपनी इस संविधान सभा में आज तारीख 26 नवम्बर, 1949 ई. को एतद् द्वारा इस संविधान को अंगीकृत, अधिनियमित और आत्मार्पित करते हैं।',
        },
        sourceUrl: 'https://legislative.gov.in/constitution-of-india/',
      },
    ],
    relatedConceptIds: ['fr-equality', 'fr-freedom-of-speech'],
    difficulty: 1,
    wheelCategories: ['preamble'],
  },
  {
    id: 'fr-equality',
    theme: 'fundamental-rights',
    title: { en: 'Equality Before Law', hi: 'कानून के सामने समानता' },
    situation: {
      en: 'Can the law treat two people differently just because one is powerful?',
      hi: 'क्या कानून दो लोगों से अलग व्यवहार कर सकता है, सिर्फ इसलिए कि एक प्रभावशाली है?',
    },
    constitutionSays: {
      en: 'The Constitution guarantees equality before the law and equal protection of the laws to every person in India.',
      hi: 'संविधान भारत के हर व्यक्ति को विधि के समक्ष समानता और विधियों की समान सुरक्षा की गारंटी देता है।',
    },
    explanation: [
      { en: '"Equality before law" means no person is above the law — whether rich or poor, official or ordinary citizen, everyone is bound by the same laws.', hi: '"विधि के समक्ष समानता" का अर्थ है कि कोई व्यक्ति विधि से ऊपर नहीं है — अमीर हो या गरीब, अधिकारी हो या आम नागरिक, सभी उन्हीं कानूनों से बंधे हैं।' },
      { en: '"Equal protection of the laws" means the State must treat people in similar situations similarly. Reasonable classification for a valid purpose is allowed — but arbitrary favouritism is not.', hi: '"विधियों की समान सुरक्षा" का अर्थ है कि राज्य को समान स्थितियों में लोगों से समान व्यवहार करना चाहिए। वैध उद्देश्य के लिए उचित वर्गीकरण की अनुमति है — पर मनमाना पक्षपात नहीं।' },
      { en: 'This right belongs to every person — citizen or not — and is enforceable in courts.', hi: 'यह अधिकार हर व्यक्ति को प्राप्त है — नागरिक हो या नहीं — और इसे न्यायालयों में लागू कराया जा सकता है।' },
    ],
    whyItMatters: {
      en: 'This is the foundation of fairness: it means a government office, a police station or a court should treat you by the law — not by your connections, wealth or status.',
      hi: 'यह निष्पक्षता की नींव है: इसका मतलब है कि सरकारी दफ्तर, थाना या अदालत आपसे व्यवहार कानून के अनुसार करें — आपके संबंधों, धन या पद के आधार पर नहीं।',
    },
    example: {
      en: 'If two drivers jump a red light, the law should apply to both the same way — one cannot escape a penalty simply because he is an influential person.',
      hi: 'अगर दो चालक लाल बत्ती पार करें, तो कानून दोनों पर समान रूप से लागू होना चाहिए — कोई भी सिर्फ प्रभावशाली होने के नाते जुर्माने से नहीं बच सकता।',
    },
    provisions: [
      {
        kind: 'article', ref: '14', part: 'III',
        label: { en: 'Article 14', hi: 'अनुच्छेद 14' },
        originalText: {
          en: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
          hi: 'राज्य, भारत के राज्यक्षेत्र के भीतर किसी व्यक्ति को विधि के समक्ष समानता की अथवा विधियों की समान सुरक्षा का अधिकार से वंचित नहीं करेगा।',
        },
        sourceUrl: 'https://legislative.gov.in/constitution-of-india/',
      },
      {
        kind: 'part', ref: 'III', part: null,
        label: { en: 'Part III — Fundamental Rights', hi: 'भाग III — मूल अधिकार' },
        originalText: {
          en: 'Part III of the Constitution contains the Fundamental Rights — rights guaranteed to individuals that are enforceable against the State.',
          hi: 'संविधान के भाग III में मूल अधिकार हैं — व्यक्तियों को प्राप्त वे अधिकार जो राज्य के विरुद्ध प्रवर्तनीय हैं।',
        },
        sourceUrl: 'https://legislative.gov.in/constitution-of-india/',
      },
    ],
    relatedConceptIds: ['fr-non-discrimination', 'fr-remedies'],
    difficulty: 1,
    wheelCategories: ['equality', 'justice'],
  },
  {
    id: 'fr-non-discrimination',
    theme: 'fundamental-rights',
    title: { en: 'No Discrimination by the State', hi: 'राज्य द्वारा भेदभाव नहीं' },
    situation: {
      en: 'Can a shop owned by the State refuse to serve someone because of their religion or caste?',
      hi: 'क्या राज्य के स्वामित्व वाली दुकान किसी को उसके धर्म या जाति के आधार पर सेवा देने से मना कर सकती है?',
    },
    constitutionSays: {
      en: 'The Constitution prohibits the State from discriminating against any citizen only on grounds of religion, race, caste, sex or place of birth.',
      hi: 'संविधान राज्य को केवल धर्म, मूलवंश (जाति), लिंग या जन्म-स्थान के आधार पर किसी नागरिक के साथ भेदभाव करने से रोकता है।',
    },
    explanation: [
      { en: 'The State cannot exclude any citizen from shops, public restaurants, hotels, places of public entertainment, or the use of wells, tanks, bathing ghats, roads and public places maintained wholly or partly out of State funds.', hi: 'राज्य किसी नागरिक को दुकानों, सार्वजनिक भोजनालयों, होटलों, सार्वजनिक मनोरंजन के स्थानों तक, या राज्य के कोष से पूर्णतः या अंशतः पोषित कुएँ, तालाबों, स्नानघाटों, सड़कों और सार्वजनिक स्थानों के उपयोग तक पहुँच से वंचित नहीं कर सकता।' },
      { en: 'No citizen can face disability, liability, restriction or condition with regard to access to such places only on grounds of religion, race, caste, sex or place of birth.', hi: 'ऐसे स्थानों तक पहुँच के विषय में कोई नागरिक केवल धर्म, मूलवंश, लिंग या जन्म-स्थान के आधार पर अयोग्यता, दायित्व, बाध्यता या प्रतिबंध का सामना नहीं कर सकता।' },
      { en: 'Special provisions for women, children and socially and educationally backward classes are constitutionally permitted — protecting the disadvantaged is not "discrimination" in this sense.', hi: 'महिलाओं, बच्चों और सामाजिक व शैक्षणिक रूप से पिछड़े वर्गों के लिए विशेष उपबंध संवैधानिक रूप से अनुज्ञेय हैं — पिछड़ों की रक्षा इस अर्थ में "भेदभाव" नहीं है।' },
    ],
    whyItMatters: {
      en: 'Public places and services belong to everyone. This right protects dignity in everyday life — drinking water, roads, schools, hospitals cannot be divided by caste or religion.',
      hi: 'सार्वजनिक स्थान और सेवाएँ सबकी हैं। यह अधिकार रोजमर्रा की गरिमा की रक्षा करता है — पेयजल, सड़कें, स्कूल, अस्पताल जाति या धर्म से बाँटे नहीं जा सकते।',
    },
    example: {
      en: 'A government-run school cannot refuse admission to a child because of the child\'s caste; a State-run hospital cannot turn a patient away for her religion.',
      hi: 'सरकारी स्कूल किसी बच्चे को उसकी जाति के कारण प्रवेश नहीं दे सकता; राज्य का अस्पताल किसी मरीज़ को उसके धर्म के कारण नहीं लौटा सकता।',
    },
    provisions: [
      {
        kind: 'article', ref: '15', part: 'III',
        label: { en: 'Article 15', hi: 'अनुच्छेद 15' },
        originalText: {
          en: '(1) The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them. (2) No citizen shall, on grounds only of religion, race, caste, sex, place of birth or any of them, be subject to any disability, liability, restriction or condition with regard to—(a) access to shops, public restaurants, hotels and places of public entertainment; or (b) the use of wells, tanks, bathing ghats, roads and places of public resort maintained wholly or partly out of State funds or dedicated to the use of the general public.',
          hi: '(1) राज्य किसी नागरिक के विरुद्ध केवल धर्म, मूलवंश, जाति, लिंग, जन्म-स्थान या इनमें से किसी के आधार पर भेदभाव नहीं करेगा। (2) कोई नागरिक केवल धर्म, मूलवंश, जाति, लिंग, जन्म-स्थान या इनमें से किसी के आधार पर — (क) दुकानों, सार्वजनिक भोजनालयों, होटलों और सार्वजनिक मनोरंजन के स्थानों तक पहुँच के विषय में; या (ख) राज्य के कोष से पूर्णतः या अंशतः पोषित या सामान्य जनता के उपयोग के लिए समर्पित कुओं, तालाबों, स्नानघाटों, सड़कों और सार्वजनिक स्थलों के उपयोग के विषय में — किसी अयोग्यता, दायित्व, बाध्यता या प्रतिबंध का विषय नहीं होगा।',
        },
        sourceUrl: 'https://legislative.gov.in/constitution-of-india/',
      },
    ],
    relatedConceptIds: ['fr-equality', 'fr-abolition-untouchability'],
    difficulty: 2,
    wheelCategories: ['equality', 'justice'],
  },
  {
    id: 'fr-abolition-untouchability',
    theme: 'fundamental-rights',
    title: { en: 'Untouchability Abolished', hi: 'अस्पृश्यता का अंत' },
    situation: {
      en: 'Can anyone still make a person "untouchable" or stop them from entering a temple or a shop?',
      hi: 'क्या अब भी कोई किसी व्यक्ति को "अछूत" बना सकता है या उसे मंदिर या दुकान में जाने से रोक सकता है?',
    },
    constitutionSays: {
      en: '"Untouchability" is abolished and its practice in any form is forbidden. Enforcement of any disability arising out of "Untouchability" is an offence punishable in accordance with law.',
      hi: '"अस्पृश्यता" का अंत किया जाता है और इसके किसी भी रूप में आचरण का निषेध है। "अस्पृश्यता" से उत्पन्न किसी भी अयोग्यता के प्रवर्तन दंडनीय अपराध होंगे, विधि के अनुसार।',
    },
    explanation: [
      { en: 'The Constitution directly declares untouchability abolished — not just discouraged. Practising it in any form is forbidden.', hi: 'संविधान घोषित करता है कि अस्पृश्यता समाप्त है — केवल हतोत्साहित नहीं। इसका किसी भी रूप में आचरण वर्जित है।' },
      { en: 'Making anyone an "untouchable" — blocking entry to shops, roads, schools, wells, temples — is an offence under law, punishable by courts.', hi: 'किसी को "अछूत" बनाना — दुकानों, सड़कों, स्कूलों, कुओं, मंदिरों में प्रवेश रोकना — विधि के अंतर्गत अपराध है, जो अदालतों में दंडनीय है।' },
      { en: 'Parliament has made a specific law to punish such practices, showing this promise is backed by enforceable legal teeth.', hi: 'संसद ने ऐसी प्रथाओं को दंडित करने के लिए विशिष्ट कानून बनाया है, जो दिखाता है कि यह वादा विधि की कसकर बंधी व्यवस्था से समर्थित है।' },
    ],
    whyItMatters: {
      en: 'Every citizen must be able to live, shop, study and pray with equal dignity. This constitutional promise directly protects human dignity against age-old social evils.',
      hi: 'हर नागरिक समान गरिमा के साथ जी सके, खरीद सके, पढ़ सके और प्रार्थना कर सके। यह संवैधानिक वादा सदियों पुराने सामाजिक बुराइयों के विरुद्ध सीधे मानव गरिमा की रक्षा करता है।',
    },
    example: {
      en: 'If a tea-stall keeper forces a customer to drink from a separate glass because of caste, that is an offence — the customer can go to the police and the courts.',
      hi: 'अगर कोई चाय वाला किसी ग्राहक से जाति के आधार पर अलग गिलास से पीने को कहे, तो यह अपराध है — ग्राहक पुलिस और अदालत जा सकता है।',
    },
    provisions: [
      {
        kind: 'article', ref: '17', part: 'III',
        label: { en: 'Article 17', hi: 'अनुच्छेद 17' },
        originalText: {
          en: '"Untouchability" is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of "Untouchability" shall be an offence punishable in accordance with law.',
          hi: '"अस्पृश्यता" का अंत किया जाता है और इसके किसी भी रूप में आचरण का निषेध है। "अस्पृश्यता" से उत्पन्न किसी अयोग्यता का प्रवर्तन विधि के अनुसार दंडनीय अपराध होगा।',
        },
        sourceUrl: 'https://legislative.gov.in/constitution-of-india/',
      },
    ],
    relatedConceptIds: ['fr-non-discrimination', 'fd-scientific-tempor'],
    difficulty: 1,
    wheelCategories: ['equality', 'justice'],
  },
  {
    id: 'fr-freedom-of-speech',
    theme: 'fundamental-rights',
    title: { en: 'Freedom of Speech & Expression', hi: 'अभिव्यक्ति की स्वतंत्रता' },
    situation: {
      en: 'Can you express your opinion — in a debate, a post, a letter to the editor?',
      hi: 'क्या आप अपनी राय व्यक्त कर सकते हैं — बहस में, पोस्ट में, संपादक को पत्र में?',
    },
    constitutionSays: {
      en: 'The Constitution protects freedom of speech and expression for all citizens, subject to reasonable restrictions in the interests of the sovereignty and integrity of India, security of the State, public order, decency, morality, contempt of court, defamation and incitement to an offence.',
      hi: 'संविधान सभी नागरिकों को अभिव्यक्ति की स्वतंत्रता की रक्षा करता है — भारत की संप्रभुता और अखंडता, राज्य की सुरक्षा, लोक-व्यवस्था, शालीनता, नैतिकता, न्यायालय की अवमानना, मानहानि और अपराध उकसावे के हितों में युक्तियुक्त निर्बंधनों के अधीन।',
    },
    explanation: [
      { en: 'Every citizen has the freedom to hold and express opinions — by speaking, writing, publishing, or through art and media. This freedom is the lifeblood of a democracy.', hi: 'हर नागरिक को राय रखने और व्यक्त करने की स्वतंत्रता है — बोलकर, लिखकर, प्रकाशित करके, या कला और माध्यमों से। यह स्वतंत्रता लोकतंत्र की जीवन-रेखा है।' },
      { en: 'The freedom is not unlimited. The Constitution itself lists the interests for which reasonable restrictions can be imposed — such as public order or the security of the State.', hi: 'यह स्वतंत्रता असीमित नहीं है। संविधान स्वयं उन हितों की सूची देता है जिनके लिए युक्तियुक्त निर्बंधन लगाए जा सकते हैं — जैसे लोक-व्यवस्था या राज्य की सुरक्षा।' },
      { en: 'Restrictions must be reasonable and by law — they cannot be arbitrary or used to silence honest criticism.', hi: 'निर्बंधन युक्तियुक्त और विधि द्वारा होने चाहिए — वे मनमाने नहीं हो सकते और न ईमानदार आलोचना को दबाने के लिए इस्तेमाल हो सकते हैं।' },
    ],
    whyItMatters: {
      en: 'A democracy needs citizens who can question, debate and inform. Your voice matters — and the Constitution protects it, while asking you to use it responsibly.',
      hi: 'लोकतंत्र को ऐसे नागरिक चाहिए जो प्रश्न पूछ सकें, बहस कर सकें और सूचना दे सकें। आपकी आवाज़ मायने रखती है — और संविधान उसकी रक्षा करता है, साथ ही ज़िम्मेदारी से उपयोग की अपेक्षा भी करता है।',
    },
    example: {
      en: 'You can criticise a government policy in a newspaper column or on social media. But spreading deliberately false rumours that create panic is not protected.',
      hi: 'आप अखबार के कॉलम या सोशल मीडिया में सरकारी नीति की आलोचना कर सकते हैं। पर जानबूझकर दहशत फैलाने वाले झूठे अफवाह फैलाना संरक्षित नहीं है।',
    },
    provisions: [
      {
        kind: 'article', ref: '19', part: 'III',
        label: { en: 'Article 19(1)(a) with 19(2)', hi: 'अनुच्छेद 19(1)(क) सहित 19(2)' },
        originalText: {
          en: '19(1) All citizens shall have the right—(a) to freedom of speech and expression; … 19(2) Nothing in sub-clause (a) of clause (1) shall affect the operation of any existing law, or prevent the State from making any law, in so far as such law imposes reasonable restrictions on the exercise of the right conferred by the said sub-clause in the interests of the sovereignty and integrity of India, the security of the State, friendly relations with foreign States, public order, decency or morality or in relation to contempt of court, defamation or incitement to an offence.',
          hi: '19(1) सभी नागरिकों को निम्नलिखित अधिकार प्राप्त होंगे — (क) वाक् और अभिव्यक्ति की स्वतंत्रता; … 19(2) खंड (1) के उप-खंड (क) में किसी बात के होते हुए भी, कोई विद्यमान विधि लागू होने से और राज्य को यह रोकने से कि वह कोई विधि न बनाए, जितनी ऐसी विधि उक्त उप-खंड द्वारा प्रदत्त अधिकार के प्रयोग पर भारत की संप्रभुता और अखंडता, राज्य की सुरक्षा, विदेशी राज्यों के साथ मैत्रीपूर्ण संबंध, लोक-व्यवस्था, शालीनता या नैतिकता के हितों में या न्यायालय की अवमानना, मानहानि या अपराध उकसावे के विषय में युक्तियुक्त निर्बंधन लगाती है, प्रभाव नहीं पड़ेगा।',
        },
        sourceUrl: 'https://legislative.gov.in/constitution-of-india/',
      },
    ],
    relatedConceptIds: ['preamble-overview', 'fr-freedom-of-assembly'],
    difficulty: 2,
    wheelCategories: ['freedom', 'liberty'],
  },
  {
    id: 'fr-freedom-of-assembly',
    theme: 'fundamental-rights',
    title: { en: 'Peaceful Assembly & Association', hi: 'शांतिपूर्ण सभा और संघ' },
    situation: {
      en: 'Can people gather peacefully for a cause, or form an association or club?',
      hi: 'क्या लोग किसी उद्देश्य के लिए शांतिपूर्ण एकत्रित हो सकते हैं, या संघ/क्लब बना सकते हैं?',
    },
    constitutionSays: {
      en: 'All citizens have the right to assemble peaceably and without arms, and to form associations or unions, subject to reasonable restrictions in the interests of public order and other listed interests.',
      hi: 'सभी नागरिकों को शांतिपूर्ण और बिना हथियारों के सम्मेलन करने तथा संघ या संगठन बनाने का अधिकार है — लोक-व्यवस्था और अन्य अंकित हितों में युक्तियुक्त निर्बंधनों के अधीन।',
    },
    explanation: [
      { en: 'Citizens can hold meetings, take out peaceful processions, and form societies, unions or organisations — these are fundamental freedoms.', hi: 'नागरिक बैठकें कर सकते हैं, शांतिपूर्ण जुलूस निकाल सकते हैं, और सभा, संघ या संगठन बना सकते हैं — ये मूल स्वतंत्रताएँ हैं।' },
      { en: 'The assembly must be peaceful and unarmed. Reasonable restrictions for public order are allowed — for example, permission requirements for large processions.', hi: 'सभा शांतिपूर्ण और निःशस्त्र होनी चाहिए। लोक-व्यवस्था के लिए युक्तियुक्त निर्बंधन अनुज्ञेय हैं — उदाहरण के लिए, बड़ी जुलूसों के लिए अनुमति की व्यवस्था।' },
    ],
    whyItMatters: {
      en: 'Collective voices — residents\' associations, unions, campaign groups — depend on this freedom. It lets citizens act together, not just individually.',
      hi: 'सामूहिक आवाज़ें — निवासी संघ, संगठन, अभियान समूह — इसी स्वतंत्रता पर टिके हैं। यह नागरिकों को अकेले नहीं, साथ मिलकर कार्य करने देता है।',
    },
    example: {
      en: 'A neighbourhood committee can hold a peaceful public meeting about a local issue; a workers\' union can legally form and represent its members.',
      hi: 'मोहल्ला समिति किसी स्थानीय मुद्दे पर शांतिपूर्ण सार्वजनिक बैठक कर सकती है; मज़दूर संघ कानूनी रूप से बनकर अपने सदस्यों का प्रतिनिधित्व कर सकता है।',
    },
    provisions: [
      {
        kind: 'article', ref: '19(1)(b), 19(1)(c)', part: 'III',
        label: { en: 'Article 19(1)(b) & (c)', hi: 'अनुच्छेद 19(1)(ख) व (ग)' },
        originalText: {
          en: 'All citizens shall have the right—(b) to assemble peaceably and without arms; (c) to form associations or unions or co-operative societies.',
          hi: 'सभी नागरिकों को निम्नलिखित अधिकार प्राप्त होंगे — (ख) शांतिपूर्वक और बिना हथियारों के सम्मेलन करने का; (ग) संघ या संगठन या सहकारी समितियाँ बनाने का।',
        },
        sourceUrl: 'https://legislative.gov.in/constitution-of-india/',
      },
    ],
    relatedConceptIds: ['fr-freedom-of-speech'],
    difficulty: 2,
    wheelCategories: ['freedom'],
  },
  {
    id: 'fr-life-liberty',
    theme: 'fundamental-rights',
    title: { en: 'Right to Life & Personal Liberty', hi: 'जीवन और व्यक्तिगत स्वतंत्रता का अधिकार' },
    situation: {
      en: 'Can the State detain or punish anyone without following the law?',
      hi: 'क्या राज्य विधि का पालन किए बिना किसी को नज़रबंद या दंडित कर सकता है?',
    },
    constitutionSays: {
      en: 'No person shall be deprived of his life or personal liberty except according to procedure established by law. The State must follow fair, just and reasonable procedure before taking away liberty.',
      hi: 'किसी व्यक्ति को उसके जीवन या व्यक्तिगत स्वतंत्रता से वंचित नहीं किया जाएगा, सिवाय विधि द्वारा स्थापित प्रक्रिया के अनुसार। राज्य को स्वतंत्रता छीनने से पहले उचित, न्यायसंगत और विवेकपूर्ण प्रक्रिया अपनानी होगी।',
    },
    explanation: [
      { en: 'Life here means more than survival — courts have read it to include living with dignity: shelter, health, clean environment and livelihood are part of a meaningful life.', hi: 'यहाँ जीवन का अर्थ केवल जीवित रहना नहीं है — न्यायालयों ने इसे गरिमा के साथ जीवन तक विस्तृत किया है: आश्रय, स्वास्थ्य, स्वच्छ पर्यावरण और आजीविका अर्थपूर्ण जीवन के भाग हैं।' },
      { en: 'Personal liberty cannot be taken away casually. There must be a valid law, and the process must be fair — a person arrested must be told the grounds and produced before a magistrate.', hi: 'व्यक्तिगत स्वतंत्रता मनमाने ढंग से नहीं छीनी जा सकती। वैध विधि होनी चाहिए और प्रक्रिया निष्पक्ष होनी चाहिए — गिरफ्तार व्यक्ति को कारण बताए जाएँ और मजिस्ट्रेट के समक्ष प्रस्तुत किया जाए।' },
    ],
    whyItMatters: {
      en: 'This is the most personal protection the Constitution gives: your life, your freedom, your dignity. It stands between every citizen and arbitrary state power.',
      hi: 'यह संविधान की सबसे व्यक्तिगत रक्षा है: आपका जीवन, आपकी स्वतंत्रता, आपकी गरिमा। यह हर नागरिक और मनमानी राज्य-शक्ति के बीच खड़ा है।',
    },
    example: {
      en: 'Police cannot keep a person in custody indefinitely without informing them of the reason and producing them before a magistrate within the time the law requires.',
      hi: 'पुलिस किसी व्यक्ति को कारण बताए बिना और विधि के निर्धारित समय में मजिस्ट्रेट के सामने प्रस्तुत किए बिना अनिश्चितकाल तक हिरासत में नहीं रख सकती।',
    },
    provisions: [
      {
        kind: 'article', ref: '21', part: 'III',
        label: { en: 'Article 21', hi: 'अनुच्छेद 21' },
        originalText: {
          en: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
          hi: 'किसी व्यक्ति को उसके जीवन या व्यक्तिगत स्वतंत्रता से वंचित नहीं किया जाएगा, सिवाय विधि द्वारा स्थापित प्रक्रिया के अनुसार।',
        },
        sourceUrl: 'https://legislative.gov.in/constitution-of-india/',
      },
    ],
    relatedConceptIds: ['fr-remedies', 'fr-education'],
    difficulty: 2,
    wheelCategories: ['liberty', 'rights'],
  },
  {
    id: 'fr-education',
    theme: 'fundamental-rights',
    title: { en: 'Right to Education', hi: 'शिक्षा का अधिकार' },
    situation: {
      en: 'Can a child be denied schooling because her family cannot afford it?',
      hi: 'क्या किसी बच्चे को स्कूली शिक्षा से वंचित किया जा सकता है, इसलिए कि परिवार व्यय नहीं उठा सकता?',
    },
    constitutionSays: {
      en: 'The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.',
      hi: 'राज्य छह से चौदह वर्ष तक की आयु के सभी बच्चों को ऐसी रीति से, जैसी राज्य विधि द्वारा अवधारित करे, निःशुल्क और अनिवार्य शिक्षा उपलब्ध कराएगा।',
    },
    explanation: [
      { en: 'Education for children aged 6–14 is a Fundamental Right. The State must ensure free and compulsory schooling for every child in this age group.', hi: '6–14 वर्ष की आयु के बच्चों के लिए शिक्षा एक मूल अधिकार है। राज्य को इस आयु-समूह के हर बच्चे के लिए निःशुल्क और अनिवार्य शिक्षा सुनिश्चित करनी है।' },
      { en: 'Parliament made a law to implement this — the Right of Children to Free and Compulsory Education Act — turning the constitutional promise into an enforceable scheme.', hi: 'संसद ने इसे लागू करने के लिए विधि बनाई — बच्चों के निःशुल्क एवं अनिवार्य शिक्षा का अधिकार अधिनियम — जो संवैधानिक वादे को प्रवर्तनीय व्यवस्था बनाती है।' },
    ],
    whyItMatters: {
      en: 'Education changes a child\'s entire future — and the nation\'s. This right makes sure schooling is not a privilege for the rich but a guarantee for every child.',
      hi: 'शिक्षा बच्चे का पूरा भविष्य बदल देती है — और राष्ट्र का भी। यह अधिकार सुनिश्चित करता है कि स्कूली पढ़ाई अमीरों का विशेषाधिकार नहीं, हर बच्चे की गारंटी है।',
    },
    example: {
      en: 'A government school cannot charge fees from a 6–14 year old for elementary education, and the State is duty-bound to provide schooling access.',
      hi: 'सरकारी स्कूल 6–14 वर्ष के बच्चे से प्रारंभिक शिक्षा की फीस नहीं ले सकता, और राज्य स्कूली शिक्षा की पहुँच उपलब्ध कराने के लिए बाध्य है।',
    },
    provisions: [
      {
        kind: 'article', ref: '21A', part: 'III',
        label: { en: 'Article 21A', hi: 'अनुच्छेद 21क' },
        originalText: {
          en: 'The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.',
          hi: 'राज्य छह से चौदह वर्ष तक की आयु के सभी बच्चों को ऐसी रीति से, जैसी राज्य विधि द्वारा अवधारित करे, निःशुल्क और अनिवार्य शिक्षा उपलब्ध कराएगा।',
        },
        sourceUrl: 'https://legislative.gov.in/constitution-of-india/',
      },
    ],
    relatedConceptIds: ['fr-life-liberty'],
    difficulty: 1,
    wheelCategories: ['equality', 'rights'],
  },
  {
    id: 'fr-remedies',
    theme: 'fundamental-rights',
    title: { en: 'Constitutional Remedies', hi: 'संवैधानिक उपचार' },
    situation: {
      en: 'What can you do if the government itself violates your rights?',
      hi: 'अगर सरकार स्वयं आपके अधिकारों का उल्लंघन करे, तो आप क्या कर सकते हैं?',
    },
    constitutionSays: {
      en: 'The right to move the Supreme Court (and High Courts) for the enforcement of Fundamental Rights is itself a Fundamental Right — often called the "heart and soul" of the Constitution.',
      hi: 'मूल अधिकारों के प्रवर्तन के लिए उच्चतम न्यायालय (और उच्च न्यायालयों) में जाने का अधिकार स्वयं एक मूल अधिकार है — जिसे प्रायः संविधान की "आत्मा" कहा गया है।',
    },
    explanation: [
      { en: 'A right is only real if you can enforce it. Article 32 lets any person whose Fundamental Rights are violated go directly to the Supreme Court.', hi: 'अधिकार तभी वास्तविक है जब उसे लागू कराया जा सके। अनुच्छेद 32 किसी भी व्यक्ति को, जिसके मूल अधिकारों का उल्लंघन हो, सीधे उच्चतम न्यायालय जाने की अनुमति देता है।' },
      { en: 'The Supreme Court can issue writs — habeas corpus, mandamus, prohibition, quo warranto, certiorari — powerful orders to protect rights and check unlawful authority.', hi: 'उच्चतम न्यायालय रिट जारी कर सकता है — बंदी प्रत्यक्षीकरण, परमादेश, प्रतिषेध, अधिकार-पृच्छा, उत्प्रेषण — अधिकारों की रक्षा और अवैध शक्ति की जाँच के शक्तिशाली आदेश।' },
      { en: 'High Courts have similar, even wider, powers under Article 226. Dr. Ambedkar called this right the heart and soul of the Constitution.', hi: 'उच्च न्यायालयों के पास अनुच्छेद 226 के अंतर्गत समान, व्यापक शक्तियाँ हैं। डॉ. अंबेडकर ने इस अधिकार को संविधान की आत्मा कहा।' },
    ],
    whyItMatters: {
      en: 'It means Fundamental Rights are not just promises on paper. If the State crosses the line, the Constitution gives you a direct road to the highest court.',
      hi: 'इसका अर्थ है कि मूल अधिकार केवल कागज़ के वादे नहीं हैं। यदि राज्य सीमा लांघे, तो संविधान आपको सर्वोच्च अदालत तक सीधा रास्ता देता है।',
    },
    example: {
      en: 'If authorities unlawfully detain a person, a petition of habeas corpus ("produce the body") in the Supreme Court or High Court can force them to bring the person before the court.',
      hi: 'यदि अधिकारी किसी को अवैध रूप से हिरासत में रखें, तो उच्चतम या उच्च न्यायालय में बंदी प्रत्यक्षीकरण याचिका उन्हें व्यक्ति को अदालत के सामने लाने के लिए बाध्य कर सकती है।',
    },
    provisions: [
      {
        kind: 'article', ref: '32', part: 'III',
        label: { en: 'Article 32', hi: 'अनुच्छेद 32' },
        originalText: {
          en: '32(1) The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed. 32(2) The Supreme Court shall have power to issue directions or orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, whichever may be appropriate, for the enforcement of any of the rights conferred by this Part.',
          hi: '32(1) इस भाग द्वारा प्रदत्त अधिकारों के प्रवर्तन के लिए उचित कार्यवाहियों द्वारा उच्चतम न्यायालय में जाने का अधिकार गारंटीकृत है। 32(2) इस भाग द्वारा प्रदत्त अधिकारों में से किसी अधिकार के प्रवर्तन के लिए, उच्चतम न्यायालय को निर्देश या आदेश या रिट जारी करने की शक्ति होगी, जिनमें बंदी प्रत्यक्षीकरण, परमादेश, प्रतिषेध, अधिकार-पृच्छा और उत्प्रेषण की प्रकृति की रिटें सम्मिलित हैं, जो उचित हो।',
        },
        sourceUrl: 'https://legislative.gov.in/constitution-of-india/',
      },
    ],
    relatedConceptIds: ['fr-equality', 'fr-life-liberty'],
    difficulty: 3,
    wheelCategories: ['rights', 'justice'],
  },
  {
    id: 'fd-scientific-tempor',
    theme: 'duties',
    title: { en: 'Scientific Temper & Humanism', hi: 'वैज्ञानिक दृष्टिकोण और मानववाद' },
    situation: {
      en: 'You see a viral rumour causing panic. What does the Constitution expect of you as a citizen?',
      hi: 'आप एक वायरल अफवाह देखते हैं जो दहशत फैला रही है। नागरिक के नाते संविधान आपसे क्या अपेक्षा करता है?',
    },
    constitutionSays: {
      en: 'It is a Fundamental Duty of every citizen to develop scientific temper, humanism and the spirit of inquiry and reform.',
      hi: 'वैज्ञानिक दृष्टिकोण, मानववाद और ज्ञानार्जन तथा सुधार की भावना विकसित करना प्रत्येक नागरिक का मूल कर्तव्य है।',
    },
    explanation: [
      { en: 'Alongside rights, the Constitution (Article 51A) lists duties of citizens. One asks citizens to think scientifically — question claims, seek evidence — and to value humanism and reform.', hi: 'अधिकारों के साथ-साथ संविधान (अनुच्छेद 51क) नागरिक कर्तव्यों की सूची देता है। एक कर्तव्य नागरिकों से वैज्ञानिक ढंग से सोचने को कहता है — दावों पर प्रश्न पूछना, साक्ष्य खोजना — तथा मानववाद और सुधार को महत्व देने को।' },
      { en: 'Duties and rights go together: responsible citizenship keeps the Republic healthy, and in return the Constitution protects every citizen\'s freedoms.', hi: 'कर्तव्य और अधिकार साथ-साथ चलते हैं: ज़िम्मेदार नागरिकता गणराज्य को स्वस्थ रखती है, और बदले में संविधान हर नागरिक की स्वतंत्रता की रक्षा करता है।' },
    ],
    whyItMatters: {
      en: 'Rumours, blind faith and panic harm society. Scientific temper — checking before sharing, reasoning over hearsay — is a constitutional value, not just good advice.',
      hi: 'अफवाहें, अंधविश्वास और दहशत समाज को नुकसान पहुँचाते हैं। वैज्ञानिक दृष्टिकोण — फैलाने से पहले जाँचना, अफवाह पर तर्क — केवल अच्छी सलाह नहीं, संवैधानिक मूल्य है।',
    },
    example: {
      en: 'Before forwarding a viral message claiming a fake "miracle cure", a citizen with scientific temper verifies it from reliable sources first.',
      hi: 'नकली "चमत्कारी इलाज" का दावा करने वाला वायरल संदेश आगे भेजने से पहले, वैज्ञानिक दृष्टिकोण वाला नागरिक उसे भरोसेमंद स्रोतों से जाँचता है।',
    },
    provisions: [
      {
        kind: 'article', ref: '51A(h)', part: 'IV-A',
        label: { en: 'Article 51A(h)', hi: 'अनुच्छेद 51क(छ)' },
        originalText: {
          en: 'It shall be the duty of every citizen of India — (h) to develop the scientific temper, humanism and the spirit of inquiry and reform.',
          hi: 'भारत के प्रत्येक नागरिक का यह कर्तव्य होगा — (छ) वैज्ञानिक दृष्टिकोण, मानववाद तथा ज्ञानार्जन और सुधार की भावना का विकास करना।',
        },
        sourceUrl: 'https://legislative.gov.in/constitution-of-india/',
      },
      {
        kind: 'part', ref: 'IV-A', part: null,
        label: { en: 'Part IV-A — Fundamental Duties', hi: 'भाग IV-क — मूल कर्तव्य' },
        originalText: {
          en: 'Part IV-A of the Constitution enumerates the Fundamental Duties of citizens under Article 51A.',
          hi: 'संविधान के भाग IV-क में अनुच्छेद 51क के अंतर्गत नागरिकों के मूल कर्तव्यों का उल्लेख है।',
        },
        sourceUrl: 'https://legislative.gov.in/constitution-of-india/',
      },
    ],
    relatedConceptIds: ['fr-abolition-untouchability', 'preamble-overview'],
    difficulty: 1,
    wheelCategories: ['duties'],
  },
]
