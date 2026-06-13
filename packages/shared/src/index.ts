export type SupportedLanguageCode = 'fr' | 'en' | 'zh';

export type ThemePreference = 'light' | 'dark';

export type LearningMode = 'campaign' | 'daily' | 'diagnostic';

export interface SupportedLanguage {
	code: SupportedLanguageCode;
	label: string;
	nativeLabel: string;
}

export const supportedLanguages: readonly SupportedLanguage[] = [
	{
		code: 'fr',
		label: 'Francais',
		nativeLabel: 'Francais'
	},
	{
		code: 'en',
		label: 'Anglais',
		nativeLabel: 'English'
	},
	{
		code: 'zh',
		label: 'Chinois',
		nativeLabel: '中文'
	}
] as const;

export interface PreviewProgress {
	xp: number;
	level: number;
	streakDays: number;
}
