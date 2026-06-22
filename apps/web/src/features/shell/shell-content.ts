import { getLanguageOption, getUiCopy } from '@/features/i18n/ui-copy';
import type { ShellRouteId } from '@/domain/navigation';
import type { GuestProfile, SupportedLanguageCode } from '@classyc/shared';

export interface ShellPanelPreview {
	id: string;
	title: string;
	detail: string;
	meta: string;
}

export interface ShellSectionPreview {
	id: Exclude<ShellRouteId, 'learn'>;
	title: string;
	kicker: string;
	summary: string;
	panels: readonly ShellPanelPreview[];
}

export function getLearningSummary(profile: GuestProfile) {
	const copy = getUiCopy(profile.nativeLanguage);
	const target = getLanguageOption(profile.targetLanguage, profile.nativeLanguage);

	return {
		title: `${copy.navigation.learn.label} ${target.label}`,
		mapTitle: target.label,
		dailyQuests: copy.learn.dailyQuests,
		emptyQuest: copy.learn.emptyQuest,
		next: copy.learn.next
	};
}

export function createShellSections(language: SupportedLanguageCode): Record<Exclude<ShellRouteId, 'learn'>, ShellSectionPreview> {
	const copy = getUiCopy(language);

	return {
		stats: {
			id: 'stats',
			title: copy.stats.title,
			kicker: copy.navigation.stats.label,
			summary: copy.navigation.stats.description,
			panels: [
				{
					id: 'recent-errors',
					title: copy.stats.recentErrors,
					detail: copy.stats.soon,
					meta: '0'
				},
				{
					id: 'history',
					title: copy.stats.history,
					detail: copy.stats.soon,
					meta: '0'
				},
				{
					id: 'progress',
					title: copy.progress,
					detail: copy.stats.soon,
					meta: '0 XP'
				}
			]
		},
		leaderboard: {
			id: 'leaderboard',
			title: copy.navigation.leaderboard.label,
			kicker: copy.navigation.leaderboard.label,
			summary: copy.navigation.leaderboard.description,
			panels: [
				{
					id: 'league',
					title: copy.navigation.leaderboard.label,
					detail: copy.stats.soon,
					meta: '0'
				}
			]
		},
		friends: {
			id: 'friends',
			title: copy.navigation.friends.label,
			kicker: copy.navigation.friends.label,
			summary: copy.navigation.friends.description,
			panels: [
				{
					id: 'directory',
					title: copy.navigation.friends.label,
					detail: copy.stats.soon,
					meta: '0'
				}
			]
		},
		messages: {
			id: 'messages',
			title: copy.navigation.messages.label,
			kicker: copy.navigation.messages.label,
			summary: copy.navigation.messages.description,
			panels: [
				{
					id: 'inbox',
					title: copy.navigation.messages.label,
					detail: copy.stats.soon,
					meta: '0'
				}
			]
		},
		settings: {
			id: 'settings',
			title: copy.navigation.settings.label,
			kicker: copy.navigation.settings.label,
			summary: copy.navigation.settings.description,
			panels: [
				{
					id: 'appearance',
					title: copy.navigation.settings.label,
					detail: copy.themeDark,
					meta: 'UI'
				}
			]
		},
		profile: {
			id: 'profile',
			title: copy.navigation.profile.label,
			kicker: copy.guestMode,
			summary: copy.navigation.profile.description,
			panels: [
				{
					id: 'guest',
					title: copy.guestMode,
					detail: copy.stats.soon,
					meta: 'OK'
				}
			]
		}
	};
}
