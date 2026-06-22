import type {
	DailyLevel,
	DailyLevelDifficultyTier,
	DailyLevelReward,
	SupportedLanguageCode
} from '@classyc/shared';

export interface DailyQuestPreview {
	id: string;
	label: string;
	value: string;
	state: 'bonus' | 'empty';
	progressPercent: number;
	rewardLabel?: string;
	difficultyLabel: string;
	exercisePath: string;
	openMojiHexcode: string;
	accessibleLabel: string;
}

interface DailyLevelTemplate {
	id: string;
	difficulty: DailyLevelDifficultyTier;
	targetCount: number;
	openMojiHexcode: string;
	titles: Record<SupportedLanguageCode, string>;
}

const dailyLevelTemplates: readonly DailyLevelTemplate[] = [
	{
		id: 'daily-routine',
		difficulty: 'warmup',
		targetCount: 1,
		openMojiHexcode: '1F44B',
		titles: {
			fr: 'Bases rapides',
			en: 'Quick basics',
			zh: 'Quick basics'
		}
	},
	{
		id: 'daily-memory',
		difficulty: 'standard',
		targetCount: 3,
		openMojiHexcode: '1F4DD',
		titles: {
			fr: 'Révision ciblée',
			en: 'Focused review',
			zh: 'Focused review'
		}
	},
	{
		id: 'daily-sounds',
		difficulty: 'standard',
		targetCount: 2,
		openMojiHexcode: '1F399',
		titles: {
			fr: 'Sons utiles',
			en: 'Useful sounds',
			zh: 'Useful sounds'
		}
	},
	{
		id: 'daily-challenge',
		difficulty: 'challenge',
		targetCount: 1,
		openMojiHexcode: '2B50',
		titles: {
			fr: 'Défi court',
			en: 'Short challenge',
			zh: 'Short challenge'
		}
	}
];

const dailyQuestCount = 2;

export function createDailyLevels(language: SupportedLanguageCode, date = new Date()): readonly DailyLevel[] {
	const rotationKey = getDailyRotationKey(date);
	const rotationIndex = getDailyRotationIndex(rotationKey);

	return Array.from({ length: dailyQuestCount }, (_, index) => {
		const template = dailyLevelTemplates[(rotationIndex + index) % dailyLevelTemplates.length];

		return {
			id: `${template.id}-${rotationKey}`,
			order: index + 1,
			title: template.titles[language],
			difficulty: template.difficulty,
			targetCount: template.targetCount,
			completedCount: 0,
			rotationKey,
			reward: index === 0 ? createDailyXpMultiplierReward(1.5) : undefined,
			openMojiHexcode: template.openMojiHexcode
		};
	});
}

export function createDailyQuests(language: SupportedLanguageCode, date = new Date()): readonly DailyQuestPreview[] {
	return createDailyLevels(language, date).map(createDailyQuestPreview);
}

export function getDailyLevelRewardLabel(reward: DailyLevelReward) {
	return `${reward.multiplier}x`;
}

export function getDailyLevelRewardDescription(reward: DailyLevelReward) {
	return `${getDailyLevelRewardLabel(reward)} d'XP gagne en plus`;
}

function createDailyQuestPreview(level: DailyLevel): DailyQuestPreview {
	const rewardLabel = level.reward ? getDailyLevelRewardLabel(level.reward) : undefined;
	const progressPercent = getDailyLevelProgressPercent(level);
	const accessibleParts = [
		level.title,
		`${level.completedCount}/${level.targetCount}`,
		getDailyDifficultyLabel(level.difficulty)
	];

	if (level.reward) {
		accessibleParts.push(getDailyLevelRewardDescription(level.reward));
	}

	return {
		id: level.id,
		label: level.title,
		value: `${level.completedCount}/${level.targetCount}`,
		state: rewardLabel ? 'bonus' : 'empty',
		progressPercent,
		rewardLabel,
		difficultyLabel: getDailyDifficultyLabel(level.difficulty),
		exercisePath: `/daily/${level.id}`,
		openMojiHexcode: level.openMojiHexcode ?? '1F3AF',
		accessibleLabel: accessibleParts.join(' - ')
	};
}

function getDailyDifficultyLabel(difficulty: DailyLevelDifficultyTier) {
	const labels: Record<DailyLevelDifficultyTier, string> = {
		challenge: 'Difficile',
		standard: 'Moyen',
		warmup: 'Facile'
	};

	return labels[difficulty];
}

function createDailyXpMultiplierReward(multiplier: number): DailyLevelReward {
	return {
		type: 'xpMultiplier',
		multiplier
	};
}

function getDailyLevelProgressPercent(level: DailyLevel) {
	if (level.targetCount <= 0) {
		return 0;
	}

	return Math.min(100, Math.round((level.completedCount / level.targetCount) * 100));
}

function getDailyRotationKey(date: Date) {
	return [
		date.getFullYear(),
		String(date.getMonth() + 1).padStart(2, '0'),
		String(date.getDate()).padStart(2, '0')
	].join('-');
}

function getDailyRotationIndex(rotationKey: string) {
	return [...rotationKey].reduce((sum, char) => sum + char.charCodeAt(0), 0) % dailyLevelTemplates.length;
}
