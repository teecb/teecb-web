import type { StaffMember } from "./types";

/** Fallback leadership list. REVIEW: replace with real names, roles, bios, photos. */
export const staff: StaffMember[] = [
  {
    slug: "lead-pastor",
    name: "Pastor Placeholder",
    role: { en: "Lead Pastor", am: "ዋና መጋቢ" },
    bio: {
      en: "A short introduction to the pastor's story, calling, and heart for the church and the city. Two or three warm sentences work best.",
      am: "ስለ መጋቢው ታሪክ፣ ጥሪና ለቤተ ክርስቲያኑና ለከተማው ያለው ልብ አጭር መግቢያ።",
    },
  },
  {
    slug: "associate-pastor",
    name: "Associate Placeholder",
    role: { en: "Associate Pastor", am: "ረዳት መጋቢ" },
    bio: {
      en: "The church will provide the real text. Keep it personal so visitors feel they are meeting a real person.",
      am: "ቤተ ክርስቲያኑ ትክክለኛውን ጽሑፍ ያቀርባል።",
    },
  },
  {
    slug: "worship-leader",
    name: "Worship Placeholder",
    role: { en: "Worship Leader", am: "የአምልኮ መሪ" },
    bio: {
      en: "A sentence or two on their role in leading the congregation in worship each week.",
      am: "በየሳምንቱ ጉባኤውን በአምልኮ ስለመምራት ሚናቸው አንድ ወይም ሁለት ዓረፍተ ነገር።",
    },
  },
  {
    slug: "youth-director",
    name: "Youth Placeholder",
    role: { en: "Youth Director", am: "የወጣቶች ዳይሬክተር" },
    bio: {
      en: "Introduce the person who leads the next generation of the church.",
      am: "የቤተ ክርስቲያኑን ቀጣይ ትውልድ የሚመራውን ሰው ያስተዋውቁ።",
    },
  },
];
