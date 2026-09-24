// Situation-based quiz items. Each maps to a concept; explanations teach
// the concept (with constitutional reference) AFTER the answer.
export const quizItems = [
  // ==========================================
  // TOPIC 1: PREAMBLE (conceptId: 'preamble-overview')
  // ==========================================
  {
    id: 'q-preamble-owner',
    conceptId: 'preamble-overview',
    difficulty: 1,
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
  {
    id: 'q-preamble-secular',
    conceptId: 'preamble-overview',
    difficulty: 1,
    question: {
      en: 'A public library managed by a municipal council decides to stock books representing diverse religions and philosophical traditions. A resident objects, demanding only one religion be represented. What constitutional ideal in the Preamble guides the council\'s inclusive decision?',
      hi: 'नगर पालिका द्वारा संचालित पुस्तकालय विभिन्न धर्मों और दार्शनिक परंपराओं की पुस्तकें रखने का निर्णय लेता है। एक निवासी केवल एक ही धर्म की पुस्तकें रखने की मांग करता है। उद्देशिका का कौन-सा आदर्श समावेशी निर्णय का मार्गदर्शन करता है?',
    },
    options: {
      en: [
        'Monarchy',
        'Secularism — equal respect and impartiality towards all faiths',
        'Theocracy',
        'Privilege based on majority',
      ],
      hi: [
        'राजतंत्र',
        'पंथनिरपेक्षता — सभी पंथों के प्रति समान सम्मान और निष्पक्षता',
        'धर्मतंत्र',
        'बहुमत के आधार पर विशेषाधिकार',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Secularism in the Indian Constitution means the State treats all religions with equal respect (Sarva Dharma Sambhava) and does not establish any religion as an official state religion.',
      hi: 'भारतीय संविधान में पंथनिरपेक्षता का अर्थ है कि राज्य सभी धर्मों के प्रति तटस्थ और समान सम्मान रखेगा और उसका कोई राजधर्म नहीं होगा।',
    },
  },
  {
    id: 'q-preamble-sovereign',
    conceptId: 'preamble-overview',
    difficulty: 2,
    question: {
      en: 'An overseas agency tries to pressure the Indian Election Commission into altering the national election schedule for foreign convenience. Can the authorities reject this external pressure based on the Preamble?',
      hi: 'एक विदेशी संस्था चुनाव आयोग पर बाहरी सुविधा अनुसार राष्ट्रीय चुनाव तिथियाँ बदलने का दबाव बनाने की कोशिश करती है। क्या प्रशासन उद्देशिका के आधार पर इसे खारिज कर सकता है?',
    },
    options: {
      en: [
        'No, foreign agencies always dictate national decisions',
        'Yes, because India is a Sovereign republic free from external control',
        'Only if the United Nations gives written permission',
        'Decisions depend purely on foreign trade ties',
      ],
      hi: [
        'नहीं, विदेशी संस्थाओं के निर्देश मानने ही होते हैं',
        'हाँ, क्योंकि भारत एक संप्रभु गणराज्य है जो बाहरी नियंत्रण से मुक्त है',
        'केवल यदि संयुक्त राष्ट्र लिखित अनुमति दे',
        'फैसले केवल विदेशी व्यापारिक संबंधों पर निर्भर करते हैं',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: '"Sovereign" signifies that India has complete internal autonomy and independence from external dictation or foreign subjugation.',
      hi: '"संप्रभु" का अर्थ है कि भारत अपने आंतरिक और बाहरी मामलों का निर्णय स्वयं लेता है और किसी बाहरी शक्ति के अधीन नहीं है।',
    },
  },
  {
    id: 'q-preamble-fraternity',
    conceptId: 'preamble-overview',
    difficulty: 2,
    question: {
      en: 'A gated residential colony passes an unwritten rule denying tenants from specific states or language backgrounds. Which core value in the Preamble does this hostile attitude violate?',
      hi: 'एक आवासीय कॉलोनी कुछ राज्यों या भाषाई पृष्ठभूमि के लोगों को किरायेदार रखने पर अघोषित रोक लगाती है। यह पूर्वाग्रह उद्देशिका के किस मूल मूल्य का उल्लंघन करता है?',
    },
    options: {
      en: [
        'Commercial freedom',
        'Fraternity assuring individual dignity and national unity',
        'Absolute administrative power',
        'Diplomatic protocol',
      ],
      hi: [
        'व्यावसायिक स्वतंत्रता',
        'बंधुता, जो व्यक्ति की गरिमा और राष्ट्र की एकता सुनिश्चित करे',
        'पूर्ण प्रशासनिक शक्ति',
        'राजनयिक शिष्टाचार',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Fraternity promotes a spirit of common brotherhood amongst all Indians, transcending religious, linguistic, and regional differences.',
      hi: 'बंधुता सभी भारतीयों के बीच साझा भाईचारे की भावना को बढ़ावा देती है, जो धार्मिक, भाषाई और क्षेत्रीय मतभेदों से ऊपर है।',
    },
  },
  {
    id: 'q-preamble-justice',
    conceptId: 'preamble-overview',
    difficulty: 2,
    question: {
      en: 'The government introduces targeted food security rations and free legal defence for destitute families. Which goal of Justice proclaimed in the Preamble is directly being fulfilled?',
      hi: 'सरकार निर्धन परिवारों के लिए खाद्य सुरक्षा और निःशुल्क कानूनी सहायता योजना लागू करती है। उद्देशिका में घोषित \'न्याय\' का कौन-सा लक्ष्य यहाँ पूरा हो रहा है?',
    },
    options: {
      en: [
        'Social and Economic Justice',
        'Only political campaign justice',
        'Commercial monopoly',
        'Judicial punishment only',
      ],
      hi: [
        'सामाजिक और आर्थिक न्याय',
        'केवल चुनावी अभियान न्याय',
        'व्यापारिक एकाधिकार',
        'केवल अदालती दंड',
      ],
    },
    correctIndex: 0,
    learnMore: {
      en: 'The Preamble promises Justice — social, economic, and political — aiming to eliminate structural inequities and provide basic dignity to vulnerable citizens.',
      hi: 'उद्देशिका सामाजिक, आर्थिक और राजनीतिक न्याय का संकल्प लेती है, जिसका उद्देश्य विषमता को कम कर हर नागरिक को सम्मानजनक जीवन देना है।',
    },
  },
  {
    id: 'q-preamble-republic',
    conceptId: 'preamble-overview',
    difficulty: 2,
    question: {
      en: 'In some nations, the head of state is a hereditary monarch whose child automatically inherits the throne. In India, who can aspire to become the President (Head of State)?',
      hi: 'कुछ देशों में राष्ट्राध्यक्ष का पद वंशानुगत राजा का होता है। भारत में राष्ट्राध्यक्ष (राष्ट्रपति) बनने की योग्यता कौन रख सकता है?',
    },
    options: {
      en: [
        'Only descendants of a royal lineage',
        'Any qualified Indian citizen through constitutional election',
        'Only retired prime ministers',
        'Only the wealthiest landowners',
      ],
      hi: [
        'केवल किसी शाही परिवार के वंशज',
        'संवैधानिक चुनाव के माध्यम से कोई भी योग्य भारतीय नागरिक',
        'केवल पूर्व प्रधानमंत्री',
        'केवल सबसे धनी ज़मींदार',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: '"Republic" indicates that the office of the Head of State is elected, not hereditary, and is open to every citizen on equal terms.',
      hi: '"गणराज्य" का तात्पर्य है कि राष्ट्राध्यक्ष का पद निर्वाचित होता है, वंशानुगत नहीं, और हर नागरिक के लिए खुला है।',
    },
  },

  // ==========================================
  // TOPIC 2: EQUALITY BEFORE LAW (conceptId: 'fr-equality', Article 14)
  // ==========================================
  {
    id: 'q-powerful-driver',
    conceptId: 'fr-equality',
    difficulty: 1,
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
      en: 'This is equality before law and equal protection of the laws — the State cannot deny it to any person under Article 14.',
      hi: 'यह विधि के समक्ष समानता और विधियों की समान सुरक्षा है — राज्य अनुच्छेद 14 के तहत इसे किसी व्यक्ति से वंचित नहीं कर सकता।',
    },
  },
  {
    id: 'q-equality-govt-tender',
    conceptId: 'fr-equality',
    difficulty: 2,
    question: {
      en: 'A municipal department allocates a multi-crore public road contract directly to an officer\'s sibling without inviting bids or defining criteria. What constitutional principle under Article 14 does this breach?',
      hi: 'नगर निगम विभाग बिना किसी खुली निविदा या योग्यता के एक अधिकारी के भाई को सीधे सड़क निर्माण का करोड़ों का ठेका दे देता है। यह अनुच्छेद 14 के किस सिद्धांत का उल्लंघन है?',
    },
    options: {
      en: [
        'Discretionary privilege of public officials',
        'Protection against arbitrary state action and guarantee of fair treatment',
        'Freedom of family enterprise',
        'Right to administrative privacy',
      ],
      hi: [
        'सरकारी अधिकारियों का विवेकाधिकार',
        'राज्य की मनमानी कार्रवाई के विरुद्ध संरक्षण और निष्पक्षता की गारंटी',
        'पारिवारिक व्यवसाय की स्वतंत्रता',
        'प्रशासनिक गोपनीयता का अधिकार',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Article 14 forbids arbitrary state action. All public resources and government contracts must be distributed transparently, reasonably, and fairly.',
      hi: 'अनुच्छेद 14 राज्य के मनमानेपन पर रोक लगाता है। सार्वजनिक अनुबंधों और संसाधनों का आवंटन पारदर्शी और निष्पक्ष होना चाहिए।',
    },
  },
  {
    id: 'q-equality-police-complaint',
    conceptId: 'fr-equality',
    difficulty: 1,
    question: {
      en: 'A domestic worker and a wealthy celebrity both visit a police station to file complaints of theft. The duty officer registers the celebrity\'s FIR instantly but turns away the domestic worker. Is this constitutional?',
      hi: 'एक घरेलू सहायिका और एक प्रसिद्ध हस्ती दोनों चोरी की रिपोर्ट लिखाने थाने पहुँचते हैं। अधिकारी हस्ती की प्राथमिकी तुरंत लिखता है पर सहायिका को भगा देता है। क्या यह संवैधानिक है?',
    },
    options: {
      en: [
        'Yes, busy officers may prioritize based on social status',
        'No, Article 14 requires equal protection of the laws for every person',
        'Yes, only taxpayers have the right to register complaints',
        'Police are entirely exempt from constitutional rules',
      ],
      hi: [
        'हाँ, व्यस्त अधिकारी सामाजिक हैसियत देखकर काम कर सकते हैं',
        'नहीं, अनुच्छेद 14 हर व्यक्ति के लिए विधियों के समान संरक्षण की मांग करता है',
        'हाँ, केवल करदाताओं को शिकायत दर्ज कराने का अधिकार है',
        'पुलिस संवैधानिक नियमों से पूरी तरह मुक्त है',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Equality before law ensures that the legal system and police machinery cannot discriminate between rich and poor in offering legal protection.',
      hi: 'विधि के समक्ष समानता यह सुनिश्चित करती है कि कानूनी तंत्र और पुलिस अमीर-गरीब के बीच सुरक्षा देने में कोई भेदभाव न करे।',
    },
  },
  {
    id: 'q-equality-metro-seat',
    conceptId: 'fr-equality',
    difficulty: 2,
    question: {
      en: 'A public metro system reserves specific seats for pregnant women, senior citizens, and persons with disabilities. A young commuter claims this violates equality before the law. How does the Constitution view this?',
      hi: 'मेट्रो ट्रेन में गर्भवती महिलाओं, वरिष्ठ नागरिकों और दिव्यांगों के लिए कुछ सीटें आरक्षित की जाती हैं। एक युवा यात्री इसे समानता का उल्लंघन बताता है। संविधान इसे कैसे देखता है?',
    },
    options: {
      en: [
        'It is a violation because all passengers paid equal fares',
        'It is valid reasonable classification aimed at accommodating genuine physical needs',
        'Only private transport can reserve seats',
        'It is illegal discrimination against youth',
      ],
      hi: [
        'यह उल्लंघन है क्योंकि सभी यात्रियों ने बराबर किराया दिया है',
        'यह वास्तविक शारीरिक आवश्यकताओं को ध्यान में रखकर किया गया उचित वर्गीकरण है जो वैध है',
        'केवल निजी परिवहन ही सीटें आरक्षित कर सकता है',
        'यह युवाओं के साथ गैर-कानूनी भेदभाव है',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Article 14 permits "reasonable classification" to treat people in different physical circumstances with tailored support — true equality accounts for real needs.',
      hi: 'अनुच्छेद 14 विशेष जरूरतों वाले लोगों के लिए "उचित वर्गीकरण" की अनुमति देता है — वास्तविक समानता परिस्थितियों की भिन्नता को स्वीकार करती है।',
    },
  },
  {
    id: 'q-equality-foreign-tourist',
    conceptId: 'fr-equality',
    difficulty: 3,
    question: {
      en: 'A foreign tourist is swindled by a tour operator in Jaipur and approaches a local court. Does the tourist enjoy the protection of Article 14 in India?',
      hi: 'एक विदेशी पर्यटक को जयपुर में टूर ऑपरेटर द्वारा ठगा जाता है और वह स्थानीय अदालत जाता है। क्या भारत में विदेशी पर्यटक को अनुच्छेद 14 का संरक्षण प्राप्त है?',
    },
    options: {
      en: [
        'No, Fundamental Rights protect only Indian passport holders',
        'Yes, Article 14 guarantees equality to "any person" within India\'s territory',
        'Only if the tourist\'s country signs a bilateral treaty',
        'Foreigners have no legal standing in Indian courts',
      ],
      hi: [
        'नहीं, मूल अधिकार केवल भारतीय पासपोर्ट धारकों के लिए हैं',
        'हाँ, अनुच्छेद 14 भारत के राज्यक्षेत्र के भीतर "किसी व्यक्ति" को समानता की गारंटी देता है',
        'केवल यदि पर्यटक के देश ने द्विपक्षीय समझौता किया हो',
        'भारतीय अदालतों में विदेशियों की कोई सुनवाई नहीं होती',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Unlike some rights restricted solely to citizens, Article 14 explicitly protects "any person", extending equality before the law to non-citizens within India.',
      hi: 'कुछ अधिकारों के विपरीत जो केवल नागरिकों के लिए हैं, अनुच्छेद 14 "किसी व्यक्ति" को संरक्षण देता है, जिसमें भारत में मौजूद गैर-नागरिक भी शामिल हैं।',
    },
  },

  // ==========================================
  // TOPIC 3: PROHIBITION OF DISCRIMINATION (conceptId: 'fr-non-discrimination', Article 15)
  // ==========================================
  {
    id: 'q-shop-refusal',
    conceptId: 'fr-non-discrimination',
    difficulty: 2,
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
      en: 'The State cannot discriminate against any citizen on grounds only of religion, race, caste, sex or place of birth under Article 15.',
      hi: 'राज्य अनुच्छेद 15 के तहत किसी नागरिक के विरुद्ध केवल धर्म, मूलवंश, जाति, लिंग या जन्म-स्थान के आधार पर भेदभाव नहीं कर सकता।',
    },
  },
  {
    id: 'q-nondiscrim-public-park',
    conceptId: 'fr-non-discrimination',
    difficulty: 1,
    question: {
      en: 'A public park maintained with municipal taxes puts up a board prohibiting entry to families belonging to a particular state or linguistic group. Does this violate Article 15?',
      hi: 'नगर निगम के करों से बने सार्वजनिक पार्क में एक बोर्ड लगा दिया जाता है कि किसी विशेष राज्य या भाषा समूह के लोग प्रवेश नहीं कर सकते। क्या यह अनुच्छेद 15 का उल्लंघन है?',
    },
    options: {
      en: [
        'Yes, Article 15(2) bars restricting access to public places funded by the State',
        'No, local municipal committees can decide who visits parks',
        'Only commercial parks cannot discriminate',
        'Parks can exclude non-residents freely',
      ],
      hi: [
        'हाँ, अनुच्छेद 15(2) सरकारी धन से पोषित सार्वजनिक स्थानों पर रोक लगाने का निषेध करता है',
        'नहीं, स्थानीय नगरपालिका समिति तय कर सकती है कि पार्क में कौन आए',
        'केवल व्यावसायिक पार्क ही भेदभाव नहीं कर सकते',
        'पार्क बाहरी लोगों को रोकने के लिए स्वतंत्र हैं',
      ],
    },
    correctIndex: 0,
    learnMore: {
      en: 'Article 15(2) explicitly guarantees that no citizen can be barred from public parks, roads, ghats, or wells maintained out of State funds.',
      hi: 'अनुच्छेद 15(2) स्पष्ट गारंटी देता है कि सरकारी कोष से बने पार्कों, सड़कों, घाटों या कुओं से किसी नागरिक को रोका नहीं जा सकता।',
    },
  },
  {
    id: 'q-nondiscrim-girls-scholarship',
    conceptId: 'fr-non-discrimination',
    difficulty: 2,
    question: {
      en: 'A state government launches a special stipend scholarship exclusively for rural girl students to prevent school dropouts. A male student challenges this as unconstitutional sex discrimination. Is his challenge valid?',
      hi: 'राज्य सरकार छात्राओं की पढ़ाई न छूटे इसलिए केवल ग्रामीण बालिकाओं के लिए विशेष छात्रवृत्ति योजना लाती है। एक छात्र इसे लिंग भेदभाव बताकर चुनौती देता है। क्या उसकी चुनौती वैध है?',
    },
    options: {
      en: [
        'Yes, governments cannot introduce gender-specific welfare schemes',
        'No, Article 15(3) empowers the State to make special provisions for women and children',
        'Only the central government can make welfare schemes for women',
        'Scholarships must always be divided 50-50 between genders',
      ],
      hi: [
        'हाँ, सरकारें लिंग-विशिष्ट कल्याणकारी योजनाएं नहीं बना सकतीं',
        'नहीं, अनुच्छेद 15(3) राज्य को महिलाओं और बच्चों के लिए विशेष उपबंध करने का अधिकार देता है',
        'केवल केंद्र सरकार ही महिलाओं के लिए योजना बना सकती है',
        'छात्रवृत्ति हमेशा दोनों लिंगों में 50-50 बंटनी चाहिए',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Article 15(3) is an express exception enabling affirmative action and welfare schemes designed specifically to uplift women and children.',
      hi: 'अनुच्छेद 15(3) एक स्पष्ट प्रावधान है जो महिलाओं और बच्चों के उत्थान के लिए सकारात्मक कदम और विशेष योजनाएँ बनाने की शक्ति देता है।',
    },
  },
  {
    id: 'q-nondiscrim-restaurant-entry',
    conceptId: 'fr-non-discrimination',
    difficulty: 1,
    question: {
      en: 'A privately owned dining restaurant in an urban shopping mall refuses entry to a customer based solely on their ethnic appearance and religion. Can the restaurant legally do this?',
      hi: 'शॉपिंग मॉल का एक निजी भोजनालय किसी ग्राहक को केवल उसके नैन-नक्श और धर्म के आधार पर प्रवेश देने से रोकता है। क्या भोजनालय कानूनी रूप से ऐसा कर सकता है?',
    },
    options: {
      en: [
        'Yes, private business owners have unlimited personal choice',
        'No, Article 15(2)(a) prohibits discrimination in access to public restaurants and shops',
        'Only if the bill exceeds ten thousand rupees',
        'Entry depends entirely on dress codes',
      ],
      hi: [
        'हाँ, निजी व्यापार मालिकों की अपनी मनमर्जी चल सकती है',
        'नहीं, अनुच्छेद 15(2)(क) सार्वजनिक भोजनालयों और दुकानों में प्रवेश पर भेदभाव को रोकता है',
        'केवल यदि बिल दस हजार से अधिक हो',
        'प्रवेश केवल ड्रेस कोड पर निर्भर करता है',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Article 15(2)(a) applies horizontally against private establishments, prohibiting discrimination regarding access to shops, public restaurants, and hotels.',
      hi: 'अनुच्छेद 15(2)(क) निजी प्रतिष्ठानों पर भी लागू होता है और दुकानों, सार्वजनिक भोजनालयों व होटलों में प्रवेश के भेदभाव को प्रतिबंधित करता है।',
    },
  },
  {
    id: 'q-nondiscrim-birthplace-job',
    conceptId: 'fr-non-discrimination',
    difficulty: 2,
    question: {
      en: 'A state government issues an employment notification for civil engineers specifying that candidates born in other Indian states will not be considered. Is this restriction constitutional under Article 15 and 16?',
      hi: 'एक राज्य सरकार सिविल इंजीनियर भर्ती में शर्त रखती है कि दूसरे राज्यों में जन्मे उम्मीदवारों के आवेदन स्वीकार नहीं होंगे। क्या यह प्रतिबंध संवैधानिक है?',
    },
    options: {
      en: [
        'Yes, every state can completely exclude people from other states',
        'No, discriminating against citizens based purely on place of birth is unconstitutional',
        'States can ban outsider employment in all sectors',
        'Only foreign-born citizens are protected',
      ],
      hi: [
        'नहीं, केवल जन्म-स्थान के आधार पर नागरिकों से भेदभाव करना असंवैधानिक है',
        'हाँ, हर राज्य दूसरे राज्यों के लोगों को पूरी तरह बाहर कर सकता है',
        'राज्य सभी क्षेत्रों में बाहरी लोगों के रोजगार पर रोक लगा सकते हैं',
        'केवल विदेश में जन्मे नागरिक ही सुरक्षित हैं',
      ],
    },
    correctIndex: 0,
    learnMore: {
      en: 'Articles 15 and 16 prohibit the State from discriminating against citizens in public employment solely on the grounds of place of birth or descent.',
      hi: 'अनुच्छेद 15 और 16 राज्य को केवल जन्म-स्थान या निवास के आधार पर सार्वजनिक रोजगार में नागरिकों के साथ भेदभाव करने से रोकते हैं।',
    },
  },

  // ==========================================
  // TOPIC 4: ABOLITION OF UNTOUCHABILITY (conceptId: 'fr-abolition-untouchability', Article 17)
  // ==========================================
  {
    id: 'q-tea-stall',
    conceptId: 'fr-abolition-untouchability',
    difficulty: 1,
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
      en: '"Untouchability" is abolished; its practice in any form is forbidden, and enforcing such disability is an offence punishable by law under Article 17.',
      hi: '"अस्पृश्यता" समाप्त है; इसका किसी भी रूप में आचरण वर्जित है, और ऐसी अयोग्यता का प्रवर्तन विधि द्वारा दंडनीय अपराध है।',
    },
  },
  {
    id: 'q-untouch-temple-entry',
    conceptId: 'fr-abolition-untouchability',
    difficulty: 2,
    question: {
      en: 'Village elders prevent members of a scheduled caste community from entering the village temple to offer prayers during a festival. What is the legal standing of this exclusion?',
      hi: 'गाँव के बुजुर्ग उत्सव के दौरान एक अनुसूचित जाति समुदाय के लोगों को गाँव के मंदिर में जाकर पूजा करने से रोकते हैं। इस रोक की कानूनी स्थिति क्या है?',
    },
    options: {
      en: [
        'It is permitted if customary tradition predates independence',
        'It is a cognizable criminal offence under Article 17 and the Protection of Civil Rights Act',
        'It is a purely private matter outside the law',
        'Permissible if approved by a majority vote of the village',
      ],
      hi: [
        'यदि यह पुरानी परंपरा है तो इसे जारी रखा जा सकता है',
        'यह अनुच्छेद 17 और नागरिक अधिकार संरक्षण अधिनियम के तहत दंडनीय संज्ञेय अपराध है',
        'यह कानून से परे एक विशुद्ध निजी मामला है',
        'यदि गाँव का बहुमत सहमति दे तो यह मान्य है',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Article 17 absolutely abolishes untouchability in all forms; preventing entry into public places of worship is a punishable offence by law.',
      hi: 'अनुच्छेद 17 अस्पृश्यता को किसी भी रूप में पूरी तरह समाप्त करता है; सार्वजनिक पूजा स्थलों में प्रवेश रोकना कानूनन दंडनीय अपराध है।',
    },
  },
  {
    id: 'q-untouch-haircut-refusal',
    conceptId: 'fr-abolition-untouchability',
    difficulty: 2,
    question: {
      en: 'A barber in a rural market refuses to cut the hair of a young man because of his Dalit identity, citing fears of community boycott. Can the customer initiate legal action?',
      hi: 'एक ग्रामीण नाई सामाजिक बहिष्कार के डर का हवाला देकर एक दलित युवक के बाल काटने से मना कर देता है। क्या ग्राहक कानूनी कार्रवाई कर सकता है?',
    },
    options: {
      en: [
        'No, barbers can refuse service to anyone at their whim',
        'Yes, enforcing caste disabilities in professional public services is illegal and punishable',
        'Only if the customer pays double the regular charge',
        'Only if the village panchayat agrees to mediate',
      ],
      hi: [
        'नहीं, नाई अपनी मर्जी से किसी को भी सेवा देने से मना कर सकता है',
        'हाँ, सार्वजनिक सेवाओं में जातिगत अयोग्यता थोपना गैर-कानूनी और दंडनीय है',
        'केवल यदि ग्राहक दोगुना शुल्क चुकाए',
        'केवल यदि ग्राम पंचायत मध्यस्थता के लिए सहमत हो',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Denying ordinary public occupational services like barbering, laundry, or tailoring on the basis of caste enforces untouchability and is punishable by imprisonment.',
      hi: 'जाति के आधार पर बाल काटने, कपड़े धोने या सिलाई जैसी सार्वजनिक सेवाओं से मना करना अस्पृश्यता का आचरण है और कारावास से दंडनीय है।',
    },
  },
  {
    id: 'q-untouch-midday-meal',
    conceptId: 'fr-abolition-untouchability',
    difficulty: 1,
    question: {
      en: 'In a primary school, some parents demand that children of marginalized communities sit in a separate line during the midday meal. How should the school authority respond under the Constitution?',
      hi: 'एक प्राथमिक विद्यालय में कुछ अभिभावक मांग करते हैं कि मध्याह्न भोजन में वंचित समुदायों के बच्चे अलग पंक्ति में बैठें। स्कूल प्रशासन को क्या करना चाहिए?',
    },
    options: {
      en: [
        'Agree to avoid conflict with influential parents',
        'Strictly reject separation, as enforcing caste segregation in schools violates Article 17 and equality',
        'Ask children to eat at home instead',
        'Separate children by their roll numbers instead',
      ],
      hi: [
        'प्रभावशाली अभिभावकों से विवाद से बचने के लिए मान लें',
        'अलगाव को सख्ती से खारिज करें, क्योंकि स्कूलों में जातिगत भेदभाव अनुच्छेद 17 और समानता का उल्लंघन है',
        'बच्चों से कहें कि वे घर जाकर खाना खाएं',
        'बच्चों को रोल नंबर के अनुसार अलग बैठाएं',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Enforcing caste segregation in school dining or seating is a violation of Article 17 and constitutional dignity.',
      hi: 'स्कूल में भोजन या बैठने में जातिगत भेदभाव लागू करना अनुच्छेद 17 और मानवीय गरिमा का सीधा उल्लंघन है।',
    },
  },
  {
    id: 'q-untouch-burial-denial',
    conceptId: 'fr-abolition-untouchability',
    difficulty: 3,
    question: {
      en: 'A bereaved family is blocked by local dominant groups from carrying their deceased relative\'s funeral procession along the main public village road to the cremation ground. This action violates:',
      hi: 'एक शोकाकुल परिवार को गाँव के दबंग मुख्य सार्वजनिक रास्ते से होकर श्मशान तक शव यात्रा ले जाने से रोकते हैं। यह कृत्य किसका उल्लंघन करता है?',
    },
    options: {
      en: [
        'Local village traffic traditions',
        'Article 17 and the Right to Dignity, constituting a punishable offence',
        'Only property boundary rules',
        'No legal violation has occurred',
      ],
      hi: [
        'गाँव के स्थानीय यातायात नियमों का',
        'अनुच्छेद 17 और गरिमा के अधिकार का, जो एक दंडनीय अपराध है',
        'केवल संपत्ति सीमा नियमों का',
        'कोई कानूनी उल्लंघन नहीं हुआ है',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Blocking funeral processions or denying access to public burial and cremation grounds based on caste is a severe violation of Article 17 and civil rights statutes.',
      hi: 'जाति के आधार पर शवयात्रा रोकना या श्मशान-कब्रिस्तान तक पहुँच बाधित करना अनुच्छेद 17 और नागरिक अधिकार कानूनों का गंभीर उल्लंघन है।',
    },
  },

  // ==========================================
  // TOPIC 5: FREEDOM OF SPEECH & EXPRESSION (conceptId: 'fr-freedom-of-speech', Article 19(1)(a) & 19(2))
  // ==========================================
  {
    id: 'q-express-opinion',
    conceptId: 'fr-freedom-of-speech',
    difficulty: 2,
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
    id: 'q-speech-press-investigation',
    conceptId: 'fr-freedom-of-speech',
    difficulty: 2,
    question: {
      en: 'A newspaper publishes an investigative report detailing corruption in municipal road repairs. The municipality threatens to shut down the press unless they issue an apology. Is the newspaper protected?',
      hi: 'एक समाचार पत्र सड़क मरम्मत में हुए भ्रष्टाचार पर खोजी रिपोर्ट छापता है। नगर निगम माफी न मांगने पर प्रेस बंद करने की धमकी देता है। क्या अखबार को संरक्षण प्राप्त है?',
    },
    options: {
      en: [
        'No, newspapers can never criticize government authorities',
        'Yes, freedom of speech and expression includes freedom of the press and investigative reporting',
        'Only television news channels are protected, not print newspapers',
        'Protection applies only during official election periods',
      ],
      hi: [
        'नहीं, अखबार सरकारी तंत्र की आलोचना कभी नहीं कर सकते',
        'हाँ, वाक् और अभिव्यक्ति की स्वतंत्रता में प्रेस की आज़ादी और खोजी रिपोर्टिंग शामिल है',
        'केवल टीवी चैनलों को संरक्षण है, समाचार पत्रों को नहीं',
        'संरक्षण केवल चुनाव के समय ही लागू होता है',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Freedom of speech under Article 19(1)(a) encompasses freedom of the press. Honest criticism of public administration cannot be gagged arbitrarily.',
      hi: 'अनुच्छेद 19(1)(क) के तहत अभिव्यक्ति की स्वतंत्रता में प्रेस की स्वतंत्रता भी शामिल है। जनहित में निष्पक्ष रिपोर्टिंग को मनमाने ढंग से नहीं दबाया जा सकता।',
    },
  },
  {
    id: 'q-speech-riot-incitement',
    conceptId: 'fr-freedom-of-speech',
    difficulty: 1,
    question: {
      en: 'A social media user posts inflammatory messages falsely claiming a rival group is planning an assault, urging followers to take up weapons and attack their homes. Can this speech be restricted?',
      hi: 'एक सोशल मीडिया यूजर भड़काऊ पोस्ट डालकर झूठा दावा करता है कि विरोधी समूह हमला करने वाला है, और लोगों से हथियार उठाकर हमले का आह्वान करता है। क्या इस पर रोक लगाई जा सकती है?',
    },
    options: {
      en: [
        'No, freedom of speech is absolute with zero restrictions',
        'Yes, speech inciting violence and threatening public order can be reasonably restricted under Article 19(2)',
        'Only speeches spoken on a microphone can be restricted, not social media text',
        'Social media is beyond the reach of Indian law',
      ],
      hi: [
        'नहीं, अभिव्यक्ति की आज़ादी बिना किसी पाबंदी के असीमित है',
        'हाँ, हिंसा भड़काने और लोक-व्यवस्था बिगाड़ने वाले भाषणों पर अनुच्छेद 19(2) के तहत उचित प्रतिबंध लगाया जा सकता है',
        'केवल माइक पर दिए भाषण रोके जा सकते हैं, सोशल मीडिया पोस्ट नहीं',
        'सोशल मीडिया भारतीय कानून के दायरे से बाहर है',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Article 19(2) allows the State to impose reasonable restrictions on free speech in the interests of public order, decency, morality, and prevention of incitement to an offence.',
      hi: 'अनुच्छेद 19(2) लोक-व्यवस्था, शालीनता, नैतिकता और अपराध के उकसावे को रोकने के लिए वाक् स्वतंत्रता पर युक्तियुक्त निर्बंधन लगाने की अनुमति देता है।',
    },
  },
  {
    id: 'q-speech-political-satire',
    conceptId: 'fr-freedom-of-speech',
    difficulty: 2,
    question: {
      en: 'A stand-up comic performs a satirical sketch highlighting delays in government red tape. Some officials feel offended and demand a police arrest. Does peaceful political satire qualify as free speech?',
      hi: 'एक हास्य कलाकार सरकारी कामकाज की लालफीताशाही पर व्यंग्य करता है। कुछ अधिकारी आहत होकर उसकी गिरफ्तारी की मांग करते हैं। क्या शांतिपूर्ण राजनीतिक व्यंग्य वाक् स्वतंत्रता का हिस्सा है?',
    },
    options: {
      en: [
        'No, humor against public institutions is completely forbidden',
        'Yes, satire, humor, and artistic commentary are protected forms of expression',
        'Only politicians are allowed to use humor',
        'Artists must obtain police clearance before writing jokes',
      ],
      hi: [
        'नहीं, सार्वजनिक संस्थाओं पर हास्य पूरी तरह प्रतिबंधित है',
        'हाँ, व्यंग्य, हास्य और कलात्मक टिप्पणी अभिव्यक्ति के संरक्षित रूप हैं',
        'केवल राजनेताओं को हास्य की अनुमति है',
        'कलाकारों को चुटकुले लिखने से पहले पुलिस अनुमति लेनी चाहिए',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Artistic expression, humour, and peaceful political satire are essential components of free expression in a vibrant constitutional democracy.',
      hi: 'कलात्मक अभिव्यक्ति, हास्य और शांतिपूर्ण व्यंग्य जीवंत संवैधानिक लोकतंत्र में वाक् स्वतंत्रता के अनिवार्य अंग हैं।',
    },
  },
  {
    id: 'q-speech-right-to-silence',
    conceptId: 'fr-freedom-of-speech',
    difficulty: 3,
    question: {
      en: 'School children respectfully stand during the playing of the National Anthem but do not sing the words due to their bona fide religious beliefs. Did the Supreme Court uphold their right in the Bijoe Emmanuel case?',
      hi: 'स्कूली बच्चे राष्ट्रगान के समय सम्मानपूर्वक खड़े रहते हैं लेकिन अपनी धार्मिक मान्यताओं के कारण शब्द नहीं गाते। क्या उच्चतम न्यायालय ने बिजो इमैनुएल मामले में उनके अधिकार को बरकरार रखा?',
    },
    options: {
      en: [
        'No, silence during the anthem was declared an act of treason',
        'Yes, freedom of expression includes the right to remain respectfully silent without showing disrespect',
        'Students have no constitutional protections in schools',
        'Only teachers have the right to remain silent',
      ],
      hi: [
        'नहीं, राष्ट्रगान के समय चुप रहने को देशद्रोह माना गया',
        'हाँ, अभिव्यक्ति की स्वतंत्रता में अनादर किए बिना आदरपूर्वक चुप रहने का अधिकार शामिल है',
        'स्कूलों में छात्रों को कोई संवैधानिक अधिकार नहीं होते',
        'केवल शिक्षकों को चुप रहने का अधिकार है',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'In the landmark Bijoe Emmanuel ruling (1986), the Supreme Court held that Article 19(1)(a) protects respectful silence when no disrespect is shown.',
      hi: 'ऐतिहासिक बिजो इमैनुएल फैसले (1986) में उच्चतम न्यायालय ने माना कि यदि कोई अनादर न हो, तो आदरपूर्वक मौन रहना भी अभिव्यक्ति की स्वतंत्रता के अंतर्गत संरक्षित है।',
    },
  },

  // ==========================================
  // TOPIC 6: PEACEFUL ASSEMBLY & ASSOCIATION (conceptId: 'fr-freedom-of-assembly', Article 19(1)(b) & (c))
  // ==========================================
  {
    id: 'q-peaceful-meeting',
    conceptId: 'fr-freedom-of-assembly',
    difficulty: 2,
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
    id: 'q-assembly-armed-procession',
    conceptId: 'fr-freedom-of-assembly',
    difficulty: 1,
    question: {
      en: 'A group plans a march through a crowded marketplace carrying live firearms and explosive crackers. When police prohibit the march, the organizers cite freedom of assembly. Is the prohibition lawful?',
      hi: 'एक समूह भीड़भाड़ वाले बाजार में बंदूकें और विस्फोटक पटाखे लेकर जुलूस निकालने की योजना बनाता है। पुलिस द्वारा रोकने पर वे सभा की स्वतंत्रता का हवाला देते हैं। क्या पुलिस की रोक वैध है?',
    },
    options: {
      en: [
        'Unlawful, because citizens can carry any weapons during assemblies',
        'Lawful, because Article 19(1)(b) protects assembly only "peaceably and without arms"',
        'Assemblies are above police regulation entirely',
        'Only indoor meetings require safety checks',
      ],
      hi: [
        'अवैध, क्योंकि नागरिक सभा में कोई भी हथियार ले जा सकते हैं',
        'वैध, क्योंकि अनुच्छेद 19(1)(ख) केवल "शांतिपूर्वक और बिना हथियारों के" सम्मेलन की अनुमति देता है',
        'सभाएं पुलिस नियमन से पूरी तरह परे हैं',
        'केवल इनडोर बैठकों में सुरक्षा जांच की आवश्यकता होती है',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Article 19(1)(b) specifically conditions the freedom of assembly on being peaceful and unarmed; carrying dangerous weapons is not protected.',
      hi: 'अनुच्छेद 19(1)(ख) सभा की स्वतंत्रता को शांतिपूर्ण और बिना हथियारों के होने की शर्त पर ही मान्यता देता है; हथियार ले जाना संरक्षित नहीं है।',
    },
  },
  {
    id: 'q-assembly-workers-union',
    conceptId: 'fr-freedom-of-assembly',
    difficulty: 2,
    question: {
      en: 'A textile factory management fires five workers for attempting to register a recognized labour union to discuss safety gears. What fundamental right protects the workers\' right to form a union?',
      hi: 'कपड़ा मिल प्रबंधन सुरक्षा उपकरणों पर बात करने के लिए मजदूर संघ बनाने की कोशिश करने वाले 5 मजदूरों को निकाल देता है। संघ बनाने के अधिकार की रक्षा कौन-सा मूल अधिकार करता है?',
    },
    options: {
      en: [
        'Right to form associations or unions under Article 19(1)(c)',
        'Freedom of interstate trade',
        'Right to administrative discretion',
        'Right to property',
      ],
      hi: [
        'अनुच्छेद 19(1)(ग) के तहत संघ या संगठन बनाने का अधिकार',
        'अंतरराज्यीय व्यापार की स्वतंत्रता',
        'प्रशासनिक विवेकाधिकार',
        'संपत्ति का अधिकार',
      ],
    },
    correctIndex: 0,
    learnMore: {
      en: 'Article 19(1)(c) guarantees all citizens the right to form associations, unions, and cooperative societies to protect their legitimate shared interests.',
      hi: 'अनुच्छेद 19(1)(ग) सभी नागरिकों को अपने वैध साझा हितों की रक्षा के लिए संघ, संगठन या सहकारी समितियाँ बनाने की गारंटी देता है।',
    },
  },
  {
    id: 'q-assembly-peaceful-dharna',
    conceptId: 'fr-freedom-of-assembly',
    difficulty: 2,
    question: {
      en: 'Farmers stage a quiet, non-violent sit-in on a designated demonstration ground demanding fair crop insurance settlements. Can the district administration break up the gathering without any threat to public safety?',
      hi: 'किसान फसल बीमा के उचित मुआवजे की मांग को लेकर निर्धारित धरना स्थल पर शांतिपूर्ण अनशन करते हैं। क्या प्रशासन बिना किसी सुरक्षा खतरे के धरने को बलपूर्वक हटा सकता है?',
    },
    options: {
      en: [
        'Yes, peaceful protests are never allowed under Indian law',
        'No, the right to peaceful protest without weapons is a cornerstone of democracy',
        'Only registered political parties can hold dharnas',
        'Protests are permitted only between midnight and dawn',
      ],
      hi: [
        'नहीं, बिना हथियारों के शांतिपूर्ण विरोध प्रदर्शन लोकतंत्र का आधारस्तंभ है',
        'हाँ, भारतीय कानून में शांतिपूर्ण धरने की कभी अनुमति नहीं है',
        'केवल पंजीकृत राजनीतिक दल ही धरना दे सकते हैं',
        'धरने की अनुमति केवल आधी रात से भोर के बीच होती है',
      ],
    },
    correctIndex: 0,
    learnMore: {
      en: 'The Supreme Court has recognized that peaceful protest is an integral part of democratic expression and assembly under Articles 19(1)(a) and 19(1)(b).',
      hi: 'उच्चतम न्यायालय ने माना है कि शांतिपूर्ण विरोध प्रदर्शन लोकतंत्र में अभिव्यक्ति और सभा की स्वतंत्रता का अभिन्न हिस्सा है।',
    },
  },
  {
    id: 'q-assembly-rwa-society',
    conceptId: 'fr-freedom-of-assembly',
    difficulty: 1,
    question: {
      en: 'Apartment residents come together to form a cooperative housing society and file for registration. The local registrar sits on the file for months without valid objection. What constitutional freedom protects their initiative?',
      hi: 'फ्लैट निवासी मिलकर एक सहकारी आवासीय समिति बनाते हैं और पंजीकरण के लिए आवेदन करते हैं। निबंधक बिना कारण महीनों फाइल अटकाए रखता है। उनकी इस पहल को कौन-सी संवैधानिक स्वतंत्रता बचाती है?',
    },
    options: {
      en: [
        'Freedom of religion',
        'Right to form cooperative societies under Article 19(1)(c)',
        'Right against exploitation',
        'Freedom of movement',
      ],
      hi: [
        'धर्म की स्वतंत्रता',
        'अनुच्छेद 19(1)(ग) के तहत सहकारी समितियाँ बनाने का अधिकार',
        'शोषण के विरुद्ध अधिकार',
        'आवागमन की स्वतंत्रता',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'The 97th Constitutional Amendment expressly added "co-operative societies" to Article 19(1)(c), securing citizens\' freedom to organize collectively.',
      hi: '97वें संविधान संशोधन ने अनुच्छेद 19(1)(ग) में "सहकारी समितियाँ" शब्द जोड़कर नागरिकों को सामूहिक संगठन की संवैधानिक गारंटी दी।',
    },
  },

  // ==========================================
  // TOPIC 7: RIGHT TO LIFE & LIBERTY (conceptId: 'fr-life-liberty', Article 21)
  // ==========================================
  {
    id: 'q-detention',
    conceptId: 'fr-life-liberty',
    difficulty: 3,
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
      en: 'No person can be deprived of life or personal liberty except by fair procedure established by law under Article 21.',
      hi: 'किसी व्यक्ति को विधि द्वारा स्थापित निष्पक्ष प्रक्रिया के अतिरिक्त जीवन या व्यक्तिगत स्वतंत्रता से वंचित नहीं किया जा सकता।',
    },
  },
  {
    id: 'q-life-clean-water-pollution',
    conceptId: 'fr-life-liberty',
    difficulty: 2,
    question: {
      en: 'An industrial dye unit dumps untreated toxic chemicals into the municipal canal supplying drinking water to 50,000 residents. Which fundamental right under Article 21 is infringed?',
      hi: 'एक डाई फैक्ट्री 50,000 नागरिकों को पीने का पानी देने वाली नहर में जहरीला रसायन बहाती है। अनुच्छेद 21 के तहत किस मूल अधिकार का हनन हुआ है?',
    },
    options: {
      en: [
        'Right to property',
        'Right to Life, which includes clean water and a healthy environment',
        'Right to interstate commerce',
        'Freedom of contract',
      ],
      hi: [
        'संपत्ति का अधिकार',
        'जीवन का अधिकार, जिसमें स्वच्छ जल और प्रदूषण मुक्त पर्यावरण शामिल है',
        'अंतरराज्यीय व्यापार का अधिकार',
        'अनुबंध की स्वतंत्रता',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'The Supreme Court has expanded Article 21 beyond mere animal existence to include the right to clean drinking water, unpolluted air, and ecological balance.',
      hi: 'उच्चतम न्यायालय ने अनुच्छेद 21 का विस्तार करते हुए स्वच्छ पेयजल, प्रदूषण मुक्त वायु और स्वस्थ पर्यावरण को जीवन के अधिकार का अनिवार्य अंग माना है।',
    },
  },
  {
    id: 'q-life-privacy-phone-tap',
    conceptId: 'fr-life-liberty',
    difficulty: 2,
    question: {
      en: 'A surveillance agency secretly taps a citizen\'s phone and reads personal messages without any judicial order or statutory authorization. Which fundamental right does this unauthorized surveillance violate?',
      hi: 'एक निगरानी एजेंसी बिना किसी कानूनी प्रावधान या न्यायिक आदेश के एक नागरिक का फोन टैप और निजी संदेश पढ़ती है। यह अनधिकृत निगरानी किस मूल अधिकार का उल्लंघन करती है?',
    },
    options: {
      en: [
        'Right to free movement',
        'Right to Privacy as a fundamental facet of Article 21',
        'Right to public employment',
        'Right against double jeopardy',
      ],
      hi: [
        'स्वतंत्र आवागमन का अधिकार',
        'अनुच्छेद 21 के अंतर्गत निजता का मूल अधिकार',
        'सार्वजनिक रोजगार का अधिकार',
        'दोहरे दंड से संरक्षण',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'In the historic K.S. Puttaswamy judgment (2017), a 9-judge bench ruled that the Right to Privacy is an intrinsic part of the Right to Life and Personal Liberty under Article 21.',
      hi: 'ऐतिहासिक पुट्टास्वामी फैसले (2017) में 9 जजों की पीठ ने फैसला दिया कि निजता का अधिकार अनुच्छेद 21 के तहत जीवन और व्यक्तिगत स्वतंत्रता का अभिन्न अंग है।',
    },
  },
  {
    id: 'q-life-speedy-trial-undertrial',
    conceptId: 'fr-life-liberty',
    difficulty: 3,
    question: {
      en: 'A poor accused person spends six years in prison awaiting trial for an alleged petty theft that carries a maximum penalty of only one year. Which constitutional right is being compromised?',
      hi: 'एक निर्धन अभियुक्त एक साल की अधिकतम सजा वाले छोटे आरोप में मुकदमा शुरू हुए बिना छह साल से जेल में बंद है। किस संवैधानिक अधिकार का हनन हो रहा है?',
    },
    options: {
      en: [
        'Right to Speedy Trial as part of fair procedure under Article 21',
        'Freedom to carry out business',
        'Right to form unions',
        'Right to state honours',
      ],
      hi: [
        'अनुच्छेद 21 के तहत निष्पक्ष प्रक्रिया के अंग के रूप में त्वरित सुनवाई का अधिकार',
        'व्यापार करने की स्वतंत्रता',
        'संघ बनाने का अधिकार',
        'राजकीय सम्मान का अधिकार',
      ],
    },
    correctIndex: 0,
    learnMore: {
      en: 'The Supreme Court in Hussainara Khatoon established that the right to a speedy trial is a fundamental right implicit in the fair procedure guarantee of Article 21.',
      hi: 'हुसैनआरा खातून मामले में उच्चतम न्यायालय ने स्थापित किया कि त्वरित न्याय पाना अनुच्छेद 21 की निष्पक्ष प्रक्रिया में निहित मूल अधिकार है।',
    },
  },
  {
    id: 'q-life-magistrate-production',
    conceptId: 'fr-life-liberty',
    difficulty: 2,
    question: {
      en: 'A suspect is arrested by police on Friday evening. Under Article 22 and Article 21 safeguards, within how many hours must the police produce the arrestee before the nearest magistrate?',
      hi: 'पुलिस शुक्रवार शाम एक संदिग्ध को गिरफ्तार करती है। अनुच्छेद 22 और 21 के तहत पुलिस को कितने घंटे के भीतर निकटतम मजिस्ट्रेट के समक्ष पेश करना अनिवार्य है?',
    },
    options: {
      en: [
        'Within 24 hours (excluding necessary travel time)',
        'Whenever the police complete their investigation weeks later',
        'Only on the next working Monday morning',
        'Within 7 working days',
      ],
      hi: [
        '24 घंटे के भीतर (यात्रा के आवश्यक समय को छोड़कर)',
        'हफ्तों बाद जब पुलिस की जांच पूरी हो जाए',
        'केवल अगले कार्यदिवस सोमवार सुबह',
        '7 कार्यदिवसों के भीतर',
      ],
    },
    correctIndex: 0,
    learnMore: {
      en: 'Article 22(2) makes it mandatory that an arrested person be produced before the nearest magistrate within 24 hours, ensuring judicial oversight over executive custody.',
      hi: 'अनुच्छेद 22(2) अनिवार्य करता है कि गिरफ्तार व्यक्ति को 24 घंटे के भीतर मजिस्ट्रेट के सामने पेश किया जाए, ताकि अवैध हिरासत रोकी जा सके।',
    },
  },

  // ==========================================
  // TOPIC 8: RIGHT TO EDUCATION (conceptId: 'fr-education', Article 21A)
  // ==========================================
  {
    id: 'q-school-fees',
    conceptId: 'fr-education',
    difficulty: 1,
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
      en: 'The State shall provide free and compulsory education to all children aged six to fourteen years under Article 21A.',
      hi: 'राज्य छह से चौदह वर्ष तक की आयु के सभी बच्चों को निःशुल्क और अनिवार्य शिक्षा उपलब्ध कराएगा।',
    },
  },
  {
    id: 'q-edu-private-school-ews',
    conceptId: 'fr-education',
    difficulty: 2,
    question: {
      en: 'An elite private unaided school refuses to admit any children under the 25% Economically Weaker Section (EWS) quota, claiming it is only for government schools. What does the law under Article 21A state?',
      hi: 'एक निजी स्कूल 25% EWS कोटे के तहत बच्चों को दाखिला देने से मना करता है, यह कहते हुए कि यह नियम सिर्फ सरकारी स्कूलों के लिए है। अनुच्छेद 21क के तहत कानून क्या कहता है?',
    },
    options: {
      en: [
        'Private schools are completely exempt from educational quotas',
        'Private unaided schools must reserve at least 25% entry-level seats for disadvantaged and EWS children',
        'Schools can charge full fees from EWS children as a loan',
        'EWS children can only study in home schooling',
      ],
      hi: [
        'निजी स्कूल शिक्षा कोटे से पूरी तरह मुक्त हैं',
        'निजी गैर-सहायता प्राप्त स्कूलों को शुरुआती कक्षा में कम से कम 25% सीटें वंचित और EWS बच्चों के लिए आरक्षित करनी होंगी',
        'स्कूल EWS बच्चों से कर्ज के रूप में पूरी फीस ले सकते हैं',
        'EWS बच्चे केवल होम-स्कूलिंग में पढ़ सकते हैं',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Section 12(1)(c) of the Right of Children to Free and Compulsory Education Act (enacted under Article 21A) mandates a 25% quota in private unaided schools for weaker sections.',
      hi: 'अनुच्छेद 21क के अंतर्गत बने शिक्षा के अधिकार कानून की धारा 12(1)(ग) के तहत निजी स्कूलों में 25% सीटें कमजोर और वंचित वर्ग के बच्चों के लिए अनिवार्य हैं।',
    },
  },
  {
    id: 'q-edu-no-screening-interviews',
    conceptId: 'fr-education',
    difficulty: 2,
    question: {
      en: 'A school interviews parents and subjects a 5-year-old child to a screening test, rejecting admission because the parents are illiterate. Is this screening test allowed under the RTE framework?',
      hi: 'एक स्कूल 5 वर्षीय बच्चे का टेस्ट लेता है और अनपढ़ होने के आधार पर माता-पिता का साक्षात्कार लेकर दाखिला खारिज कर देता है। क्या आरटीई में ऐसा स्क्रीनिंग टेस्ट मान्य है?',
    },
    options: {
      en: [
        'Yes, schools have the right to test parents and children before admission',
        'No, the RTE Act strictly prohibits screening procedures and capitation fees for elementary admissions',
        'Screening is mandatory for all students',
        'Tests are prohibited only for boys',
      ],
      hi: [
        'नहीं, आरटीई कानून प्राथमिक दाखिले के लिए स्क्रीनिंग प्रक्रिया और कैपिटेशन फीस को सख्ती से रोकता है',
        'हाँ, स्कूलों को दाखिले से पहले बच्चों और अभिभावकों का टेस्ट लेने का पूरा हक है',
        'स्क्रीनिंग सभी छात्रों के लिए अनिवार्य है',
        'टेस्ट केवल लड़कों के लिए प्रतिबंधित है',
      ],
    },
    correctIndex: 0,
    learnMore: {
      en: 'The RTE Act prohibits any screening procedure for admission to elementary school; children cannot be turned away because of their parents\' educational background.',
      hi: 'आरटीई कानून प्राथमिक दाखिले में किसी भी तरह के स्क्रीनिंग टेस्ट या इंटरव्यू को प्रतिबंधित करता है; माता-पिता की पृष्ठभूमि के कारण बच्चे को नहीं रोका जा सकता।',
    },
  },
  {
    id: 'q-edu-child-labour-schooling',
    conceptId: 'fr-education',
    difficulty: 1,
    question: {
      en: 'A 10-year-old girl is found working full-time at a brick kiln rather than attending school. Under Article 21A and child protection laws, what duty does the State have towards her?',
      hi: 'ईंट भट्ठे पर 10 साल की बच्ची काम करती पाई जाती है। अनुच्छेद 21क और बाल संरक्षण कानूनों के तहत राज्य का उसके प्रति क्या दायित्व है?',
    },
    options: {
      en: [
        'Let her work if her family needs the income',
        'Ensure she is rescued and enrolled in a neighbourhood school with free elementary education',
        'Fining the child for skipping school',
        'Offering her evening classes only if she pays tuition',
      ],
      hi: [
        'यदि परिवार को आमदनी चाहिए तो उसे काम करने दिया जाए',
        'उसे काम से मुक्त कराकर नजदीकी स्कूल में निःशुल्क प्राथमिक शिक्षा में दाखिला दिलाना',
        'स्कूल न जाने के लिए बच्ची पर जुर्माना लगाना',
        'केवल ट्यूशन फीस देने पर ही शाम की कक्षाएं उपलब्ध कराना',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Article 21A makes education a compulsory obligation of the State for every child between 6 and 14 years, reinforced by child labour prohibition laws.',
      hi: 'अनुच्छेद 21क 6 से 14 वर्ष के प्रत्येक बच्चे के लिए शिक्षा को राज्य का अनिवार्य दायित्व बनाता है, जिसे बाल श्रम निषेध कानून का भी समर्थन प्राप्त है।',
    },
  },
  {
    id: 'q-edu-age-bracket',
    conceptId: 'fr-education',
    difficulty: 1,
    question: {
      en: 'Which age group of children is guaranteed the Fundamental Right to free and compulsory education under Article 21A of the Indian Constitution?',
      hi: 'भारतीय संविधान के अनुच्छेद 21क के तहत किस आयु वर्ग के बच्चों को निःशुल्क और अनिवार्य शिक्षा का मूल अधिकार प्राप्त है?',
    },
    options: {
      en: [
        'Birth to 5 years',
        '6 to 14 years',
        '15 to 18 years only',
        'College and university students only',
      ],
      hi: [
        'जन्म से 5 वर्ष तक',
        '6 से 14 वर्ष तक',
        'केवल 15 से 18 वर्ष',
        'केवल कॉलेज और विश्वविद्यालय के छात्र',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'The 86th Constitutional Amendment inserted Article 21A, making free and compulsory education a fundamental right for children between 6 and 14 years.',
      hi: '86वें संविधान संशोधन द्वारा अनुच्छेद 21क जोड़ा गया, जिसने 6 से 14 वर्ष की आयु के बच्चों के लिए निःशुल्क और अनिवार्य शिक्षा को मूल अधिकार बनाया।',
    },
  },

  // ==========================================
  // TOPIC 9: CONSTITUTIONAL REMEDIES & WRITS (conceptId: 'fr-remedies', Article 32 & 226)
  // ==========================================
  {
    id: 'q-rights-violated',
    conceptId: 'fr-remedies',
    difficulty: 3,
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
    id: 'q-remedies-habeas-corpus',
    conceptId: 'fr-remedies',
    difficulty: 2,
    question: {
      en: 'A civilian is secretly detained by local authorities without any arrest record, FIR, or magistrate hearing. Which constitutional writ should their family file to secure their release?',
      hi: 'एक नागरिक को बिना किसी रिकॉर्ड, एफआईआर या अदालती पेशी के गुप्त रूप से हिरासत में रखा गया है। परिवार को उसकी रिहाई के लिए कौन-सी संवैधानिक रिट दायर करनी चाहिए?',
    },
    options: {
      en: [
        'Writ of Quo Warranto',
        'Writ of Habeas Corpus ("To have the body")',
        'Writ of Certiorari',
        'Writ of Injunction only',
      ],
      hi: [
        'अधिकार-पृच्छा (Quo Warranto)',
        'बंदी प्रत्यक्षीकरण (Habeas Corpus)',
        'उत्प्रेषण (Certiorari)',
        'केवल निषेधाज्ञा',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Habeas Corpus is a vital writ that orders the detaining authority to produce the prisoner before the court and justify the legal grounds of detention.',
      hi: 'बंदी प्रत्यक्षीकरण (Habeas Corpus) हिरासत में रखने वाले प्राधिकारी को कैदी को अदालत के सामने पेश करने और गिरफ्तारी का कानूनी आधार साबित करने का आदेश देती है।',
    },
  },
  {
    id: 'q-remedies-mandamus',
    conceptId: 'fr-remedies',
    difficulty: 2,
    question: {
      en: 'A public water board arbitrarily refuses to supply water connections to an authorized residential colony despite all fees being deposited. Which writ compels public officials to perform their legal duty?',
      hi: 'सभी शुल्क जमा होने के बावजूद जल बोर्ड एक वैध कॉलोनी को पानी का कनेक्शन देने से मना कर देता है। कौन-सी रिट सरकारी अधिकारियों को उनका विधिक कर्तव्य पूरा करने का आदेश देती है?',
    },
    options: {
      en: [
        'Mandamus ("We command")',
        'Habeas Corpus',
        'Quo Warranto',
        'Private contract lawsuit only',
      ],
      hi: [
        'परमादेश (Mandamus)',
        'बंदी प्रत्यक्षीकरण',
        'अधिकार-पृच्छा',
        'केवल निजी अनुबंध मुकदमा',
      ],
    },
    correctIndex: 0,
    learnMore: {
      en: 'A writ of Mandamus is issued by the Supreme Court or High Court to compel a public official, body, or tribunal to perform an obligatory public duty.',
      hi: 'परमादेश (Mandamus) उच्च न्यायालय या उच्चतम न्यायालय द्वारा किसी सार्वजनिक अधिकारी या संस्था को उसके अनिवार्य कानूनी दायित्व का पालन करने का आदेश देने के लिए जारी किया जाता है।',
    },
  },
  {
    id: 'q-remedies-quo-warranto',
    conceptId: 'fr-remedies',
    difficulty: 3,
    question: {
      en: 'A person who does not meet the statutory qualifications of age or legal training is unlawfully appointed to head a state statutory commission. Which writ challenges their title to that public office?',
      hi: 'न्यूनतम कानूनी योग्यता या अनुभव न रखने वाले व्यक्ति को राज्य आयोग का अध्यक्ष नियुक्त कर दिया जाता है। किस रिट द्वारा उस पद पर उसके अधिकार को चुनौती दी जा सकती है?',
    },
    options: {
      en: [
        'Habeas Corpus',
        'Quo Warranto ("By what authority")',
        'Writ of search and seizure',
        'Police summons',
      ],
      hi: [
        'बंदी प्रत्यक्षीकरण',
        'अधिकार-पृच्छा (Quo Warranto)',
        'तलाशी और जब्ती की रिट',
        'पुलिस समन',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Quo Warranto inquires into the legality of the claim which a party asserts to a public office and ousts them if they are not legally qualified.',
      hi: 'अधिकार-पृच्छा (Quo Warranto) यह जांच करती है कि कोई व्यक्ति किस अधिकार से किसी सार्वजनिक पद पर बैठा है और अयोग्य पाए जाने पर उसे पद से हटाती है।',
    },
  },
  {
    id: 'q-remedies-high-court-226',
    conceptId: 'fr-remedies',
    difficulty: 3,
    question: {
      en: 'While Article 32 allows citizens to approach the Supreme Court strictly for Fundamental Rights violations, under which Article can citizens approach High Courts for both Fundamental Rights and other statutory legal rights?',
      hi: 'अनुच्छेद 32 केवल मूल अधिकारों के उल्लंघन पर उच्चतम न्यायालय जाने की अनुमति देता है, लेकिन किस अनुच्छेद के तहत नागरिक मूल अधिकारों और अन्य विधिक अधिकारों के लिए उच्च न्यायालय जा सकते हैं?',
    },
    options: {
      en: [
        'Article 51',
        'Article 226',
        'Article 356',
        'Article 1',
      ],
      hi: [
        'अनुच्छेद 51',
        'अनुच्छेद 226',
        'अनुच्छेद 356',
        'अनुच्छेद 1',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Article 226 empowers High Courts to issue writs not only for Fundamental Rights but also for "any other purpose" (enforcement of legal and statutory rights).',
      hi: 'अनुच्छेद 226 उच्च न्यायालयों को मूल अधिकारों के साथ-साथ "किसी अन्य प्रयोजन" (कानूनी और वैधानिक अधिकारों के प्रवर्तन) के लिए भी रिट जारी करने की व्यापक शक्ति देता है।',
    },
  },

  // ==========================================
  // TOPIC 10: FUNDAMENTAL DUTIES (conceptId: 'fd-scientific-tempor', Article 51A)
  // ==========================================
  {
    id: 'q-viral-rumour',
    conceptId: 'fd-scientific-tempor',
    difficulty: 1,
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
        'तथ्य जाँचें और ज़िम्मेदारी से साझा करें (वैज्ञानिक दृष्टिकोण)',
        'तुरंत सबको आगे भेजें',
        'आँख मूंदकर मान लें',
        'जवाब में अफवाह शुरू करें',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Developing scientific temper, humanism and the spirit of inquiry and reform is a Fundamental Duty of citizens under Article 51A(h).',
      hi: 'वैज्ञानिक दृष्टिकोण, मानववाद तथा ज्ञानार्जन और सुधार की भावना विकसित करना नागरिकों का मूल कर्तव्य है (अनुच्छेद 51क(छ))।',
    },
  },
  {
    id: 'q-duties-public-property',
    conceptId: 'fd-scientific-tempor',
    difficulty: 1,
    question: {
      en: 'During a local agitation against electricity tariff changes, an angry crowd begins stoning public state buses and setting fire to a railway ticket counter. Which Fundamental Duty under Article 51A is being violated?',
      hi: 'बिजली दरों के विरोध प्रदर्शन में उग्र भीड़ सरकारी बसों पर पथराव और रेलवे काउंटर में आगजनी शुरू कर देती है। अनुच्छेद 51क के तहत किस मूल कर्तव्य का उल्लंघन हो रहा है?',
    },
    options: {
      en: [
        'Duty to pay local electricity bills on time',
        'Duty to safeguard public property and to abjure violence (Article 51A(i))',
        'Duty to seek political office',
        'Duty to join consumer courts',
      ],
      hi: [
        'बिजली बिल समय पर भरने का कर्तव्य',
        'सार्वजनिक संपत्ति की रक्षा करना और हिंसा से दूर रहना (अनुच्छेद 51क(झ))',
        'राजनीतिक पद प्राप्त करने का कर्तव्य',
        'उपभोक्ता अदालत जाने का कर्तव्य',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Article 51A(i) places a direct civic duty on every citizen to safeguard public property and strictly abjure violence in all forms.',
      hi: 'अनुच्छेद 51क(झ) हर नागरिक पर यह सीधा कर्तव्य डालता है कि वह सार्वजनिक संपत्ति की रक्षा करे और हिंसा से दूर रहे।',
    },
  },
  {
    id: 'q-duties-national-symbols',
    conceptId: 'fd-scientific-tempor',
    difficulty: 1,
    question: {
      en: 'A sports match begins with the National Anthem. Some spectators intentionally disrespect and mock the Anthem. Which Fundamental Duty is disregarded?',
      hi: 'एक खेल मैच से पहले राष्ट्रगान शुरू होता है। कुछ दर्शक जानबूझकर राष्ट्रगान का मज़ाक उड़ाते हैं। किस मूल कर्तव्य की अनदेखी की गई?',
    },
    options: {
      en: [
        'Duty to abide by the Constitution and respect the National Flag and National Anthem (Article 51A(a))',
        'Duty to pay amusement tax',
        'Duty to promote sports',
        'Duty to exercise daily',
      ],
      hi: [
        'संविधान का पालन करना तथा राष्ट्रध्वज और राष्ट्रगान का आदर करना (अनुच्छेद 51क(क))',
        'मनोरंजन कर चुकाने का कर्तव्य',
        'खेलों को बढ़ावा देने का कर्तव्य',
        'रोजाना व्यायाम करने का कर्तव्य',
      ],
    },
    correctIndex: 0,
    learnMore: {
      en: 'Article 51A(a) mandates that every citizen of India must abide by the Constitution and respect its ideals, institutions, the National Flag and the National Anthem.',
      hi: 'अनुच्छेद 51क(क) आदेश देता है कि भारत का प्रत्येक नागरिक संविधान का पालन करे और उसके आदर्शों, संस्थाओं, राष्ट्रध्वज और राष्ट्रगान का सम्मान करे।',
    },
  },
  {
    id: 'q-duties-environment-wildlife',
    conceptId: 'fd-scientific-tempor',
    difficulty: 2,
    question: {
      en: 'A tourist group camping near a pristine river tosses plastic bags, glass bottles, and chemical battery cells directly into the flowing river. What Fundamental Duty under Article 51A(g) are they ignoring?',
      hi: 'एक नदी किनारे कैंपिंग कर रहा पर्यटकों का दल बहते पानी में प्लास्टिक, कांच की बोतलें और रासायनिक कचरा फेंकता है। वे अनुच्छेद 51क(छ) के किस मूल कर्तव्य की अनदेखी कर रहे हैं?',
    },
    options: {
      en: [
        'Duty to maintain campfires safely',
        'Duty to protect and improve the natural environment, including forests, lakes, rivers, and wildlife',
        'Duty to purchase local products',
        'Duty to take photographs responsibly',
      ],
      hi: [
        'कैंपफायर सुरक्षित रखने का कर्तव्य',
        'वनों, झीलों, नदियों और वन्यजीवों सहित प्राकृतिक पर्यावरण की रक्षा और संवर्धन करना',
        'स्थानीय सामान खरीदने का कर्तव्य',
        'जिम्मेदारी से फोटो खींचने का कर्तव्य',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Article 51A(g) states that it is the duty of every citizen to protect and improve the natural environment including forests, lakes, rivers, and wildlife, and to have compassion for living creatures.',
      hi: 'अनुच्छेद 51क(छ) कहता है कि वनों, झीलों, नदियों और वन्यजीवों सहित प्राकृतिक पर्यावरण की रक्षा और संवर्धन करना तथा सभी जीवित प्राणियों के प्रति दयाभाव रखना हर नागरिक का कर्तव्य है।',
    },
  },
  {
    id: 'q-duties-parent-child-education',
    conceptId: 'fd-scientific-tempor',
    difficulty: 2,
    question: {
      en: 'A parent refuses to send their 7-year-old daughter to school, arguing that girls do not need an education. Which Fundamental Duty introduced by the 86th Amendment does this violate?',
      hi: 'एक अभिभावक अपनी 7 वर्षीय बेटी को स्कूल भेजने से मना करता है, यह कहकर कि लड़कियों को पढ़ने की जरूरत नहीं। 86वें संशोधन द्वारा जोड़े गए किस मूल कर्तव्य का यह उल्लंघन है?',
    },
    options: {
      en: [
        'Duty to save money for marriage',
        'Duty of a parent or guardian to provide educational opportunities to their child between 6 and 14 years (Article 51A(k))',
        'Duty to pursue traditional crafts only',
        'Duty to register birth certificates',
      ],
      hi: [
        'शादी के लिए पैसे बचाने का कर्तव्य',
        '6 से 14 वर्ष की आयु के अपने बच्चे को शिक्षा के अवसर प्रदान करने का माता-पिता या अभिभावक का कर्तव्य (अनुच्छेद 51क(ट))',
        'पारंपरिक काम सीखने का कर्तव्य',
        'जन्म प्रमाण पत्र बनवाने का कर्तव्य',
      ],
    },
    correctIndex: 1,
    learnMore: {
      en: 'Article 51A(k), added by the 86th Constitutional Amendment, imposes a duty on parents and guardians to provide educational opportunities to their children between 6 and 14 years.',
      hi: '86वें संविधान संशोधन द्वारा अनुच्छेद 51क(ट) जोड़ा गया, जो माता-पिता और अभिभावकों पर 6 से 14 वर्ष के बच्चों को शिक्षा के अवसर उपलब्ध कराने का मूल कर्तव्य सौंपता है।',
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
