export interface NavigationItem {
	id: string;
	label: string;
	to: string;
}

export const navigationItems: readonly NavigationItem[] = [
	{
		id: 'home',
		label: 'Accueil',
		to: '/'
	},
	{
		id: 'learn',
		label: 'Parcours',
		to: '/learn'
	},
	{
		id: 'friends',
		label: 'Amis',
		to: '/friends'
	},
	{
		id: 'messages',
		label: 'Messages',
		to: '/messages'
	},
	{
		id: 'profile',
		label: 'Profil',
		to: '/profile'
	}
];
