import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  
  // Special case for the home page
  if (pathname === '/') return '/';
  
  const segments = pathname.split('/');
  
  // Check if the first segment is a language code
  if (segments[1] in ui) {
    // Remove the language code segment and join the rest
    return '/' + segments.slice(2).join('/');
  }
  
  return pathname;
}

export function getLocalizedRoute(route: string, lang: keyof typeof ui): string {
  // Special case for the home page
  if (route === '/') {
    return `/${lang}`;
  }
  
  // For other routes, always include the locale
  return `/${lang}${route}`;
} 