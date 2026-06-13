export type SupportedLanguageCode = 'fr' | 'en' | 'zh';

export type ThemePreference = 'light' | 'dark';

export type LearningMode = 'campaign' | 'daily' | 'diagnostic';

export interface SupportedLanguage {
	code: SupportedLanguageCode;
	label: string;
	nativeLabel: string;
	flag: string;
}

export const supportedLanguages: readonly SupportedLanguage[] = [
	{
		code: 'fr',
		label: 'Français',
		nativeLabel: 'Français',
		flag: '🇫🇷'
	},
	{
		code: 'en',
		label: 'Anglais',
		nativeLabel: 'English',
		flag: '🇬🇧'
	},
	{
		code: 'zh',
		label: 'Chinois',
		nativeLabel: '中文',
		flag: '🇨🇳'
	}
] as const;

export function getSupportedLanguage(code: SupportedLanguageCode) {
	return supportedLanguages.find((language) => language.code === code) ?? supportedLanguages[0];
}

export interface PreviewProgress {
	xp: number;
	streakDays: number;
}

export interface GuestProfile {
	id: string;
	mode: 'guest';
	firstName: string;
	nativeLanguage: SupportedLanguageCode;
	targetLanguage: SupportedLanguageCode;
	progress: PreviewProgress;
	createdAt: string;
	onboardingCompletedAt: string;
}
