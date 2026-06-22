export type SupportedLanguageCode = 'fr' | 'en' | 'zh';

export type ThemePreference = 'light' | 'dark';

export type LearningMode = 'campaign' | 'daily' | 'diagnostic';

export interface XpMultiplierReward {
	type: 'xpMultiplier';
	multiplier: number;
}

export type LevelReward = XpMultiplierReward;

export type CampaignLevelState = 'locked' | 'available' | 'completed';

export type CampaignLevelReward = LevelReward;

export interface CampaignLevel {
	id: string;
	order: number;
	title: string;
	state: CampaignLevelState;
	reward?: CampaignLevelReward;
	openMojiHexcode?: string;
}

export type DailyLevelDifficultyTier = 'warmup' | 'standard' | 'challenge';

export type DailyLevelReward = LevelReward;

export interface DailyLevel {
	id: string;
	order: number;
	title: string;
	difficulty: DailyLevelDifficultyTier;
	targetCount: number;
	completedCount: number;
	rotationKey: string;
	reward?: DailyLevelReward;
	openMojiHexcode?: string;
}

export type ExerciseType =
	| 'multipleChoice'
	| 'fillBlank'
	| 'trueFalse'
	| 'readingComprehension'
	| 'matching'
	| 'imageChoice'
	| 'wordOrder';

export interface ExercisePronunciationHint {
	pinyin: string;
	meaning?: string;
}

export interface ExerciseOption {
	id: string;
	label: string;
	openMojiHexcode?: string;
	pronunciationHint?: ExercisePronunciationHint;
}

export interface ExerciseBase {
	id: string;
	type: ExerciseType;
	prompt: string;
	instruction?: string;
	potentialXp: number;
	openMojiHexcode?: string;
	pronunciationHint?: ExercisePronunciationHint;
}

export interface MultipleChoiceExercise extends ExerciseBase {
	type: 'multipleChoice';
	options: readonly ExerciseOption[];
	correctOptionId: string;
}

export interface FillBlankExercise extends ExerciseBase {
	type: 'fillBlank';
	acceptedAnswers: readonly string[];
	placeholder?: string;
}

export interface TrueFalseExercise extends ExerciseBase {
	type: 'trueFalse';
	statement: string;
	correctAnswer: boolean;
}

export interface ReadingComprehensionQuestion {
	id: string;
	prompt: string;
	options: readonly ExerciseOption[];
	correctOptionId: string;
	pronunciationHint?: ExercisePronunciationHint;
}

export interface ReadingComprehensionExercise extends ExerciseBase {
	type: 'readingComprehension';
	passageTitle?: string;
	passage: string;
	questions: readonly ReadingComprehensionQuestion[];
}

export interface ExerciseMatchItem {
	id: string;
	label: string;
	openMojiHexcode?: string;
	pronunciationHint?: ExercisePronunciationHint;
}

export interface ExerciseMatchPair {
	id: string;
	left: ExerciseMatchItem;
	right: ExerciseMatchItem;
}

export interface MatchingExercise extends ExerciseBase {
	type: 'matching';
	pairs: readonly ExerciseMatchPair[];
}

export interface ImageChoiceExercise extends ExerciseBase {
	type: 'imageChoice';
	imageOpenMojiHexcode: string;
	imageAlt: string;
	options: readonly ExerciseOption[];
	correctOptionId: string;
}

export interface WordOrderToken {
	id: string;
	label: string;
	pronunciationHint?: ExercisePronunciationHint;
}

export interface WordOrderExercise extends ExerciseBase {
	type: 'wordOrder';
	tokens: readonly WordOrderToken[];
	correctTokenIds: readonly string[];
}

export type LearningExercise =
	| MultipleChoiceExercise
	| FillBlankExercise
	| TrueFalseExercise
	| ReadingComprehensionExercise
	| MatchingExercise
	| ImageChoiceExercise
	| WordOrderExercise;

export type ExerciseAnswer =
	| {
		exerciseId: string;
		type: 'multipleChoice';
		optionId: string;
	}
	| {
		exerciseId: string;
		type: 'fillBlank';
		value: string;
	}
	| {
		exerciseId: string;
		type: 'trueFalse';
		value: boolean;
	}
	| {
		exerciseId: string;
		type: 'readingComprehension';
		answers: readonly {
			questionId: string;
			optionId: string;
		}[];
	}
	| {
		exerciseId: string;
		type: 'matching';
		matches: readonly {
			leftId: string;
			rightId: string;
		}[];
	}
	| {
		exerciseId: string;
		type: 'imageChoice';
		optionId: string;
	}
	| {
		exerciseId: string;
		type: 'wordOrder';
		tokenIds: readonly string[];
	};

export type ExerciseFeedbackState = 'correct' | 'partial' | 'incorrect';

export interface ExerciseEvaluation {
	exerciseId: string;
	correct: boolean;
	score: number;
	maxScore: number;
	potentialXp: number;
	earnedPotentialXp: number;
	feedback: ExerciseFeedbackState;
}

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

export type OpenPeepBackgroundPatternId =
	| 'plain'
	| 'dots'
	| 'waves'
	| 'bubbles'
	| 'confetti'
	| 'diagonal';

export const openPeepBackgroundPatternIds: readonly OpenPeepBackgroundPatternId[] = [
	'plain',
	'dots',
	'waves',
	'bubbles',
	'confetti',
	'diagonal'
] as const;

export interface OpenPeepCustomizationBackground {
	patternId: OpenPeepBackgroundPatternId;
}

export interface OpenPeepCustomizationColors {
	skin: string;
	hair: string;
	outfit: string;
	outfitSecondary: string;
	accessory: string;
	background: string;
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
	background: OpenPeepCustomizationBackground;
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
	background: {
		patternId: 'plain'
	},
	colors: {
		skin: '#F2C7A5',
		hair: '#1F2937',
		outfit: '#2563EB',
		outfitSecondary: '#F8FAFC',
		accessory: '#111827',
		background: '#EAF1FF',
		ink: '#111827'
	}
};

export const openPeepPostureModes: readonly OpenPeepPostureMode[] = ['bust', 'standing', 'sitting'] as const;

export function isOpenPeepPostureMode(value: unknown): value is OpenPeepPostureMode {
	return typeof value === 'string' && openPeepPostureModes.includes(value as OpenPeepPostureMode);
}

export function isOpenPeepBackgroundPatternId(value: unknown): value is OpenPeepBackgroundPatternId {
	return typeof value === 'string' && openPeepBackgroundPatternIds.includes(value as OpenPeepBackgroundPatternId);
}

export function isHexColor(value: unknown): value is string {
	return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
}

export function isOpenPeepCustomization(value: unknown): value is OpenPeepCustomization {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const customization = value as Partial<OpenPeepCustomization>;
	const background = customization.background as Partial<OpenPeepCustomizationBackground> | undefined;
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
		&& (background === undefined || typeof background.patternId === 'string')
		&& Boolean(colors)
		&& isHexColor(colors?.skin)
		&& isHexColor(colors?.hair)
		&& isHexColor(colors?.outfit)
		&& (colors?.outfitSecondary === undefined || isHexColor(colors.outfitSecondary))
		&& isHexColor(colors?.accessory)
		&& (colors?.background === undefined || isHexColor(colors.background))
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
