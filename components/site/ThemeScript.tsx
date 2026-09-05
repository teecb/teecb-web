import Script from "next/script";

/**
 * Sets html[data-theme] before first paint so there is no flash. Reads the
 * saved choice, else follows the system preference. <ThemeToggle> re-applies
 * the same logic after hydration. Rendered once in the root layout.
 */
export function ThemeScript() {
  const code = `(function(){try{var k='teecb-theme',s=localStorage.getItem(k),m=window.matchMedia('(prefers-color-scheme: dark)');document.documentElement.setAttribute('data-theme',s||(m.matches?'dark':'light'))}catch(e){}})();`;
  // The App Router allows beforeInteractive in the root layout; the lint rule predates it.
  // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
  return <Script id="teecb-theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: code }} />;
}
