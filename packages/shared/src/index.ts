export type SupportedLanguageCode = 'fr' | 'en' | 'zh';

export type ThemePreference = 'light' | 'dark';

export type LearningMode = 'campaign' | 'daily' | 'diagnostic';

export type OpenPeepCharacterId =
	| 'open-peep-bust-1'
	| 'open-peep-bust-8'
	| 'open-peep-bust-29'
	| 'open-peep-bust-45'
	| 'open-peep-bust-76'
	| 'open-peep-bust-103';

export const openPeepCharacterIds: readonly OpenPeepCharacterId[] = [
	'open-peep-bust-1',
	'open-peep-bust-8',
	'open-peep-bust-29',
	'open-peep-bust-45',
	'open-peep-bust-76',
	'open-peep-bust-103'
] as const;

export const defaultOpenPeepCharacterId: OpenPeepCharacterId = 'open-peep-bust-8';

export function isOpenPeepCharacterId(value: unknown): value is OpenPeepCharacterId {
	return typeof value === 'string' && openPeepCharacterIds.includes(value as OpenPeepCharacterId);
}

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
	characterId: OpenPeepCharacterId;
	progress: PreviewProgress;
	createdAt: string;
	onboardingCompletedAt: string;
}
