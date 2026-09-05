import { paragraphs } from "./portable";
import type { AboutPage } from "./types";

/** Fallback About-page copy. REVIEW: replace with the church's real story. */
export const about: AboutPage = {
  intro: {
    en: "We are an Ethiopian evangelical church in the heart of Boston — a family of many generations, gathered around Jesus and the Scriptures.",
    am: "በቦስተን እምብርት የምንገኝ የኢትዮጵያ ወንጌላዊት ቤተ ክርስቲያን ነን — በኢየሱስና በቅዱሳት መጻሕፍት ዙሪያ የተሰበሰበ የብዙ ትውልድ ቤተሰብ።",
  },
  story: {
    en: paragraphs(
      "Tremont Ethiopian Evangelical Church began as a small group of families who wanted to worship God in their own language while raising children who would call Boston home. Over the years that circle has grown into a congregation that gathers every Sunday to worship in Amharic, with a youth ministry that meets in English.",
      "We hold to the historic evangelical faith: the Bible as God's word, salvation by grace through faith in Jesus Christ, and the call to love God and our neighbors. Our life together is shaped by worship, prayer, teaching, and hospitality.",
      "Whether you grew up in the church or have never stepped inside one, you are welcome here. Come and see.",
    ),
    am: paragraphs(
      "ትሬሞንት የኢትዮጵያ ወንጌላዊት ቤተ ክርስቲያን፣ በራሳቸው ቋንቋ እግዚአብሔርን ማምለክ የፈለጉና ልጆቻቸውን በቦስተን የሚያሳድጉ ጥቂት ቤተሰቦች በአንድነት በመሰብሰብ ተጀመረች። በዓመታት ውስጥ ያ ክበብ በየእሁዱ በአማርኛ የሚያመልክ ጉባኤ ሆኗል፤ ወጣቶችም በእንግሊዝኛ ይሰበሰባሉ።",
      "ታሪካዊውን ወንጌላዊ እምነት እንይዛለን፦ መጽሐፍ ቅዱስ የእግዚአብሔር ቃል መሆኑን፣ በኢየሱስ ክርስቶስ በማመን በጸጋ መዳንን፣ እንዲሁም እግዚአብሔርንና ባልንጀራችንን የመውደድ ጥሪን። አብረን የምንኖረው ሕይወት በአምልኮ፣ በጸሎት፣ በትምህርትና በእንግዳ ተቀባይነት ይቀረጻል።",
      "በቤተ ክርስቲያን ውስጥ ያደጉም ሆኑ ገና ወደ ውስጥ የማይገቡ፣ እዚህ እንኳን ደህና መጡ። መጥተው ይመልከቱ።",
    ),
  },
  values: [
    {
      title: { en: "Scripture", am: "ቅዱስ ቃል" },
      body: {
        en: "The Bible is our authority and our daily bread. We teach it clearly and try to live it honestly.",
        am: "መጽሐፍ ቅዱስ ሥልጣናችንና የዕለት እንጀራችን ነው። በግልጽ እናስተምረዋለን፤ በታማኝነት ልንኖረው እንጥራለን።",
      },
    },
    {
      title: { en: "Prayer", am: "ጸሎት" },
      body: {
        en: "We depend on God. Prayer is not a program here — it is how the church breathes.",
        am: "በእግዚአብሔር ላይ እንደገፋለን። ጸሎት እዚህ ፕሮግራም አይደለም — ቤተ ክርስቲያኗ የምትተነፍስበት መንገድ ነው።",
      },
    },
    {
      title: { en: "Family", am: "ቤተሰብ" },
      body: {
        en: "Grandparents, parents, and children belong here together — one people across generations.",
        am: "አያቶች፣ ወላጆችና ልጆች አብረው የሚኖሩበት ቤት — በትውልዶች መካከል አንድ ሕዝብ።",
      },
    },
    {
      title: { en: "Hospitality", am: "እንግዳ ተቀባይነት" },
      body: {
        en: "Every guest is a gift. Expect to be greeted, fed, and remembered.",
        am: "እያንዳንዱ እንግዳ ስጦታ ነው። እንደሚቀበሉ፣ እንደሚመገቡና እንደሚታወሱ ይጠብቁ።",
      },
    },
  ],
};
