/**
 * Generates an HTML string for an inline link with consistent styling.
 * Used with dangerouslySetInnerHTML for locale-interpolated bio/experience copy.
 */
function createInlineLink(
  href: string,
  text: string,
  external: boolean = false,
): string {
  const className = "link";

  return `<a href="${href}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ""} class="${className}">${text}</a>`;
}

export function createCommonLinks(locale: string) {
  // 'en' is unprefixed in the new site; only pt-br carries a prefix.
  const experienceHref =
    locale === "en" ? "/experience" : `/${locale}/experience`;

  return {
    qavi: (text: string = "Qavi") =>
      createInlineLink("https://quartoavista.com.br", text, true),
    tc: (text: string = "TC") =>
      createInlineLink("https://tc.com.br", text, true),
    ufrn: (text: string = "UFRN") =>
      createInlineLink("https://www.ufrn.br/", text, true),
    uiuc: (text: string = "UIUC") =>
      createInlineLink("https://illinois.edu/", text, true),
    ironhack: (text: string = "Ironhack") =>
      createInlineLink("https://www.ironhack.com/", text, true),
    experience: (text: string) => createInlineLink(experienceHref, text),
    to: (href: string, text: string, external: boolean = false) =>
      createInlineLink(href, text, external),
  };
}
