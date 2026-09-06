import type { HomePage } from "./types";

/** Fallback home-page copy. REVIEW: replace with the church's own words. */
export const home: HomePage = {
  hero: {
    eyebrow: { en: "Welcome home", am: "እንኳን ወደ ቤትዎ በደህና መጡ" },
    heading: { en: "Worship with us in Boston, in the language of", am: "በቦስተን፣ በቤታችን ቋንቋ" },
    emphasis: { en: "home.", am: "አብረን እናምልክ።" },
    body: {
      en: "An Ethiopian evangelical community in Boston, learning to follow Jesus together — across generations and languages. Come as you are; you're welcome here.",
      am: "በቦስተን የሚገኝ የኢትዮጵያ ወንጌላዊ ማኅበረሰብ፤ በትውልዶችና በቋንቋዎች መካከል ኢየሱስን አብረን ለመከተል የምንማር። እንዳሉ ይምጡ፤ እዚህ እንኳን ደህና መጡ።",
    },
    primaryCta: { label: { en: "Plan a visit", am: "ጉብኝት ያቅዱ" }, href: "/visit" },
    secondaryCta: { label: { en: "Latest sermons", am: "የቅርብ ስብከቶች" }, href: "/sermons" },
  },
  verse: {
    text: {
      en: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness.",
      am: "የእግዚአብሔር ምሕረት ከቶ አያልቅም፤ ርኅራኄውም ከቶ አይጠፋም። በየማለዳው አዲስ ነው፤ ታማኝነትህ ታላቅ ነው።",
    },
    reference: { en: "Lamentations 3:22–23", am: "ሰቆቃወ ኤርምያስ 3፥22–23" },
  },
  welcome: {
    eyebrow: { en: "Who we are", am: "እኛ ማን ነን" },
    heading: {
      en: "Rooted in Scripture, gathered across cultures.",
      am: "በቅዱስ ቃሉ ላይ የተመሠረትን፣ ከተለያዩ ባህሎች የተሰበሰብን።",
    },
    body: {
      en: "Our Sunday service is held in Amharic, and our youth gather in English, so every generation has a place to worship and grow. We believe the good news of Jesus is for everyone, and we want our church to feel like home — for lifelong believers and first-time visitors alike.",
      am: "የእሁድ አገልግሎታችን በአማርኛ ይካሄዳል፤ ወጣቶቻችን ደግሞ በእንግሊዝኛ ይሰበሰባሉ፤ እያንዳንዱ ትውልድ የሚያመልክበትና የሚያድግበት ቦታ አለው። የኢየሱስ ወንጌል ለሁሉም እንደሆነ እናምናለን፤ ቤተ ክርስቲያናችን ለረጅም ጊዜ አማኞችም ሆነ ለመጀመሪያ ጊዜ ለሚመጡ እንደ ቤት እንዲሰማቸው እንፈልጋለን።",
    },
    cta: { label: { en: "More about us", am: "ስለ እኛ ተጨማሪ" }, href: "/about" },
  },
  cta: {
    heading: { en: "New here? We'd love to meet you.", am: "አዲስ ነዎት? ልናገኝዎ እንወዳለን።" },
    body: {
      en: "Let us know you're coming and we'll help you find your way — from parking to kids' ministry to a friendly face at the door.",
      am: "እንደሚመጡ ይንገሩን፤ ከመኪና ማቆሚያ እስከ ልጆች አገልግሎት እና በበሩ ላይ እስከሚቀበልዎ ወዳጅ ድረስ መንገድዎን እንድናገኝ እንረዳዎታለን።",
    },
    button: { label: { en: "Plan your visit", am: "ጉብኝትዎን ያቅዱ" }, href: "/visit" },
  },
};
