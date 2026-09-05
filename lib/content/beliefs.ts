import type { Belief } from "./types";

/**
 * Statement of Faith. The Amharic text is the church's authoritative document
 * (የእምነት መግለጫ). The English is a DRAFT translation prepared for review —
 * keep `englishApproved` false until the church has signed off on it.
 */
export const englishApproved = false;

export const beliefs: Belief[] = [
  {
    number: "1",
    amharic: {
      title: "መጽሐፍ ቅዱስ",
      body:
        "በብሉይና በአዲስ ኪዳን ያሉት ስድሳ ስድስቱም መጻሕፍት ቅዱሳን ሰዎች በመንፈስ ቅዱስ ተነድተው የጻፉት መሆኑን፣ በመጀመሪያው ጽሑፍ ምንም ስህተት የሌለበት፣ የቤተ ክርስቲያን እምነት፣ ሥርዓትና ምንጭ መለኪያ የሆነ የእግዚአብሔር መንፈስ ያለበት ለአማኞችም ለትምህርትና ለተግሣጽ ልብንም ለማቅናትና ለመምከር ሙሉ ኃይልና ሥልጣን ያለው የእግዚአብሔር ቃል እንደሆነ እናምናለን።",
      references: "፪ኛ ጢሞ. ፫፥፲፮-፲፯፤ ፪ኛ ጴጥ. ፩፥፲፱-፳፩፤ ኢያ. ፩፥፰፤ ፩ኛ ተሰ. ፪፥፲፫፤ ፪ኛ ሳሙ. ፳፫፥፪፤ መዝ. (፲፪)፥፮፤ ማቴ. ፳፬፥፴፭",
    },
    english: {
      title: "The Bible",
      body: "We believe that all sixty-six books of the Old and New Testaments were written by holy men moved by the Holy Spirit; that they are without error in the original writings; and that they are the God-breathed Word of God — the standard and source of the church's faith and practice — with full power and authority for believers: for teaching, for reproof, for correcting the heart and for counsel.",
      references: "2 Tim. 3:16–17; 2 Pet. 1:19–21; Josh. 1:8; 1 Thess. 2:13; 2 Sam. 23:2; Ps. 12:6; Matt. 24:35",
    },
  },
  {
    number: "2",
    amharic: {
      title: "እግዚአብሔር",
      body:
        "በሰማይና በምድር የሚገኙትን የሚታዩትንና የማይታዩትን ፍጥረታት ሁሉ የፈጠረ፣ ፍጹም፣ ሕያው፣ ሁሉን ቻይ፣ ዘለዓለማዊ፣ የማይወሰን፣ የማይለወጥ፣ ሁሉን አዋቂ፣ ራሱን በማይከፈል ኑባሬ በሦስትነትና በአንድነት ይዞ በሚኖር አብም ወልድም መንፈስ ቅዱስም በሆነው አንድ አምላክ እናምናለን።",
      references: "ዘፍ. ፫፥፳፪፣ ፲፯፥፩፤ ዘዳ. ፮፥፬-፭፤ መዝ. (፺)፥፪፤ መዝ. (፻፴፪)፥፯-፲፪፤ ኢሳ. ፵፥፳፰፣ ፵፷፥፲፪-፲፮፤ ሚል. ፫፥፮፤ ዮሐ. ፲፯፥፳፬",
    },
    english: {
      title: "God",
      body: "We believe in one God — Father, Son and Holy Spirit — who created all things in heaven and on earth, visible and invisible; who is perfect, living, almighty, eternal, infinite, unchanging and all-knowing; and who exists in one indivisible being as three in one and one in three.",
      references: "Gen. 3:22, 17:1; Deut. 6:4–5; Ps. 90:2; Ps. 132:7–12; Isa. 40:28, 46:12–16; Mal. 3:6; John 17:24",
    },
    subSections: [
      {
        number: "2.1",
        amharic: {
          title: "እግዚአብሔር አብ",
          body:
            "እግዚአብሔር አብ አንድያ ልጁ የሆነውን ኢየሱስ ክርስቶስን ለዓለም ኃጢአት በመስቀል ሞት መሥዋዕት እንዲሆን የሰጠ፤ ልጁን በማመን አዳኝና ጌታ አድርገው ለሚቀበሉት ልጆቹ ይሆኑ ዘንድ ሥልጣን የሚሰጥና ከእርሱ ሰርጾ የሚወጣውን መንፈስ ቅዱስንም በወልድ ስም የላከ እንደሆነ እናምናለን።",
          references: "ዘፍ. ፫፥፩-፳፬፤ ዮሐ. ፫፥፲፮፣ ፩፥፲፪-፲፫፤ ማቴ. ፭፥፵፰፤ ኤፌ. ፬፥፮",
        },
        english: {
          title: "God the Father",
          body: "We believe that God the Father gave His only Son, Jesus Christ, to be the sacrifice on the cross for the sin of the world; that He gives the right to become His children to all who believe in the Son and receive Him as Savior and Lord; and that He sent the Holy Spirit, who proceeds from Him, in the name of the Son.",
          references: "Gen. 3:1–24; John 3:16, 1:12–13; Matt. 5:48; Eph. 4:6",
        },
      },
      {
        number: "2.2",
        amharic: {
          title: "እግዚአብሔር ወልድ",
          body:
            "ኢየሱስ ክርስቶስ የእግዚአብሔር ዘላለማዊ ልጅ የሆነ፤ ከአብና ከመንፈስ ቅዱስ ጋር ፍጹም የተካከለ መለኮት፤ ከድንግል ማርያም በመንፈስ ቅዱስ የተፀነሰ፤ ፍጹም ሰው ፍጹም አምላክ የሆነና ለዓለም ሁሉ ኃጢአት በቀራንዮ መስቀል ተሰቅሎ በመሞት ወደ ሲዖል ከወረደ በኋላ በሦስተኛው ቀን ከሙታን ተለይቶ የተነሳና ባፈሰሰው ክቡር ደም ከእግዚአብሔር አብ ጋር ብቸኛ የመታረቂያ ምክንያት ሆኖ በአርባኛው ቀን ወደ ሰማይ በማረግ በአባቱ ቀኝ የተቀመጠ፤ በሰማይ በዘለዓለማዊ ሊቀ ክህነት አገልግሎት በተሾመ፤ ስለ ኃጢአተኞች በሚማልድና በዓለም መጨረሻም በሙታንና በሕያዋን ላይ ሊፈርድ ባለው፤ ዳግመኛ በሚመለሰው እናምናለን።",
          references: "ዮሐ. ፩፥፩-፭፤ ሉቃ. ፩፥፳፮-፴፭፤ ቆላ. ፪፥፱፤ ዮሐ. ፫፥፲፬፤ ሮሜ ፭፥፰-፲፩፤ ፩ኛ ቆሮ. ፲፭፥፳-፳፪፤ ሐዋ. ፩፥፩-፱፤ ፪፥፴፪-፴፮፤ ዕብ. ፲፥፲፪፤ ዕብ. ፯፥፲፭-፳፭፤ ፩ኛ ዮሐ. ፪፥፩፤ የሐዋ. ፩፥፲-፲፩፤ ራዕ. ፩፥፮-፯፤ ሉቃ. ፲፥፵፪-፵፫",
        },
        english: {
          title: "God the Son",
          body: "We believe that Jesus Christ is the eternal Son of God, fully equal in deity with the Father and the Holy Spirit; that He was conceived by the Holy Spirit and born of the Virgin Mary, fully man and fully God; that He was crucified on the cross at Calvary and died for the sin of the whole world, descended to the place of the dead, and rose from the dead on the third day; that by the precious blood He shed He is the only means of reconciliation with God the Father; that on the fortieth day He ascended into heaven and sat down at the right hand of the Father, where He has been appointed to an eternal high-priestly ministry and intercedes for sinners; and that at the end of the age He will come again to judge the living and the dead.",
          references: "John 1:1–5; Luke 1:26–35; Col. 2:9; John 3:14; Rom. 5:8–11; 1 Cor. 15:20–22; Acts 1:1–9; 2:32–36; Heb. 10:12; Heb. 7:15–25; 1 John 2:1; Acts 1:10–11; Rev. 1:6–7; Luke 10:42–43",
        },
      },
      {
        number: "2.3",
        amharic: {
          title: "እግዚአብሔር መንፈስ ቅዱስ",
          body:
            "መንፈስ ቅዱስ ከአብና ከወልድ ጋር በመለኮትነቱ እኩል የሆነ፤ የሥላሴ ሦስተኛ አካል፤ የአብና የወልድ መንፈስ የሆነ፤ የራሱ ስብዕና ያለው፤ የሚፈጥር፤ ሕይወትንም የሚሰጥ፤ በነቢያት አድሮ ትንቢት ያናገረ፤ ክርስቶስ ኢየሱስ ሲከብር ከአብ ሰርፆ በመውጣት በሐዋርያት ላይ የወረደ፤ ዓለምን ስለ ኃጢአት ስለ ጽድቅና ስለ ፍርድ በመውቀስ ክርስቶስ ኢየሱስን በማመን ሰዎች እንዲድኑ የሚረዳ፤ በአማኞች ውስጥ የሚያድር፤ ያመኑትንም የሚያትም፤ የሚመራና ኃይልን የሚሰጥ እንዲሁም በመቀደስና የጸጋ ስጦታዎችን በማደል በቅዱሳን ሕይወት እንደሚሠራ እናምናለን።",
          references: "ሐዋ. ፭፥፫-፬፤ ማቴ. ፳፰፥፲፱-፳፤ ሐዋ. ፲፮፥፯፤ ሮሜ ፰፥፱-፲፤ ዘፍ. ፩፥፳፫፤ ኢዮ. ፴፫፥፬፤ ፩ኛ ጴጥ. ፩፥፲-፲፪፤ ዮሐ. ፲፭፥፳፮-፳፯፤ ፲፮፥፯-፲፭፤ ኤፌ. ፩፥፲፬፤ ፩ኛ ቆሮ. ፲፪፥፬-፲፩",
        },
        english: {
          title: "God the Holy Spirit",
          body: "We believe that the Holy Spirit is equal in deity with the Father and the Son; the third person of the Trinity; the Spirit of the Father and of the Son; a person in His own right; who creates and gives life; who spoke through the prophets; who, when Christ Jesus was glorified, proceeded from the Father and came upon the apostles; who convicts the world of sin, righteousness and judgment and leads people to salvation through faith in Christ Jesus; who dwells in believers, seals those who believe, guides and empowers them; and who works in the lives of the saints by sanctifying them and distributing gifts of grace.",
          references: "Acts 5:3–4; Matt. 28:19–20; Acts 16:7; Rom. 8:9–10; Gen. 1:23; Job 33:4; 1 Pet. 1:10–12; John 15:26–27; 16:7–15; Eph. 1:14; 1 Cor. 12:4–11",
        },
      },
    ],
  },
  {
    number: "3",
    amharic: {
      title: "ሰው",
      body:
        "ሰው በእግዚአብሔር አምሳል ተፈጥሮ በኃጢአት ወድቆ ሙት በመሆን የጠፋ ሲሆን የሰውን ዘር ከኃጢአት ለማዳን በመስቀል ላይ ሞቶ በሦስተኛው ቀን ከሙታን በተነሳው በኢየሱስ ክርስቶስ ብቻ በማመን በመንፈስ ቅዱስ አማካኝነት ዳግመኛ ተወልዶ የዘላለም ሕይወት እንደሚያገኝ እናምናለን።",
      references: "ዘፍ. ፩፥፳፮፤ ፫፥፩-፳፩፤ ሮሜ ፭፥፮-፲፬፤ ሐዋ. ፬፥፲፪፤ ዮሐ. ፫፥፭-፮፤ ፫፥፲፬-፲፰",
    },
    english: {
      title: "Humanity",
      body: "We believe that humanity was created in the image of God, fell into sin, and became lost, dead in sin; and that only by believing in Jesus Christ — who died on the cross to save the human race from sin and rose from the dead on the third day — is a person born again through the Holy Spirit and receives eternal life.",
      references: "Gen. 1:26; 3:1–21; Rom. 5:6–14; Acts 4:12; John 3:5–6; 3:14–18",
    },
  },
  {
    number: "4",
    amharic: {
      title: "ደህንነት",
      body:
        "ሰው ከፈጣሪው ጋር ለመታረቅ፣ ከኃጢአትና ከዘላለም ኩነኔ ለመዳን የሚችለው ስለ ሰው ልጆች ኃጢአት በቀራንዮ መስቀል ላይ ተሰቅሎ ሞቶ በሦስተኛው ቀን ከሙታን በተነሳው በጌታችንና በመድኃኒታችን በኢየሱስ ክርስቶስ በማመን ብቻ እንደሆነ፣ ይህም ደህንነት ፍጹም ነፃ የሆነ የእግዚአብሔር የጸጋ ስጦታ መሆኑን፣ የወንጌልን የምስራች የሰሙትም በንስሐና በእምነት ክርስቶስ ኢየሱስን ሲቀበሉት በመንፈስ ቅዱስ አማካኝነት ዳግመኛ በመወለድ የእግዚአብሔር ልጆች ሆነው የዘላለም ሕይወት እንደሚወርሱ እናምናለን።",
      references: "ቆላ. ፩፥፳፤ ፩ኛ ጢሞ. ፪፥፭-፮፤ ሮሜ ፫፥፳-፳፮፤ ፭፥፮-፲፩፤ ፮፥፳፫፤ ኤፌ. ፩፥፫-፲፬፤ ፪፥፰-፱፤ ዕብ. ፱፥፳፭-፳፰፤ ዮሐ. ፩፥፲፪-፲፫፤ ፫፥፫-፲፰፤ ቲቶ ፫፥፭-፯",
    },
    english: {
      title: "Salvation",
      body: "We believe that a person can be reconciled to their Creator and saved from sin and eternal condemnation only by believing in our Lord and Savior Jesus Christ, who was crucified and died on the cross at Calvary for the sins of humanity and rose from the dead on the third day; that this salvation is the entirely free gift of God's grace; and that those who hear the good news of the gospel and receive Christ Jesus in repentance and faith are born again through the Holy Spirit, become children of God, and inherit eternal life.",
      references: "Col. 1:20; 1 Tim. 2:5–6; Rom. 3:20–26; 5:6–11; 6:23; Eph. 1:3–14; 2:8–9; Heb. 9:25–28; John 1:12–13; 3:3–18; Titus 3:5–7",
    },
  },
  {
    number: "5",
    amharic: {
      title: "ቅዱስ ሥርዓቶች",
      body:
        "ጌታችንና መድኃኒታችን ኢየሱስ ክርስቶስ ለደቀመዛሙርቱ ይጠብቁትና ያደርጉት ዘንድ በሰጣቸው ቅዱስ ሥርዓቶች እናምናለን። እነርሱም፥",
      references: "",
    },
    english: {
      title: "The Ordinances",
      body: "We believe in the holy ordinances that our Lord and Savior Jesus Christ gave His disciples to keep and to practice. They are:",
    },
    subSections: [
      {
        number: "5.1",
        amharic: {
          title: "የውኃ ጥምቀት",
          body:
            "የውኃ ጥምቀት ሰው ደህንነትን የሚያገኝበት ሥርዓት ሳይሆን በክርስቶስ ኢየሱስ አምነው የዳኑ በግል ወሳኔያቸው የሚፈጽሙት እንደሆነና ይህም ጌታን በማመን ያገኙትን ደህንነት በሚታይ ሁኔታ ለመመስከር የሚፈጸም ሥርዓት እንደሆነ እናምናለን።",
          references: "ማቴ. ፳፰፥፲፱፤ ሮሜ ፮፥፩-፬፤ ሐዋ. ፰፥፴፮-፴፱",
        },
        english: {
          title: "Water Baptism",
          body: "We believe that water baptism is not an ordinance by which a person obtains salvation, but one carried out by the personal decision of those who have believed in Christ Jesus and been saved, as a visible testimony to the salvation they received by believing in the Lord.",
          references: "Matt. 28:19; Rom. 6:1–4; Acts 8:36–39",
        },
      },
      {
        number: "5.2",
        amharic: {
          title: "የጌታ እራት",
          body:
            "ጌታ ኢየሱስ አልፎ በተሰጠበት በዚያች ዕለት መሥዋዕት አድርጎ ላቀረበው ሥጋውና ለኃጢአታችን ላፈሰሰው ደሙ መታሰቢያ ይሆን ዘንድ እንደ ሰጠና ይህም የደህንነት ማግኛ ሳይሆን የጌታ መታሰቢያ ብቻ እንደሆነ እናምናለን።",
          references: "ሉቃ. ፳፪፥፲፬-፳፤ ፩ኛ ቆሮ. ፲፫፥፳፫-፴፪፤ ሐዋ. ፪፥፵፪",
        },
        english: {
          title: "The Lord's Supper",
          body: "We believe that on the night He was betrayed the Lord Jesus gave the Supper as a memorial of His body, which He offered as a sacrifice, and of His blood, which He shed for our sins; and that it is not a means of obtaining salvation but a memorial of the Lord alone.",
          references: "Luke 22:14–20; 1 Cor. 13:23–32; Acts 2:42",
        },
      },
    ],
  },
  {
    number: "6",
    amharic: {
      title: "ቤተ ክርስቲያን",
      body: "",
      references: "",
    },
    english: {
      title: "The Church",
      body: "",
    },
    subSections: [
      {
        number: "6.1",
        amharic: {
          title: "ዓለም አቀፍ ቤተ ክርስቲያን",
          body:
            "ኢየሱስ ክርስቶስ በመሠረታትና ራስ በሆነላት አምነው ያንቀላፉትን አሁንም በጌታ ያሉትንና እንዲሁም ወደፊት ጌታን በመቀበል የሚድኑትን ሁሉ ባቀፈች ለሰው ዓይን በማትታየው አንዲት ዓለም አቀፍ ቤተ ክርስቲያን እናምናለን።",
          references: "ኤፌ. ፩፥፳፪-፳፫፤ ቆላ. ፩፥፲፰፤ ራዕ. ፲፱፥፯-፰",
        },
        english: {
          title: "The Universal Church",
          body: "We believe in one universal church, invisible to human eyes, founded by Jesus Christ and having Him as its head, which embraces all who believed and have fallen asleep, all who are now in the Lord, and all who will yet be saved by receiving the Lord.",
          references: "Eph. 1:22–23; Col. 1:18; Rev. 19:7–8",
        },
      },
      {
        number: "6.2",
        amharic: {
          title: "አጥቢያ ቤተ ክርስቲያን",
          body:
            "ጌታ ኢየሱስን እንደ ግል አዳኛቸው አድርገው በመቀበልና ንስሐ በመግባት ዳግመኛ ተወልደው መንፈስ ቅዱስ የጌታ አካል ያደረጋቸውና ቃሉን በመታዘዝ እራሳቸውን ለጌታ አስገዝተው የሚኖሩ ምዕመናን ባሉባት በአንዲት አጥቢያ ቤተ ክርስቲያን እናምናለን።",
          references: "፩ኛ ቆሮ. ፲፪፥፲፪-፳፫፤ ገላ. ፫፥፳፮፤ ኤፌ. ፭፥፳፫-፳፮፤ ፩ኛ ጴጥ. ፪፥፱-፲",
        },
        english: {
          title: "The Local Church",
          body: "We believe in the local church, made up of believers who have received the Lord Jesus as their personal Savior, repented and been born again; whom the Holy Spirit has made members of the body of the Lord; and who live in submission to the Lord in obedience to His Word.",
          references: "1 Cor. 12:12–23; Gal. 3:26; Eph. 5:23–26; 1 Pet. 2:9–10",
        },
      },
    ],
  },
  {
    number: "7",
    amharic: {
      title: "ኢየሱስ ክርስቶስ የቤተ ክርስቲያን ራስ",
      body:
        "ኢየሱስ ክርስቶስ የእያንዳንዷ አጥቢያ ቤተ ክርስቲያን ራስ በመሆኑ ቤተ ክርስቲያን በክርስቶስ ራሷን የመምራትና የማስተዳደር ሥልጣንና መብት እንዳላት እናምናለን።",
      references: "ኤፌ. ፩፥፳፪፤ ቆላ. ፩፥፲፰",
    },
    english: {
      title: "Jesus Christ, Head of the Church",
      body: "We believe that because Jesus Christ is the head of every local church, the church has the authority and the right to lead and govern itself in Christ.",
      references: "Eph. 1:22; Col. 1:18",
    },
  },
  {
    number: "8",
    amharic: {
      title: "የክርስቶስ ዳግመኛ ምጽአት",
      body:
        "ጌታችን ኢየሱስ ክርስቶስ ከሺህ ዓመት መንግሥቱ በፊት ዳግመኛ በክብር እንደሚመለስ የርሱ የሆኑትንም በክብር ወደ ራሱ የሚሰበስብበት የአማኞች ታላቅ ተስፋ በመሆኑ ቤተ ክርስቲያን ነቅታ በቅድስና የምትጠብቀው እንደሆነ እናምናለን።",
      references: "ሐዋ. ፩፥፲፩፤ ፩ኛ ቆሮ. ፲፭፥፶፩-፶፪፤ ቲቶ ፪፥፲፫-፲፬፤ ፩ኛ ተሰ. ፬፥፲፮-፲፰",
    },
    english: {
      title: "The Second Coming of Christ",
      body: "We believe that our Lord Jesus Christ will return again in glory before His thousand-year reign; that His gathering of those who are His to Himself in glory is the great hope of believers; and that the church therefore watches for it, awake and in holiness.",
      references: "Acts 1:11; 1 Cor. 15:51–52; Titus 2:13–14; 1 Thess. 4:16–18",
    },
  },
  {
    number: "9",
    amharic: {
      title: "ትንሣኤ ሙታን",
      body:
        "ኢየሱስ ክርስቶስ በማይሞትና በከበረ አካል ከሙታን ተለይቶ በመነሳቱ በተገኘው ትልቅ ተስፋ በጌታ ያንቀላፉት በክብርና በማይጠፋ አካል እንደሚነሱና ኃጢአተኞችም በአካል ትንሣኤ ወደ ዘላለም ፍርድ ቅጣት እንደሚሄዱ እናምናለን።",
      references: "ዳን. ፲፪፥፪፤ ሐዋ. ፭፥፳፰-፳፱፤ ዮሐ. ፳፥፳፬-፳፱፤ ፩ኛ ቆሮ. ፲፭፥፳-፳፫፤ ፲፭፥፵፪-፵፬፤ ፲፭፥፶፩-፶፬",
    },
    english: {
      title: "The Resurrection of the Dead",
      body: "We believe that, in the great hope secured by Jesus Christ's rising from the dead in an immortal and glorified body, those who have fallen asleep in the Lord will be raised in glory with imperishable bodies, and that sinners will be raised bodily to eternal judgment and punishment.",
      references: "Dan. 12:2; Acts 5:28–29; John 20:24–29; 1 Cor. 15:20–23; 15:42–44; 15:51–54",
    },
  },
];
