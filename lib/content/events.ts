import type { ChurchEvent } from "./types";

/**
 * Fallback events. Dates are ISO 8601 with the Boston offset so they render
 * correctly in every visitor's time zone. REVIEW: replace with the real calendar.
 */
export const events: ChurchEvent[] = [
  {
    slug: "community-lunch",
    title: { en: "Community Lunch", am: "የማኅበረሰብ ምሳ" },
    startsAt: "2026-09-13T12:30:00-04:00",
    endsAt: "2026-09-13T14:00:00-04:00",
    location: { en: "Fellowship Hall", am: "የኅብረት አዳራሽ" },
    summary: {
      en: "Bring a dish to share and stay after the service for food and fellowship. Everyone is welcome.",
      am: "የሚጋራ ምግብ ይዘው ይምጡና ከአገልግሎቱ በኋላ ለምግብና ለኅብረት ይቆዩ። ሁሉም እንኳን ደህና መጡ።",
    },
  },
  {
    slug: "youth-night",
    title: { en: "Youth Night", am: "የወጣቶች ምሽት" },
    startsAt: "2026-09-18T18:30:00-04:00",
    endsAt: "2026-09-18T20:30:00-04:00",
    location: { en: "Youth Room", am: "የወጣቶች ክፍል" },
    summary: {
      en: "A night for students to gather, play, and grow together in faith and friendship.",
      am: "ተማሪዎች ተሰብስበው የሚጫወቱበትና በእምነትና በወዳጅነት አብረው የሚያድጉበት ምሽት።",
    },
  },
  {
    slug: "meskel-celebration",
    title: { en: "Meskel Celebration", am: "የመስቀል በዓል" },
    startsAt: "2026-09-27T16:00:00-04:00",
    endsAt: "2026-09-27T19:00:00-04:00",
    location: { en: "Main Sanctuary & courtyard", am: "ዋናው መቅደስና ግቢ" },
    summary: {
      en: "An evening of worship, song, and a shared meal as we remember the finding of the True Cross.",
      am: "የእውነተኛው መስቀል መገኘት በምናስብበት ወቅት የአምልኮ፣ የመዝሙርና የጋራ ማዕድ ምሽት።",
    },
  },
  {
    slug: "baptism-sunday",
    title: { en: "Baptism Sunday", am: "የጥምቀት እሁድ" },
    startsAt: "2026-10-11T10:00:00-04:00",
    endsAt: "2026-10-11T12:00:00-04:00",
    location: { en: "Main Sanctuary", am: "ዋናው መቅደስ" },
    summary: {
      en: "Celebrating new steps of faith in our community. Talk to a pastor if you would like to be baptized.",
      am: "በማኅበረሰባችን ውስጥ አዲስ የእምነት እርምጃዎችን እናከብራለን። መጠመቅ ከፈለጉ ከመጋቢ ጋር ይነጋገሩ።",
    },
  },
];
