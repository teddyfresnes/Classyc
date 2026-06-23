import type { CampaignLevelProgress, GuestProfile, PreviewProgress } from '@classyc/shared';

export const campaignLevelRequiredSteps = 3;
export const lessonCompletionXp = 10;
export const dailyCampaignBoostMultiplier = 1.5;

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
		const dailyBoostLessonId = getDailyCampaignBoostLessonId(context.levelId, completedAt);
		const hasDailyBoost = !progress.completedLessons[dailyBoostLessonId];
		const nextCompletedSteps = Math.min(
			currentLevelProgress.requiredSteps,
			currentLevelProgress.completedSteps + 1
		);
		const alreadyRewarded = currentLevelProgress.completedSteps >= currentLevelProgress.requiredSteps;
		const xpAwarded = alreadyRewarded
			? 0
			: Math.round(lessonCompletionXp * (hasDailyBoost ? dailyCampaignBoostMultiplier : 1));
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
					},
					completedLessons: alreadyRewarded
						? progress.completedLessons
						: {
							...progress.completedLessons,
							[dailyBoostLessonId]: progress.completedLessons[dailyBoostLessonId] ?? {
								completedAt,
								xpAwarded
							}
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

export function getDailyCampaignBoostLessonId(levelId: string, date: Date | string = new Date()) {
	void levelId;

	return `campaign-boost:${getLocalDateKey(date)}`;
}

function getLocalDateKey(date: Date | string) {
	const value = typeof date === 'string' ? new Date(date) : date;

	if (Number.isNaN(value.getTime())) {
		return getLocalDateKey(new Date());
	}

	return [
		value.getFullYear(),
		String(value.getMonth() + 1).padStart(2, '0'),
		String(value.getDate()).padStart(2, '0')
	].join('-');
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
