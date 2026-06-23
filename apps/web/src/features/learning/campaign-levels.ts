import type { CampaignLevel, CampaignLevelProgress, CampaignLevelReward, CampaignLevelState, PreviewProgress } from '@classyc/shared';
import {
	dailyCampaignBoostMultiplier,
	getCampaignLevelProgress,
	getDailyCampaignBoostLessonId
} from '@/features/learning/progress';

export interface CampaignLevelMapNode extends CampaignLevel {
	label: string;
	progress?: CampaignLevelProgress;
	x: number;
	y: number;
}

export const campaignLevelRoadPath = [
	'M180 72',
	'C226 100 258 132 238 176',
	'C218 222 182 236 180 280',
	'C178 324 128 338 122 384',
	'C116 430 164 448 180 488',
	'C196 528 238 548 238 592',
	'C238 632 206 656 180 682'
].join(' ');

export const campaignLevels: readonly CampaignLevelMapNode[] = [
	{
		id: 'campaign-intro',
		order: 1,
		label: '1',
		title: 'Premiers mots',
		x: 180,
		y: 72,
		state: 'available',
		openMojiHexcode: '1F3AF'
	},
	{
		id: 'campaign-sounds',
		order: 2,
		label: '2',
		title: 'Sons utiles',
		x: 238,
		y: 176,
		state: 'locked',
		openMojiHexcode: '1F399'
	},
	{
		id: 'campaign-words',
		order: 3,
		label: '3',
		title: 'Mots essentiels',
		x: 180,
		y: 280,
		state: 'locked',
		openMojiHexcode: '1F4DD'
	},
	{
		id: 'campaign-phrases',
		order: 4,
		label: '4',
		title: 'Phrases courtes',
		x: 122,
		y: 384,
		state: 'locked',
		openMojiHexcode: '1F4AC'
	},
	{
		id: 'campaign-reading',
		order: 5,
		label: '5',
		title: 'Lecture',
		x: 180,
		y: 488,
		state: 'locked',
		openMojiHexcode: '1F4D6'
	},
	{
		id: 'campaign-review',
		order: 6,
		label: '6',
		title: 'Revision',
		x: 238,
		y: 592,
		state: 'locked',
		openMojiHexcode: '2B50'
	},
	{
		id: 'campaign-checkpoint',
		order: 7,
		label: '7',
		title: 'Checkpoint',
		x: 180,
		y: 682,
		state: 'locked',
		openMojiHexcode: '1F3C6'
	}
];

const campaignLevelStateLabels: Record<CampaignLevelState, string> = {
	available: 'disponible',
	completed: 'termine',
	locked: 'verrouille'
};

export function createXpMultiplierReward(multiplier: number): CampaignLevelReward {
	return {
		type: 'xpMultiplier',
		multiplier
	};
}

export function getCampaignLevelRewardLabel(reward: CampaignLevelReward) {
	return `${reward.multiplier}x`;
}

export function getCampaignLevelRewardDescription(reward: CampaignLevelReward) {
	return `${getCampaignLevelRewardLabel(reward)} d'XP gagne en plus`;
}

export function getCampaignLevelAccessibleLabel(level: CampaignLevelMapNode) {
	const parts = [
		`Niveau ${level.label}`,
		level.title,
		campaignLevelStateLabels[level.state]
	];

	if (level.progress) {
		parts.push(`${level.progress.completedSteps}/${level.progress.requiredSteps}`);
	}

	if (level.reward) {
		parts.push(getCampaignLevelRewardDescription(level.reward));
	}

	return parts.join(' - ');
}

export function createCampaignLevelsForProgress(progress: PreviewProgress) {
	let previousLevelCompleted = true;

	return campaignLevels.map((level) => {
		const levelProgress = getCampaignLevelProgress(progress, level.id);
		const isCompleted = levelProgress.completedSteps >= levelProgress.requiredSteps;
		const state: CampaignLevelState = isCompleted
			? 'completed'
			: previousLevelCompleted
				? 'available'
				: 'locked';

		previousLevelCompleted = isCompleted;

		return {
			...level,
			progress: levelProgress,
			reward: state === 'available' && !progress.completedLessons[getDailyCampaignBoostLessonId(level.id)]
				? createXpMultiplierReward(dailyCampaignBoostMultiplier)
				: undefined,
			state
		};
	});
}

export function getCampaignMapProgressPercent(levels: readonly CampaignLevelMapNode[] = campaignLevels) {
	if (levels.length <= 1) {
		return 0;
	}

	const activeProgress = levels.reduce((lastActiveProgress, level, index) => {
		if (level.state === 'locked') {
			return lastActiveProgress;
		}

		const stepProgress = level.progress
			? level.progress.completedSteps / Math.max(1, level.progress.requiredSteps)
			: level.state === 'completed'
				? 1
				: 0;

		return index + Math.min(1, Math.max(0, stepProgress));
	}, 0);

	return Math.round((Math.min(activeProgress, levels.length - 1) / (levels.length - 1)) * 100);
}
