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

interface CampaignRoadPoint {
	x: number;
	y: number;
}

interface CampaignRoadSegment {
	start: CampaignRoadPoint;
	control1: CampaignRoadPoint;
	control2: CampaignRoadPoint;
	end: CampaignRoadPoint;
}

const campaignLevelRoadSegments: readonly CampaignRoadSegment[] = [
	{
		start: { x: 180, y: 72 },
		control1: { x: 226, y: 100 },
		control2: { x: 258, y: 132 },
		end: { x: 238, y: 176 }
	},
	{
		start: { x: 238, y: 176 },
		control1: { x: 218, y: 222 },
		control2: { x: 182, y: 236 },
		end: { x: 180, y: 280 }
	},
	{
		start: { x: 180, y: 280 },
		control1: { x: 178, y: 324 },
		control2: { x: 128, y: 338 },
		end: { x: 122, y: 384 }
	},
	{
		start: { x: 122, y: 384 },
		control1: { x: 116, y: 430 },
		control2: { x: 164, y: 448 },
		end: { x: 180, y: 488 }
	},
	{
		start: { x: 180, y: 488 },
		control1: { x: 196, y: 528 },
		control2: { x: 238, y: 548 },
		end: { x: 238, y: 592 }
	},
	{
		start: { x: 238, y: 592 },
		control1: { x: 238, y: 632 },
		control2: { x: 206, y: 656 },
		end: { x: 180, y: 682 }
	}
];

const campaignLevelRoadNodeMaskRadius = 38;
const campaignLevelRoadProgressCapRadius = 8.5;
const campaignLevelRoadSegmentSamples = 18;

const campaignLevelRoadSegmentLengths = campaignLevelRoadSegments.map(getCampaignRoadSegmentLength);
const campaignLevelRoadOffsets = campaignLevelRoadSegmentLengths.reduce<number[]>((offsets, length) => {
	offsets.push((offsets.at(-1) ?? 0) + length);

	return offsets;
}, [0]);

export const campaignLevelRoadPath = [
	`M${campaignLevelRoadSegments[0].start.x} ${campaignLevelRoadSegments[0].start.y}`,
	...campaignLevelRoadSegments.map((segment) => (
		`C${segment.control1.x} ${segment.control1.y} ${segment.control2.x} ${segment.control2.y} ${segment.end.x} ${segment.end.y}`
	))
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

	const totalRoadLength = getCampaignLevelRoadOffset(levels.length - 1);

	if (totalRoadLength <= 0) {
		return 0;
	}

	const progressLength = levels.reduce((lastProgressLength, level, index) => {
		if (level.state === 'locked') {
			return lastProgressLength;
		}

		const stepProgress = getCampaignLevelStepProgress(level);

		if (stepProgress <= 0) {
			return lastProgressLength;
		}

		const levelOffset = getCampaignLevelRoadOffset(index);
		const segmentProgress = getCampaignLevelVisibleSegmentProgress(
			index,
			stepProgress
		);

		return Math.max(lastProgressLength, levelOffset + segmentProgress);
	}, 0);

	return Number(((Math.min(progressLength, totalRoadLength) / totalRoadLength) * 100).toFixed(2));
}

function getCampaignLevelStepProgress(level: CampaignLevelMapNode) {
	if (!level.progress) {
		return level.state === 'completed' ? 1 : 0;
	}

	return Math.min(
		1,
		Math.max(0, level.progress.completedSteps / Math.max(1, level.progress.requiredSteps))
	);
}

function getCampaignLevelVisibleSegmentProgress(index: number, progress: number) {
	const segmentLength = campaignLevelRoadSegmentLengths[index] ?? 0;

	if (progress <= 0 || segmentLength <= 0) {
		return 0;
	}

	const startMaskLength = Math.min(campaignLevelRoadNodeMaskRadius, segmentLength / 2);
	const endMaskLength = Math.min(campaignLevelRoadNodeMaskRadius, segmentLength - startMaskLength);
	const visibleSegmentLength = Math.max(0, segmentLength - startMaskLength - endMaskLength);
	const visibleProgressLength = visibleSegmentLength * progress;

	return Math.min(
		segmentLength - endMaskLength,
		startMaskLength + Math.max(0, visibleProgressLength - campaignLevelRoadProgressCapRadius)
	);
}

function getCampaignLevelRoadOffset(levelIndex: number) {
	return campaignLevelRoadOffsets[Math.min(levelIndex, campaignLevelRoadOffsets.length - 1)] ?? 0;
}

function getCampaignRoadSegmentLength(segment: CampaignRoadSegment) {
	let length = 0;
	let previousPoint = segment.start;

	for (let index = 1; index <= campaignLevelRoadSegmentSamples; index += 1) {
		const nextPoint = getCampaignRoadSegmentPoint(segment, index / campaignLevelRoadSegmentSamples);
		length += getCampaignRoadPointDistance(previousPoint, nextPoint);
		previousPoint = nextPoint;
	}

	return length;
}

function getCampaignRoadSegmentPoint(segment: CampaignRoadSegment, progress: number): CampaignRoadPoint {
	const invertedProgress = 1 - progress;
	const startRatio = invertedProgress ** 3;
	const control1Ratio = 3 * invertedProgress ** 2 * progress;
	const control2Ratio = 3 * invertedProgress * progress ** 2;
	const endRatio = progress ** 3;

	return {
		x: segment.start.x * startRatio
			+ segment.control1.x * control1Ratio
			+ segment.control2.x * control2Ratio
			+ segment.end.x * endRatio,
		y: segment.start.y * startRatio
			+ segment.control1.y * control1Ratio
			+ segment.control2.y * control2Ratio
			+ segment.end.y * endRatio
	};
}

function getCampaignRoadPointDistance(start: CampaignRoadPoint, end: CampaignRoadPoint) {
	return Math.hypot(end.x - start.x, end.y - start.y);
}
