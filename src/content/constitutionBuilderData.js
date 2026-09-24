// ============================================================================
// Data & Curriculum for "Build Your Constitution" (संविधान निर्माण)
// ============================================================================

export const BUILDER_LEVELS = [
  // --------------------------------------------------------------------------
  // LEVEL 1: Foundations of the Republic
  // --------------------------------------------------------------------------
  {
    level: 1,
    title: { en: 'Level 1: The Core Foundation', hi: 'स्तर 1: गणराज्य की आधारशिला' },
    subtitle: {
      en: 'Arrange fundamental values, rights, duties, and state principles into the 4 founding pillars of India.',
      hi: 'मूल्यों, अधिकारों, कर्तव्यों और राज्य के सिद्धांतों को भारत के 4 आधारभूत स्तंभों में व्यवस्थित करें।'
    },
    targetTimeSeconds: 180,
    pillars: [
      {
        id: 'pillar-preamble',
        color: '#0f6b5c',
        title: { en: 'Preamble & Sovereign Values', hi: 'उद्देशिका व संप्रभु मूल्य' },
        subtitle: { en: 'Founding ideals & goals of the Republic', hi: 'गणराज्य के मूलभूत आदर्श व संकल्प' },
        icon: '📜',
        capacity: 2
      },
      {
        id: 'pillar-rights',
        color: '#1e5a8a',
        title: { en: 'Part III: Fundamental Rights', hi: 'भाग III: मूल अधिकार' },
        subtitle: { en: 'Guaranteed civil liberties (Articles 12–35)', hi: 'नागरिक स्वतंत्रता की कानूनी गारंटी' },
        icon: '⚖️',
        capacity: 2
      },
      {
        id: 'pillar-dpsp',
        color: '#b45309',
        title: { en: 'Part IV: Directive Principles', hi: 'भाग IV: नीति निदेशक तत्व' },
        subtitle: { en: 'Socio-economic welfare goals (Articles 36–51)', hi: 'सामाजिक-आर्थिक कल्याण के मार्गदर्शक' },
        icon: '🌱',
        capacity: 2
      },
      {
        id: 'pillar-duties',
        color: '#8a2f4a',
        title: { en: 'Part IV-A: Fundamental Duties', hi: 'भाग IV-क: मूल कर्तव्य' },
        subtitle: { en: 'Civic responsibilities of citizens (Art 51A)', hi: 'नागरिकों के नैतिक व नागरिक दायित्व' },
        icon: '🤝',
        capacity: 2
      }
    ],
    cards: [
      {
        id: 'c-equality-law',
        title: { en: 'Equality Before Law (Article 14)', hi: 'विधि के समक्ष समानता (अनुच्छेद 14)' },
        tag: { en: 'Enforceable Right', hi: 'प्रवर्तनीय अधिकार' },
        correctPillarId: 'pillar-rights',
        explanation: {
          en: 'Article 14 guarantees that the State shall not deny to any person equality before the law or equal protection of the laws within India.',
          hi: 'अनुच्छेद 14 गारंटी देता है कि राज्य भारत में किसी भी व्यक्ति को कानून के समक्ष समानता या समान सुरक्षा से वंचित नहीं करेगा।'
        },
        wrongHint: {
          en: 'Equality before law is an enforceable Fundamental Right under Part III, not an advisory goal or moral duty.',
          hi: 'विधि के समक्ष समानता भाग III के तहत प्रवर्तनीय मूल अधिकार है, केवल परामर्श या कर्तव्य नहीं।'
        }
      },
      {
        id: 'c-life-liberty',
        title: { en: 'Right to Life & Liberty (Article 21)', hi: 'जीवन और व्यक्तिगत स्वतंत्रता (अनुच्छेद 21)' },
        tag: { en: 'Enforceable Right', hi: 'प्रवर्तनीय अधिकार' },
        correctPillarId: 'pillar-rights',
        explanation: {
          en: 'Article 21 protects life and personal liberty, which can only be restricted by fair, just, and reasonable legal procedure.',
          hi: 'अनुच्छेद 21 जीवन और व्यक्तिगत स्वतंत्रता की रक्षा करता है, जिसे केवल निष्पक्ष और उचित विधिक प्रक्रिया से ही सीमित किया जा सकता है।'
        },
        wrongHint: {
          en: 'Right to Life is an inalienable Fundamental Right protected in Part III, directly enforceable in the Supreme Court.',
          hi: 'जीवन का अधिकार भाग III के तहत सर्वोच्च अदालत में सीधे प्रवर्तनीय मूल अधिकार है।'
        }
      },
      {
        id: 'c-sovereign-republic',
        title: { en: 'Sovereign, Socialist, Secular, Democratic Republic', hi: 'संप्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य' },
        tag: { en: 'State Identity', hi: 'राज्य की प्रकृति' },
        correctPillarId: 'pillar-preamble',
        explanation: {
          en: 'These core declarations in the Preamble establish India as an independent nation governed by and for its people.',
          hi: 'उद्देशिका के ये शब्द भारत को एक स्वतंत्र, धर्मनिरपेक्ष और लोकतांत्रिक गणराज्य के रूप में परिभाषित करते हैं।'
        },
        wrongHint: {
          en: 'This foundational statement defines the nature of the Indian State as set forth in the Preamble.',
          hi: 'यह घोषणा उद्देशिका में स्थापित भारतीय राज्य की मूल प्रकृति को दर्शाती है।'
        }
      },
      {
        id: 'c-justice-liberty-values',
        title: { en: 'Justice, Liberty, Equality, and Fraternity', hi: 'न्याय, स्वतंत्रता, समता और बंधुता' },
        tag: { en: 'Preamble Values', hi: 'उद्देशिका के मूल्य' },
        correctPillarId: 'pillar-preamble',
        explanation: {
          en: 'The four constitutional pillars promised to all Indian citizens right at the opening of the Constitution.',
          hi: 'ये चार महान संवैधानिक लक्ष्य हैं जिनकी गारंटी उद्देशिका में प्रत्येक भारतीय नागरिक को दी गई है।'
        },
        wrongHint: {
          en: 'Justice, Liberty, Equality, and Fraternity are the grand philosophical objectives promised in the Preamble.',
          hi: 'न्याय, स्वतंत्रता, समता और बंधुता उद्देशिका के चार आधारभूत दार्शनिक स्तंभ हैं।'
        }
      },
      {
        id: 'c-free-legal-aid',
        title: { en: 'Equal Justice & Free Legal Aid (Article 39A)', hi: 'समान न्याय व निःशुल्क विधिक सहायता (अनुच्छेद 39क)' },
        tag: { en: 'Welfare Goal', hi: 'कल्याणकारी लक्ष्य' },
        correctPillarId: 'pillar-dpsp',
        explanation: {
          en: 'Article 39A directs the State to ensure access to justice is not denied to any citizen due to economic or other disabilities.',
          hi: 'अनुच्छेद 39क राज्य को निर्देश देता है कि आर्थिक या अन्य असमर्थता के कारण किसी नागरिक को न्याय से वंचित न रहना पड़े।'
        },
        wrongHint: {
          en: 'Free legal aid is a Directive Principle under Part IV, guiding the State to promote affordable justice.',
          hi: 'निःशुल्क कानूनी सहायता भाग IV के तहत एक नीति निदेशक तत्व है जो सरकार की कल्याणकारी नीतियों का मार्गदर्शन करता है।'
        }
      },
      {
        id: 'c-intl-peace',
        title: { en: 'Promotion of International Peace (Article 51)', hi: 'अंतरराष्ट्रीय शांति की अभिवृद्धि (अनुच्छेद 51)' },
        tag: { en: 'Policy Principle', hi: 'नीति सिद्धांत' },
        correctPillarId: 'pillar-dpsp',
        explanation: {
          en: 'Article 51 in Part IV instructs the State to foster international peace, security, and honorable relations among nations.',
          hi: 'भाग IV में अनुच्छेद 51 राज्य को अंतरराष्ट्रीय शांति, सुरक्षा और राष्ट्रों के बीच सम्मानजनक संबंधों को बढ़ावा देने का निर्देश देता है।'
        },
        wrongHint: {
          en: 'Promoting world peace is a Directive Principle guiding India’s foreign policy, placed in Part IV.',
          hi: 'विश्व शांति को बढ़ावा देना भाग IV में उल्लिखित राज्य का नीति निदेशक सिद्धांत है।'
        }
      },
      {
        id: 'c-scientific-temper',
        title: { en: 'Develop Scientific Temper & Inquiry (Article 51A(h))', hi: 'वैज्ञानिक दृष्टिकोण और ज्ञानार्जन का विकास (अनुच्छेद 51क(छ))' },
        tag: { en: 'Citizen Duty', hi: 'नागरिक कर्तव्य' },
        correctPillarId: 'pillar-duties',
        explanation: {
          en: 'Article 51A(h) calls on every citizen to cultivate curiosity, rational thinking, and humanism.',
          hi: 'अनुच्छेद 51क(छ) प्रत्येक नागरिक से तर्कसंगत सोच, वैज्ञानिक दृष्टिकोण और मानवतावाद विकसित करने की अपेक्षा करता है।'
        },
        wrongHint: {
          en: 'Developing scientific temper is a citizen’s Fundamental Duty under Part IV-A (Article 51A).',
          hi: 'वैज्ञानिक दृष्टिकोण विकसित करना भाग IV-क में नागरिकों का मूल कर्तव्य है।'
        }
      },
      {
        id: 'c-public-property',
        title: { en: 'Safeguard Public Property & Abjure Violence (Article 51A(i))', hi: 'सार्वजनिक संपत्ति की रक्षा व हिंसा का त्याग (अनुच्छेद 51क(झ))' },
        tag: { en: 'Citizen Duty', hi: 'नागरिक कर्तव्य' },
        correctPillarId: 'pillar-duties',
        explanation: {
          en: 'Article 51A(i) places an explicit moral obligation on all citizens to protect public property and reject violent methods.',
          hi: 'अनुच्छेद 51क(झ) सभी नागरिकों पर सार्वजनिक संपत्ति की रक्षा करने और हिंसा से दूर रहने का कर्तव्य सौंपता है।'
        },
        wrongHint: {
          en: 'Protecting public property is a citizen responsibility under Fundamental Duties (Article 51A).',
          hi: 'सरकारी संपत्ति की रक्षा करना मूल कर्तव्यों (अनुच्छेद 51क) के अंतर्गत नागरिकों की ज़िम्मेदारी है।'
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL 2: The Three Great Organs of Government
  // --------------------------------------------------------------------------
  {
    level: 2,
    title: { en: 'Level 2: The Three Organs of Government', hi: 'स्तर 2: शासन के तीन महान अंग' },
    subtitle: {
      en: 'Organize legislative powers, executive authority, and judicial safeguards into their proper branch.',
      hi: 'कानून निर्माण, शासकीय कार्यपालिका और न्यायिक संरक्षण को उनके सही अंग में व्यवस्थित करें।'
    },
    targetTimeSeconds: 210,
    pillars: [
      {
        id: 'pillar-legislature',
        color: '#1e5a8a',
        title: { en: 'The Legislature / Parliament', hi: 'विधायिका: संसद' },
        subtitle: { en: 'Lok Sabha & Rajya Sabha (Art 79–122)', hi: 'लोक सभा व राज्य सभा: कानून निर्माता' },
        icon: '🏛️',
        capacity: 3
      },
      {
        id: 'pillar-executive',
        color: '#0f6b5c',
        title: { en: 'The Executive / President & Cabinet', hi: 'कार्यपालिका: राष्ट्रपति व मंत्रिमंडल' },
        subtitle: { en: 'Administration & Policy (Art 52–78)', hi: 'शासन संचालन व नीति कार्यान्वयन' },
        icon: '🏢',
        capacity: 3
      },
      {
        id: 'pillar-judiciary',
        color: '#5b3a8a',
        title: { en: 'The Judiciary / Supreme & High Courts', hi: 'न्यायपालिका: न्यायालय' },
        subtitle: { en: 'Guardian of Rights (Art 124–147, 214–231)', hi: 'संविधान व मूल अधिकारों का संरक्षक' },
        icon: '⚖️',
        capacity: 3
      }
    ],
    cards: [
      {
        id: 'c-enact-laws',
        title: { en: 'Enacting National Laws & Debating Policies', hi: 'केंद्रीय कानून बनाना व नीतियों पर बहस' },
        tag: { en: 'Law Making', hi: 'विधि निर्माण' },
        correctPillarId: 'pillar-legislature',
        explanation: {
          en: 'Article 79 designates Parliament as the supreme law-making organ of the Indian Republic.',
          hi: 'अनुच्छेद 79 संसद को भारतीय गणराज्य की सर्वोच्च कानून-निर्मात्री संस्था बनाता है।'
        },
        wrongHint: {
          en: 'Drafting, debating, and passing statutory bills is the exclusive mandate of the Legislature.',
          hi: 'विधेयकों पर बहस और कानून पारित करना विधायिका (संसद) का विशेष कार्य है।'
        }
      },
      {
        id: 'c-money-bills',
        title: { en: 'Voting on Budget & Money Bills (Article 109)', hi: 'बजट पारित करना व धन विधेयक (अनुच्छेद 109)' },
        tag: { en: 'Fiscal Control', hi: 'वित्तीय नियंत्रण' },
        correctPillarId: 'pillar-legislature',
        explanation: {
          en: 'Money Bills must be introduced and approved in Lok Sabha, ensuring elected representatives control public funds.',
          hi: 'धन विधेयक केवल लोक सभा में प्रस्तुत हो सकते हैं, जिससे निर्वाचित प्रतिनिधियों का सरकारी कोष पर नियंत्रण रहता है।'
        },
        wrongHint: {
          en: 'Controlling the public purse through budget approvals belongs to the Legislature.',
          hi: 'बजट को स्वीकृति देना और जनता के धन पर नियंत्रण रखना संसद (विधायिका) का अधिकार है।'
        }
      },
      {
        id: 'c-no-confidence-motion',
        title: { en: 'Motion of No-Confidence (Article 75(3))', hi: 'अविश्वास प्रस्ताव व सामूहिक जवाबदेही (अनुच्छेद 75(3))' },
        tag: { en: 'Accountability', hi: 'संसदीय जवाबदेही' },
        correctPillarId: 'pillar-legislature',
        explanation: {
          en: 'The Council of Ministers is collectively responsible to the Lok Sabha; Parliament can dismiss an executive government via a no-confidence vote.',
          hi: 'मंत्रिपरिषद सामूहिक रूप से लोक सभा के प्रति उत्तरदायी होती है; संसद अविश्वास प्रस्ताव द्वारा सरकार को हटा सकती है।'
        },
        wrongHint: {
          en: 'Holding the government accountable through debates and confidence motions is a power of the Legislature.',
          hi: 'मंत्रिपरिषद की जवाबदेही तय करना विधायिका (लोक सभा) का अधिकार है।'
        }
      },
      {
        id: 'c-implement-governance',
        title: { en: 'Implementing Laws & Administering Public Schemes', hi: 'कानूनों को लागू करना व लोक कल्याणकारी योजनाएं चलाना' },
        tag: { en: 'Administration', hi: 'प्रशासन' },
        correctPillarId: 'pillar-executive',
        explanation: {
          en: 'The Prime Minister and Cabinet oversee the bureaucracy to execute laws passed by Parliament.',
          hi: 'प्रधानमंत्री और मंत्रिमंडल संसद द्वारा पारित कानूनों को लागू करने के लिए प्रशासनिक तंत्र का संचालन करते हैं।'
        },
        wrongHint: {
          en: 'Day-to-day administration and law enforcement belong to the Executive branch.',
          hi: 'रोजमर्रा का शासन संचालन और कानून लागू करना कार्यपालिका का कार्य है।'
        }
      },
      {
        id: 'c-commander-forces',
        title: { en: 'Supreme Commander of the Armed Forces (Article 53(2))', hi: 'सशस्त्र बलों का सर्वोच्च सेनापति (अनुच्छेद 53(2))' },
        tag: { en: 'Defense Command', hi: 'रक्षा कमान' },
        correctPillarId: 'pillar-executive',
        explanation: {
          en: 'The President, as Head of the Union Executive, exercises supreme military command as regulated by law.',
          hi: 'राष्ट्रपति संघ की कार्यपालिका के प्रमुख के रूप में सेनाओं के सर्वोच्च सेनापति होते हैं।'
        },
        wrongHint: {
          en: 'The President is the head of the Executive and supreme commander of defense forces.',
          hi: 'राष्ट्रपति कार्यपालिका के प्रमुख और तीनों सेनाओं के सर्वोच्च सेनापति हैं।'
        }
      },
      {
        id: 'c-ordinance-promulgation',
        title: { en: 'Promulgation of Ordinances (Article 123)', hi: 'अध्यादेश प्रख्यापित करने की शक्ति (अनुच्छेद 123)' },
        tag: { en: 'Executive Order', hi: 'अध्यादेश' },
        correctPillarId: 'pillar-executive',
        explanation: {
          en: 'When Parliament is not in session, the President can issue ordinances with the same force as an Act of Parliament.',
          hi: 'जब संसद सत्र में न हो, तब राष्ट्रपति अध्यादेश जारी कर सकते हैं जिसका प्रभाव संसद के कानून के समान होता है।'
        },
        wrongHint: {
          en: 'Promulgating ordinances is an emergency executive power of the President.',
          hi: 'अध्यादेश जारी करना कार्यपालिका (राष्ट्रपति) की विशेष संवैधानिक शक्ति है।'
        }
      },
      {
        id: 'c-judicial-review-power',
        title: { en: 'Judicial Review of Unconstitutional Laws (Article 13, 32)', hi: 'न्यायिक समीक्षा व असंवैधानिक कानूनों को रद्द करना' },
        tag: { en: 'Constitutional Check', hi: 'न्यायिक समीक्षा' },
        correctPillarId: 'pillar-judiciary',
        explanation: {
          en: 'The Supreme Court and High Courts have the power to strike down laws that violate Fundamental Rights or the Constitution.',
          hi: 'उच्चतम न्यायालय और उच्च न्यायालयों को संविधान या मूल अधिकारों का उल्लंघन करने वाले कानूनों को निरस्त करने की शक्ति प्राप्त है।'
        },
        wrongHint: {
          en: 'Judicial Review is the sacred check exercised by the independent Judiciary.',
          hi: 'न्यायिक समीक्षा न्यायपालिका की सबसे महत्वपूर्ण शक्ति है जो संविधान की सर्वोच्चता की रक्षा करती है।'
        }
      },
      {
        id: 'c-issue-writs',
        title: { en: 'Issuing Writs to Protect Liberties (Article 32 & 226)', hi: 'नागरिक अधिकारों की रक्षा हेतु रिट जारी करना' },
        tag: { en: 'Writs Power', hi: 'संवैधानिक उपचार' },
        correctPillarId: 'pillar-judiciary',
        explanation: {
          en: 'Courts issue Habeas Corpus, Mandamus, Certiorari, Prohibition, and Quo Warranto to protect citizens against unlawful state power.',
          hi: 'अदालतें बंदी प्रत्यक्षीकरण और परमादेश जैसी रिट जारी कर नागरिकों की स्वतंत्रता की रक्षा करती हैं।'
        },
        wrongHint: {
          en: 'Issuing writs for the enforcement of Fundamental Rights is an exclusive power of the Judiciary.',
          hi: 'मूल अधिकारों के प्रवर्तन हेतु रिट जारी करना न्यायपालिका का संवैधानिक कार्य है।'
        }
      },
      {
        id: 'c-advisory-jurisdiction',
        title: { en: 'Advisory Jurisdiction on Questions of Law (Article 143)', hi: 'परामर्शदात्री क्षेत्राधिकार (अनुच्छेद 143)' },
        tag: { en: 'Legal Advice', hi: 'विधिक परामर्श' },
        correctPillarId: 'pillar-judiciary',
        explanation: {
          en: 'Under Article 143, the President may consult the Supreme Court on questions of law or public importance.',
          hi: 'अनुच्छेद 143 के तहत राष्ट्रपति लोक महत्व के कानूनी प्रश्नों पर उच्चतम न्यायालय से परामर्श ले सकते हैं।'
        },
        wrongHint: {
          en: 'Providing formal advisory opinions on constitutional questions is the role of the Supreme Court (Judiciary).',
          hi: 'संवैधानिक प्रश्नों पर विधिक परामर्श देना उच्चतम न्यायालय (न्यायपालिका) का क्षेत्राधिकार है।'
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL 3: Federalism, Independent Watchdogs & Crisis Architecture
  // --------------------------------------------------------------------------
  {
    level: 3,
    title: { en: 'Level 3: Federalism, Watchdogs & Crisis Safeguards', hi: 'स्तर 3: संघीय ढांचा, स्वतंत्र संस्थाएं व आपात उपबंध' },
    subtitle: {
      en: 'Complete the advanced architecture: Federal relations, constitutional watchdogs, and crisis mechanisms.',
      hi: 'उन्नत संवैधानिक संरचना पूर्ण करें: संघ-राज्य संबंध, स्वतंत्र संस्थाएं और संकटकालीन सुरक्षा तंत्र।'
    },
    targetTimeSeconds: 240,
    pillars: [
      {
        id: 'pillar-federalism',
        color: '#0f6b5c',
        title: { en: 'Federalism & Center-State Relations', hi: 'संघीय ढांचा: केंद्र-राज्य संबंध' },
        subtitle: { en: 'Division of legislative & fiscal power', hi: 'विधायी व वित्तीय शक्तियों का विभाजन' },
        icon: '🗺️',
        capacity: 3
      },
      {
        id: 'pillar-watchdogs',
        color: '#b45309',
        title: { en: 'Autonomous Constitutional Watchdogs', hi: 'स्वतंत्र संवैधानिक संस्थाएं' },
        subtitle: { en: 'Institutions guarding democratic integrity', hi: 'लोकतांत्रिक शुचिता की प्रहरी संस्थाएं' },
        icon: '🛡️',
        capacity: 3
      },
      {
        id: 'pillar-emergency',
        color: '#b3261e',
        title: { en: 'Emergency Powers & Amendments', hi: 'आपात उपबंध व संविधान संशोधन' },
        subtitle: { en: 'Crisis handling & amending procedures', hi: 'संकटकालीन सुरक्षा व संशोधन प्रणाली' },
        icon: '⚡',
        capacity: 3
      }
    ],
    cards: [
      {
        id: 'c-seventh-sched-lists',
        title: { en: 'Union, State, and Concurrent Lists (7th Schedule)', hi: 'संघ, राज्य और समवर्ती सूची (सातवीं अनुसूची)' },
        tag: { en: 'Legislative Division', hi: 'शक्तियों का विभाजन' },
        correctPillarId: 'pillar-federalism',
        explanation: {
          en: 'The 7th Schedule divides lawmaking power between the Union and the States, forming the foundation of Indian federalism.',
          hi: 'सातवीं अनुसूची केंद्र और राज्यों के बीच विषयों का विभाजन कर भारतीय संघीय ढांचे की नींव रखती है।'
        },
        wrongHint: {
          en: 'Legislative subject division between Center and States is part of the Federal Structure.',
          hi: 'शक्तियों का तीन सूचियों में विभाजन संघीय ढांचे का हिस्सा है।'
        }
      },
      {
        id: 'c-finance-commission',
        title: { en: 'Finance Commission for Revenue Sharing (Article 280)', hi: 'वित्त आयोग: कर राजस्व का बंटवारा (अनुच्छेद 280)' },
        tag: { en: 'Fiscal Federalism', hi: 'वित्तीय संघवाद' },
        correctPillarId: 'pillar-federalism',
        explanation: {
          en: 'Article 280 mandates a Finance Commission every 5 years to recommend fair tax-sharing between the Center and States.',
          hi: 'अनुच्छेद 280 के तहत वित्त आयोग केंद्र और राज्यों के बीच कर राजस्व के न्यायसंगत बंटवारे की सिफारिश करता है।'
        },
        wrongHint: {
          en: 'Fiscal devolution between the Union and States is a pillar of Federal Architecture.',
          hi: 'राजस्व का संघ और राज्यों के बीच वितरण वित्तीय संघवाद का प्रमुख अंग है।'
        }
      },
      {
        id: 'c-interstate-council',
        title: { en: 'Inter-State Council (Article 263)', hi: 'अंतर-राज्य परिषद (अनुच्छेद 263)' },
        tag: { en: 'Cooperative Federalism', hi: 'सहकारी संघवाद' },
        correctPillarId: 'pillar-federalism',
        explanation: {
          en: 'Article 263 enables setting up an Inter-State Council to promote consultation and coordination among States.',
          hi: 'अनुच्छेद 263 राज्यों और केंद्र के बीच समन्वय व सहयोग बढ़ाने के लिए अंतर-राज्य परिषद की व्यवस्था करता है।'
        },
        wrongHint: {
          en: 'Inter-State consultation promotes cooperative federalism under Center-State relations.',
          hi: 'राज्यों के बीच समन्वय स्थापित करना संघीय ढांचे का प्रमुख उद्देश्य है।'
        }
      },
      {
        id: 'c-election-commission',
        title: { en: 'Election Commission of India (Article 324)', hi: 'भारत निर्वाचन आयोग (अनुच्छेद 324)' },
        tag: { en: 'Electoral Integrity', hi: 'चुनावी निष्पक्षता' },
        correctPillarId: 'pillar-watchdogs',
        explanation: {
          en: 'Article 324 ensures free and fair elections to Parliament and State Legislatures by an independent watchdog body.',
          hi: 'अनुच्छेद 324 संसद और विधानसभाओं के स्वतंत्र और निष्पक्ष चुनाव सुनिश्चित करने हेतु निर्वाचन आयोग को स्वायत्त शक्ति देता है।'
        },
        wrongHint: {
          en: 'The Election Commission is an independent constitutional watchdog safeguarding democratic voting.',
          hi: 'निर्वाचन आयोग निष्पक्ष लोकतंत्र की रक्षा करने वाली स्वतंत्र संवैधानिक संस्था है।'
        }
      },
      {
        id: 'c-cag-audit',
        title: { en: 'Comptroller and Auditor General - CAG (Article 148)', hi: 'नियंत्रक एवं महालेखापरीक्षक - कैग (अनुच्छेद 148)' },
        tag: { en: 'Financial Watchdog', hi: 'वित्तीय शुचिता' },
        correctPillarId: 'pillar-watchdogs',
        explanation: {
          en: 'The CAG is the independent guardian of the public purse, auditing all government expenditures for parliamentary accountability.',
          hi: 'कैग सार्वजनिक धन का स्वतंत्र संरक्षक है, जो सरकार के सभी खर्चों की निष्पक्ष जांच करता है।'
        },
        wrongHint: {
          en: 'The CAG is an independent constitutional watchdog ensuring fiscal integrity.',
          hi: 'कैग सरकारी धन की शुचिता की निगरानी करने वाली स्वतंत्र संवैधानिक संस्था है।'
        }
      },
      {
        id: 'c-upsc-merit',
        title: { en: 'Union Public Service Commission - UPSC (Article 315)', hi: 'संघ लोक सेवा आयोग - यूपीएससी (अनुच्छेद 315)' },
        tag: { en: 'Merit Recruitment', hi: 'निष्पक्ष भर्ती' },
        correctPillarId: 'pillar-watchdogs',
        explanation: {
          en: 'Article 315 establishes the UPSC as an autonomous institution to conduct competitive, merit-based examinations for public services.',
          hi: 'अनुच्छेद 315 योग्यता के आधार पर लोक सेवाओं में निष्पक्ष भर्ती सुनिश्चित करने के लिए यूपीएससी की स्थापना करता है।'
        },
        wrongHint: {
          en: 'The UPSC is an autonomous constitutional watchdog ensuring civil service neutrality.',
          hi: 'यूपीएससी निष्पक्ष प्रशासनिक भर्ती के लिए बनाई गई स्वतंत्र संवैधानिक संस्था है।'
        }
      },
      {
        id: 'c-national-emergency',
        title: { en: 'National Emergency due to War or Rebellion (Article 352)', hi: 'राष्ट्रीय आपातकाल: युद्ध या सशस्त्र विद्रोह (अनुच्छेद 352)' },
        tag: { en: 'Crisis Power', hi: 'संकटकालीन शक्ति' },
        correctPillarId: 'pillar-emergency',
        explanation: {
          en: 'Article 352 empowers the President to proclaim a National Emergency when security is threatened by war or armed rebellion.',
          hi: 'अनुच्छेद 352 सुरक्षा को खतरा होने पर पूरे देश में राष्ट्रीय आपातकाल लागू करने का अधिकार देता है।'
        },
        wrongHint: {
          en: 'Proclaiming a National Emergency is a crisis mechanism under Part XVIII of the Constitution.',
          hi: 'राष्ट्रीय आपातकाल संकटकालीन सुरक्षा तंत्र के अंतर्गत आता है।'
        }
      },
      {
        id: 'c-presidents-rule',
        title: { en: 'President’s Rule in States (Article 356)', hi: 'राज्यों में राष्ट्रपति शासन (अनुच्छेद 356)' },
        tag: { en: 'State Breakdown', hi: 'संवैधानिक संकट' },
        correctPillarId: 'pillar-emergency',
        explanation: {
          en: 'Article 356 enables Union takeover when constitutional machinery breaks down in a State.',
          hi: 'अनुच्छेद 356 राज्य में संवैधानिक तंत्र विफल होने पर राष्ट्रपति शासन लगाने की अनुमति देता है।'
        },
        wrongHint: {
          en: 'President’s Rule is an emergency power governing failure of state constitutional machinery.',
          hi: 'राष्ट्रपति शासन आपात उपबंधों के तहत एक विशेष सुरक्षात्मक कदम है।'
        }
      },
      {
        id: 'c-amending-power-368',
        title: { en: 'Amending the Constitution by Special Majority (Article 368)', hi: 'संविधान संशोधन प्रक्रिया (अनुच्छेद 368)' },
        tag: { en: 'Living Constitution', hi: 'संशोधन शक्ति' },
        correctPillarId: 'pillar-emergency',
        explanation: {
          en: 'Article 368 provides the mechanism to amend constitutional provisions by special majority, preserving the Basic Structure.',
          hi: 'अनुच्छेद 368 संसद को मूल ढांचे को सुरक्षित रखते हुए संविधान में आवश्यक संशोधन करने की शक्ति देता है।'
        },
        wrongHint: {
          en: 'Article 368 governs the sovereign procedure for constitutional amendments.',
          hi: 'संविधान संशोधन की प्रक्रिया अनुच्छेद 368 के अंतर्गत आती है।'
        }
      }
    ]
  }
]
