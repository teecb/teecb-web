import type { SiteSettings } from "./types";

/**
 * Fallback site settings, used until the matching Sanity document exists.
 * REVIEW: address and hours come from the church's (unclaimed) Yelp listing —
 * confirm with the church. Phone, email, socials and giving details are placeholders.
 */
export const site: SiteSettings = {
  name: {
    en: "Tremont Ethiopian Evangelical Church in Boston",
    am: "ትሬሞንት የኢትዮጵያ ወንጌላዊት ቤተ ክርስቲያን በቦስተን",
  },
  shortName: { en: "Tremont Church", am: "ትሬሞንት ቤተ ክርስቲያን" },
  wordmark: {
    line1: { en: "Tremont Ethiopian", am: "ትሬሞንት የኢትዮጵያ" },
    line2: { en: "Evangelical Church · Boston", am: "ወንጌላዊት ቤተ ክርስቲያን · ቦስተን" },
  },
  tagline: {
    en: "An Ethiopian evangelical community in Boston, learning to follow Jesus together.",
    am: "በቦስተን የሚገኝ የኢትዮጵያ ወንጌላዊ ማኅበረሰብ፤ ኢየሱስን አብረን ለመከተል የምንማር።",
  },
  description: {
    en: "Tremont Ethiopian Evangelical Church — an Amharic-speaking community in Boston, with a youth ministry in English. Join us Sundays at 10:00 AM, in person or online.",
    am: "ትሬሞንት የኢትዮጵያ ወንጌላዊት ቤተ ክርስቲያን — በቦስተን የሚገኝ በአማርኛ የሚያመልክ ማኅበረሰብ። እሁድ ጥዋት 10:00 በአካል ወይም በመስመር ላይ ይቀላቀሉን።",
  },
  timeZone: "America/New_York",
  address: {
    line1: "88 Tremont St",
    city: "Boston",
    region: "MA",
    postalCode: "02108",
    country: "US",
    parkingNote: {
      en: "Street parking is free on Sundays. A public garage is a short walk away.",
      am: "እሁድ የመንገድ ላይ የመኪና ማቆሚያ ነጻ ነው። የሕዝብ ጋራዥ በእግር ጥቂት ደቂቃ ርቀት ላይ ይገኛል።",
    },
  },
  contact: {
    email: "hello@teecb.org",
    phone: "(617) 555-0100",
  },
  services: [
    {
      name: { en: "Sunday Worship", am: "የእሁድ አምልኮ" },
      dayOfWeek: 0,
      startTime: "10:00",
      durationMinutes: 150,
      note: { en: "In Amharic", am: "በአማርኛ" },
      isPrimary: true,
    },
    {
      name: { en: "Prayer Meeting", am: "የጸሎት ስብሰባ" },
      dayOfWeek: 3,
      startTime: "18:00",
      durationMinutes: 120,
    },
    // REVIEW: Friday Bible study is not in the Yelp hours — confirm it exists.
    {
      name: { en: "Bible Study", am: "የመጽሐፍ ቅዱስ ጥናት" },
      dayOfWeek: 5,
      startTime: "19:00",
      durationMinutes: 90,
    },
  ],
  socials: [
    { platform: "youtube", label: "YouTube", href: "https://www.youtube.com/@teecb" },
    { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
    { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  ],
  youtube: {
    channelUrl: "https://www.youtube.com/@teecb",
  },
  watch: {
    mode: "auto",
    liveStartTime: "10:30",
  },
  giving: {
    // REVIEW: add the Vanco Give+ URL and text-to-give number when available.
    onlineUrl: undefined,
    textNumber: undefined,
    textKeyword: undefined,
  },
  announcement: {
    label: { en: "This Sunday", am: "በዚህ እሁድ" },
    text: {
      en: "Join us in person for worship at 10:00 AM — the livestream begins at 10:30 AM. Everyone is welcome.",
      am: "እሁድ ጥዋት 10:00 በአካል ለአምልኮ ይቀላቀሉን — የቀጥታ ስርጭቱ 10:30 ላይ ይጀምራል። ሁሉም እንኳን ደህና መጡ።",
    },
    href: "/watch",
  },
};
