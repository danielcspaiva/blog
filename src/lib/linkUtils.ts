/**
 * Generates an HTML string for an inline link with consistent styling
 * 
 * @param href - The URL to link to
 * @param text - The text content of the link
 * @param external - Whether the link should open in a new tab
 * @returns HTML string for the link
 */
function createInlineLink(href: string, text: string, external: boolean = false): string {
  const className = "underline decoration-black/30 underline-offset-[3px] transition-colors duration-300 ease-in-out hover:text-black hover:decoration-black/50 focus-visible:text-black focus-visible:decoration-black/50 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50 dark:focus-visible:text-white dark:focus-visible:decoration-white/50";
  
  return `<a href="${href}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''} class="${className}">${text}</a>`;
}

/**
 * Creates a collection of links for common sites with consistent styling
 * 
 * @param locale - The current locale (e.g., 'en' or 'pt-br')
 * @returns An object with methods to create links to common sites
 */
export function createCommonLinks(locale: string) {
  return {
    /**
     * Creates a link to Qavi
     */
    qavi: (text: string = 'Qavi') => 
      createInlineLink('https://quartoavista.com.br', text, true),
    
    /**
     * Creates a link to TC
     */
    tc: (text: string = 'TC') => 
      createInlineLink('https://tc.com.br', text, true),
    
    /**
     * Creates a link to UFRN
     */
    ufrn: (text: string = 'UFRN') => 
      createInlineLink('https://www.ufrn.br/', text, true),
    
    /**
     * Creates a link to UIUC
     */
    uiuc: (text: string = 'UIUC') => 
      createInlineLink('https://illinois.edu/', text, true),
    
    /**
     * Creates a link to Ironhack
     */
    ironhack: (text: string = 'Ironhack') => 
      createInlineLink('https://www.ironhack.com/', text, true),
    
    /**
     * Creates a link to the experience page
     */
    experience: (text: string) => 
      createInlineLink(`/${locale}/experience`, text),
      
    /**
     * Creates a generic link to any URL
     */
    to: (href: string, text: string, external: boolean = false) => 
      createInlineLink(href, text, external),
  };
} 