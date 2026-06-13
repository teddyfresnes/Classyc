import type { NavigationItemId } from '@/domain/navigation';

export interface MetricPreview {
	id: string;
	label: string;
	value: string;
	detail: string;
	tone: 'green' | 'blue' | 'amber';
}

export interface FocusAction {
	id: string;
	label: string;
	value: string;
	detail: string;
}

export interface LevelNodePreview {
	id: string;
	label: string;
	detail: string;
	state: 'ready' | 'next' | 'locked';
}

export interface SocialPreview {
	id: string;
	name: string;
	detail: string;
	meta: string;
}

export interface ShellPanelPreview {
	id: string;
	title: string;
	detail: string;
	meta: string;
}

export interface ShellSectionPreview {
	id: NavigationItemId;
	title: string;
	kicker: string;
	summary: string;
	panels: readonly ShellPanelPreview[];
}

export const metricPreviews: readonly MetricPreview[] = [
	{
		id: 'xp',
		label: 'XP',
		value: '0',
		detail: 'Compte invite',
		tone: 'green'
	},
	{
		id: 'level',
		label: 'Niveau',
		value: '1',
		detail: 'Depart',
		tone: 'blue'
	},
	{
		id: 'streak',
		label: 'Serie',
		value: '0',
		detail: 'jours',
		tone: 'amber'
	}
];

export const focusActions: readonly FocusAction[] = [
	{
		id: 'native-language',
		label: 'Langue de depart',
		value: 'A choisir',
		detail: 'FR, EN ou ZH'
	},
	{
		id: 'target-language',
		label: 'Objectif',
		value: 'A definir',
		detail: 'Parcours adapte'
	},
	{
		id: 'character',
		label: 'Personnage',
		value: 'A creer',
		detail: 'Open Peeps'
	}
];

export const levelNodes: readonly LevelNodePreview[] = [
	{
		id: 'diagnostic',
		label: 'Diagnostic',
		detail: 'Depart',
		state: 'ready'
	},
	{
		id: 'first-lesson',
		label: 'Lecon 1',
		detail: 'Campagne',
		state: 'next'
	},
	{
		id: 'daily',
		label: 'Journalier',
		detail: 'Routine',
		state: 'locked'
	},
	{
		id: 'social',
		label: 'Defi ami',
		detail: 'Social',
		state: 'locked'
	}
];

export const socialPreviews: readonly SocialPreview[] = [
	{
		id: 'friend-feed',
		name: 'Amis',
		detail: 'Invitations et activite',
		meta: '0'
	},
	{
		id: 'message-feed',
		name: 'Messages',
		detail: 'Conversations rapides',
		meta: '0'
	},
	{
		id: 'draw-battle',
		name: 'Draw Battle',
		detail: 'Mini-jeu extensible',
		meta: 'Plan'
	}
];

export const shellSections: Record<Exclude<NavigationItemId, 'home'>, ShellSectionPreview> = {
	learn: {
		id: 'learn',
		title: 'Parcours',
		kicker: 'Apprentissage',
		summary: 'La zone d apprentissage regroupe diagnostic, campagne et sessions journalieres.',
		panels: [
			{
				id: 'diagnostic',
				title: 'Diagnostic',
				detail: 'Placement initial court avant les premieres lecons.',
				meta: 'Prochaine'
			},
			{
				id: 'campaign',
				title: 'Campagne',
				detail: 'Carte de niveaux avec etats et bonus XP.',
				meta: 'Planifie'
			},
			{
				id: 'daily',
				title: 'Journalier',
				detail: 'Session rapide avec difficulte variable.',
				meta: 'Planifie'
			}
		]
	},
	friends: {
		id: 'friends',
		title: 'Amis',
		kicker: 'Social',
		summary: 'La future zone amis garde les relations et le classement dans un espace calme.',
		panels: [
			{
				id: 'directory',
				title: 'Liste',
				detail: 'Profils amis et statuts simples.',
				meta: 'Vide'
			},
			{
				id: 'requests',
				title: 'Invitations',
				detail: 'Demandes entrantes et sortantes.',
				meta: '0'
			},
			{
				id: 'leaderboard',
				title: 'Classement',
				detail: 'XP, serie et progression hebdomadaire.',
				meta: 'Planifie'
			}
		]
	},
	messages: {
		id: 'messages',
		title: 'Messages',
		kicker: 'Conversations',
		summary: 'La messagerie aura ses etats de lecture, saisie et emojis sans encombrer l apprentissage.',
		panels: [
			{
				id: 'inbox',
				title: 'Boite',
				detail: 'Conversations envoyees et recues.',
				meta: '0'
			},
			{
				id: 'presence',
				title: 'Presence',
				detail: 'Vu, saisie et disponibilite.',
				meta: 'Planifie'
			},
			{
				id: 'games',
				title: 'Mini-jeux',
				detail: 'Premier emplacement pour Draw Battle.',
				meta: 'Planifie'
			}
		]
	},
	profile: {
		id: 'profile',
		title: 'Profil',
		kicker: 'Compte',
		summary: 'Le profil garde le mode invite, les preferences et la migration future vers compte connecte.',
		panels: [
			{
				id: 'guest',
				title: 'Invite',
				detail: 'Progression locale avant connexion.',
				meta: 'Actif'
			},
			{
				id: 'stats',
				title: 'Stats',
				detail: 'XP, niveau et serie.',
				meta: '0 XP'
			},
			{
				id: 'settings',
				title: 'Parametres',
				detail: 'Theme, langue et preferences.',
				meta: 'Pret'
			}
		]
	}
};
