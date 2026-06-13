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

export type OpenPeepPostureMode = 'bust' | 'standing' | 'sitting';

export interface OpenPeepCustomizationColors {
	skin: string;
	hair: string;
	outfit: string;
	accessory: string;
	ink: string;
}

export interface OpenPeepCustomization {
	bodyId: string;
	headId: string;
	faceId: string;
	facialHairId: string;
	accessoryId: string;
	postureMode: OpenPeepPostureMode;
	standingPoseId: string;
	sittingPoseId: string;
	colors: OpenPeepCustomizationColors;
}

export const defaultOpenPeepCustomization: OpenPeepCustomization = {
	bodyId: 'Tee 1',
	headId: 'Bun 2',
	faceId: 'Smile',
	facialHairId: '_ None',
	accessoryId: '_ None',
	postureMode: 'bust',
	standingPoseId: 'crossed_arms-1',
	sittingPoseId: 'crossed_legs',
	colors: {
		skin: '#F2C7A5',
		hair: '#1F2937',
		outfit: '#2563EB',
		accessory: '#111827',
		ink: '#111827'
	}
};

export const openPeepPostureModes: readonly OpenPeepPostureMode[] = ['bust', 'standing', 'sitting'] as const;

export function isOpenPeepPostureMode(value: unknown): value is OpenPeepPostureMode {
	return typeof value === 'string' && openPeepPostureModes.includes(value as OpenPeepPostureMode);
}

export function isHexColor(value: unknown): value is string {
	return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
}

export function isOpenPeepCustomization(value: unknown): value is OpenPeepCustomization {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const customization = value as Partial<OpenPeepCustomization>;
	const colors = customization.colors as Partial<OpenPeepCustomizationColors> | undefined;

	return (
		typeof customization.bodyId === 'string'
		&& customization.bodyId.length > 0
		&& typeof customization.headId === 'string'
		&& customization.headId.length > 0
		&& typeof customization.faceId === 'string'
		&& customization.faceId.length > 0
		&& typeof customization.facialHairId === 'string'
		&& customization.facialHairId.length > 0
		&& typeof customization.accessoryId === 'string'
		&& customization.accessoryId.length > 0
		&& isOpenPeepPostureMode(customization.postureMode)
		&& typeof customization.standingPoseId === 'string'
		&& customization.standingPoseId.length > 0
		&& typeof customization.sittingPoseId === 'string'
		&& customization.sittingPoseId.length > 0
		&& Boolean(colors)
		&& isHexColor(colors?.skin)
		&& isHexColor(colors?.hair)
		&& isHexColor(colors?.outfit)
		&& isHexColor(colors?.accessory)
		&& isHexColor(colors?.ink)
	);
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
	characterCustomization?: OpenPeepCustomization;
	progress: PreviewProgress;
	createdAt: string;
	onboardingCompletedAt: string;
}
