export type NavigationItemId = 'home' | 'learn' | 'friends' | 'messages' | 'profile';

export interface NavigationItem {
	id: NavigationItemId;
	label: string;
	shortLabel: string;
	description: string;
	to: string;
}

export const navigationItems: readonly NavigationItem[] = [
	{
		id: 'home',
		label: 'Accueil',
		shortLabel: 'Accueil',
		description: 'Vue du jour, progression et prochains espaces.',
		to: '/'
	},
	{
		id: 'learn',
		label: 'Parcours',
		shortLabel: 'Parcours',
		description: 'Campagne, journalier et diagnostic.',
		to: '/learn'
	},
	{
		id: 'friends',
		label: 'Amis',
		shortLabel: 'Amis',
		description: 'Relations, invitations et activite.',
		to: '/friends'
	},
	{
		id: 'messages',
		label: 'Messages',
		shortLabel: 'Messages',
		description: 'Conversations et jeux entre amis.',
		to: '/messages'
	},
	{
		id: 'profile',
		label: 'Profil',
		shortLabel: 'Profil',
		description: 'Identite, stats et preferences.',
		to: '/profile'
	}
];
