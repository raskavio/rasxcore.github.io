import { en } from './en';
import { ru } from './ru';

export type Lang = 'ru' | 'en';
export type TranslationKey = keyof typeof ru;

export const translations = { ru, en } as const;

export function t(lang: Lang, key: TranslationKey): string {
	return translations[lang][key];
}

export const defaultLang: Lang = 'ru';
