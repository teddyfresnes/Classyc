import { getSupportedLanguage } from '@classyc/shared';
import type { SupportedLanguageCode } from '@classyc/shared';
import type { ShellRouteId } from '@/domain/navigation';

interface NavigationCopy {
	label: string;
	shortLabel: string;
	description: string;
}

interface UiCopy {
	accountUnavailable: string;
	alreadyAccount: string;
	back: string;
	continue: string;
	firstName: string;
	guestMode: string;
	learnLanguage: string;
	loginLater: string;
	nameIntroTitle: string;
	namePlaceholder: string;
	navigation: Record<ShellRouteId, NavigationCopy>;
	onboardingTitle: string;
	progress: string;
	start: string;
	streak: string;
	settings: string;
	notifications: string;
	targetDisabled: string;
	themeDark: string;
	themeLight: string;
	xp: string;
	yourLanguage: string;
	languages: Record<SupportedLanguageCode, string>;
	learn: {
		dailyQuests: string;
		emptyQuest: string;
		mapTitle: string;
		next: string;
	};
	stats: {
		title: string;
		recentErrors: string;
		history: string;
		soon: string;
	};
}

export const uiCopies: Record<SupportedLanguageCode, UiCopy> = {
	fr: {
		accountUnavailable: 'Connexion bientôt disponible.',
		alreadyAccount: "J'ai déjà un compte",
		back: 'Retour',
		continue: 'Continuer',
		firstName: 'Prénom',
		guestMode: 'Invité',
		learnLanguage: 'Je veux apprendre',
		loginLater: 'Tu peux continuer en invité.',
		nameIntroTitle: 'Dites-nous en plus sur vous',
		namePlaceholder: 'Alex',
		onboardingTitle: 'Configuration',
		progress: 'Progression',
		start: 'Commencer',
		streak: 'Série',
		settings: 'Paramètres',
		notifications: 'Notifications',
		targetDisabled: 'Déjà ta langue',
		themeDark: 'Passer au thème sombre',
		themeLight: 'Passer au thème clair',
		xp: 'XP',
		yourLanguage: 'Je parle',
		languages: {
			fr: 'Français',
			en: 'Anglais',
			zh: 'Chinois'
		},
		navigation: {
			learn: {
				label: 'Apprendre',
				shortLabel: 'Apprendre',
				description: 'Niveaux.'
			},
			stats: {
				label: 'Stats',
				shortLabel: 'Stats',
				description: 'Erreurs, historique et progression.'
			},
			friends: {
				label: 'Amis',
				shortLabel: 'Amis',
				description: 'Relations et invitations.'
			},
			messages: {
				label: 'Messages',
				shortLabel: 'Messages',
				description: 'Conversations et jeux.'
			},
			settings: {
				label: 'Paramètres',
				shortLabel: 'Réglages',
				description: 'Thème et préférences.'
			},
			profile: {
				label: 'Profil',
				shortLabel: 'Profil',
				description: 'Compte et préférences.'
			}
		},
		learn: {
			dailyQuests: 'Quêtes journalières',
			emptyQuest: 'Les vraies quêtes arrivent avec les niveaux.',
			mapTitle: 'Chemin de progression',
			next: 'Suivant'
		},
		stats: {
			title: 'Stats',
			recentErrors: 'Erreurs récentes',
			history: 'Historique',
			soon: 'Bientôt'
		}
	},
	en: {
		accountUnavailable: 'Sign in is coming soon.',
		alreadyAccount: 'I already have an account',
		back: 'Back',
		continue: 'Continue',
		firstName: 'First name',
		guestMode: 'Guest',
		learnLanguage: 'I want to learn',
		loginLater: 'You can continue as a guest.',
		nameIntroTitle: 'Tell us a little about you',
		namePlaceholder: 'Alex',
		onboardingTitle: 'Setup',
		progress: 'Progress',
		start: 'Start',
		streak: 'Streak',
		settings: 'Settings',
		notifications: 'Notifications',
		targetDisabled: 'Already your language',
		themeDark: 'Switch to dark theme',
		themeLight: 'Switch to light theme',
		xp: 'XP',
		yourLanguage: 'I speak',
		languages: {
			fr: 'French',
			en: 'English',
			zh: 'Chinese'
		},
		navigation: {
			learn: {
				label: 'Learn',
				shortLabel: 'Learn',
				description: 'Levels.'
			},
			stats: {
				label: 'Stats',
				shortLabel: 'Stats',
				description: 'Mistakes, history and progress.'
			},
			friends: {
				label: 'Friends',
				shortLabel: 'Friends',
				description: 'Friends and invites.'
			},
			messages: {
				label: 'Messages',
				shortLabel: 'Messages',
				description: 'Chats and games.'
			},
			settings: {
				label: 'Settings',
				shortLabel: 'Settings',
				description: 'Theme and preferences.'
			},
			profile: {
				label: 'Profile',
				shortLabel: 'Profile',
				description: 'Account and preferences.'
			}
		},
		learn: {
			dailyQuests: 'Daily quests',
			emptyQuest: 'Real quests arrive with levels.',
			mapTitle: 'Progress path',
			next: 'Next'
		},
		stats: {
			title: 'Stats',
			recentErrors: 'Recent mistakes',
			history: 'History',
			soon: 'Soon'
		}
	},
	zh: {
		accountUnavailable: '登录功能即将推出。',
		alreadyAccount: '我已有账号',
		back: '返回',
		continue: '继续',
		firstName: '名字',
		guestMode: '访客',
		learnLanguage: '我想学习',
		loginLater: '你可以先以访客身份继续。',
		nameIntroTitle: '再介绍一下你自己',
		namePlaceholder: 'Alex',
		onboardingTitle: '设置',
		progress: '进度',
		start: '开始',
		streak: '连续',
		settings: '设置',
		notifications: '通知',
		targetDisabled: '已是你的语言',
		themeDark: '切换到深色主题',
		themeLight: '切换到浅色主题',
		xp: 'XP',
		yourLanguage: '我会说',
		languages: {
			fr: '法语',
			en: '英语',
			zh: '中文'
		},
		navigation: {
			learn: {
				label: '学习',
				shortLabel: '学习',
				description: '关卡。'
			},
			stats: {
				label: '统计',
				shortLabel: '统计',
				description: '错误、历史和进度。'
			},
			friends: {
				label: '好友',
				shortLabel: '好友',
				description: '好友和邀请。'
			},
			messages: {
				label: '消息',
				shortLabel: '消息',
				description: '聊天和游戏。'
			},
			settings: {
				label: '设置',
				shortLabel: '设置',
				description: '主题和偏好。'
			},
			profile: {
				label: '资料',
				shortLabel: '资料',
				description: '账号和偏好。'
			}
		},
		learn: {
			dailyQuests: '每日任务',
			emptyQuest: '真正的任务会随关卡推出。',
			mapTitle: '进度路线',
			next: '下一步'
		},
		stats: {
			title: '统计',
			recentErrors: '最近错误',
			history: '历史',
			soon: '即将推出'
		}
	}
};

export function getUiCopy(language: SupportedLanguageCode | null | undefined) {
	return uiCopies[language ?? 'fr'];
}

export function getLanguageOption(code: SupportedLanguageCode, uiLanguage: SupportedLanguageCode | null | undefined) {
	const language = getSupportedLanguage(code);
	const copy = getUiCopy(uiLanguage);

	return {
		...language,
		label: copy.languages[code]
	};
}
