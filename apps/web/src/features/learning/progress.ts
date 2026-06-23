import type { CampaignLevelProgress, GuestProfile, PreviewProgress } from '@classyc/shared';

export const campaignLevelRequiredSteps = 3;
export const lessonCompletionXp = 10;

export type LessonCompletionContext =
	| {
		type: 'campaign';
		levelId: string;
	}
	| {
		type: 'daily';
		lessonId: string;
	};

export interface LessonCompletionResult {
	xpAwarded: number;
	levelId?: string;
	completedSteps?: number;
	requiredSteps?: number;
	alreadyRewarded: boolean;
}

export function createInitialProgress(): PreviewProgress {
	return {
		xp: 0,
		streakDays: 0,
		campaignLevels: {},
		completedLessons: {}
	};
}

export function normalizeProgress(progress: Partial<PreviewProgress> | undefined): PreviewProgress {
	return {
		xp: typeof progress?.xp === 'number' ? Math.max(0, progress.xp) : 0,
		streakDays: typeof progress?.streakDays === 'number' ? Math.max(0, progress.streakDays) : 0,
		campaignLevels: isRecord(progress?.campaignLevels) ? progress.campaignLevels : {},
		completedLessons: isRecord(progress?.completedLessons) ? progress.completedLessons : {}
	};
}

export function getCampaignLevelProgress(
	progress: PreviewProgress,
	levelId: string
): CampaignLevelProgress {
	const levelProgress = progress.campaignLevels[levelId];

	return {
		completedAt: levelProgress?.completedAt,
		completedSteps: clampStepCount(levelProgress?.completedSteps),
		requiredSteps: clampRequiredSteps(levelProgress?.requiredSteps),
		updatedAt: levelProgress?.updatedAt
	};
}

export function completeLesson(
	profile: GuestProfile,
	context: LessonCompletionContext,
	completedAt = new Date().toISOString()
): { profile: GuestProfile; result: LessonCompletionResult } {
	const progress = normalizeProgress(profile.progress);

	if (context.type === 'campaign') {
		const currentLevelProgress = getCampaignLevelProgress(progress, context.levelId);
		const nextCompletedSteps = Math.min(
			currentLevelProgress.requiredSteps,
			currentLevelProgress.completedSteps + 1
		);
		const alreadyRewarded = currentLevelProgress.completedSteps >= currentLevelProgress.requiredSteps;
		const xpAwarded = alreadyRewarded ? 0 : lessonCompletionXp;
		const nextLevelProgress: CampaignLevelProgress = {
			completedSteps: nextCompletedSteps,
			requiredSteps: currentLevelProgress.requiredSteps,
			updatedAt: completedAt,
			completedAt: nextCompletedSteps >= currentLevelProgress.requiredSteps
				? currentLevelProgress.completedAt ?? completedAt
				: currentLevelProgress.completedAt
		};

		return {
			profile: {
				...profile,
				progress: {
					...progress,
					xp: progress.xp + xpAwarded,
					campaignLevels: {
						...progress.campaignLevels,
						[context.levelId]: nextLevelProgress
					}
				}
			},
			result: {
				alreadyRewarded,
				completedSteps: nextLevelProgress.completedSteps,
				levelId: context.levelId,
				requiredSteps: nextLevelProgress.requiredSteps,
				xpAwarded
			}
		};
	}

	const previousCompletion = progress.completedLessons[context.lessonId];
	const alreadyRewarded = Boolean(previousCompletion);
	const xpAwarded = alreadyRewarded ? 0 : lessonCompletionXp;

	return {
		profile: {
			...profile,
			progress: {
				...progress,
				xp: progress.xp + xpAwarded,
				completedLessons: {
					...progress.completedLessons,
					[context.lessonId]: previousCompletion ?? {
						completedAt,
						xpAwarded
					}
				}
			}
		},
		result: {
			alreadyRewarded,
			xpAwarded
		}
	};
}

function clampRequiredSteps(value: unknown) {
	return typeof value === 'number' && value > 0 ? Math.round(value) : campaignLevelRequiredSteps;
}

function clampStepCount(value: unknown) {
	return typeof value === 'number'
		? Math.max(0, Math.min(Math.round(value), campaignLevelRequiredSteps))
		: 0;
}

function isRecord<T>(value: T): value is Extract<T, Record<string, unknown>> {
	return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
