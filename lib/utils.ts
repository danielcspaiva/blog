import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale: string = 'en') {
  const d = typeof date === 'string' ? new Date(date) : date;
  return Intl.DateTimeFormat(locale === 'pt-br' ? 'pt-BR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function formatDateShort(date: Date | string, locale: string = 'en') {
  const d = typeof date === 'string' ? new Date(date) : date;
  return Intl.DateTimeFormat(locale === 'pt-br' ? 'pt-BR' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}
