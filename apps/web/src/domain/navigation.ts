export type NavigationItemId = 'learn' | 'stats' | 'leaderboard' | 'friends' | 'messages' | 'settings';

export type ShellRouteId = NavigationItemId | 'profile';

export interface NavigationItem {
	id: NavigationItemId;
	to: string;
}

export const navigationItems: readonly NavigationItem[] = [
	{
		id: 'learn',
		to: '/'
	},
	{
		id: 'stats',
		to: '/stats'
	},
	{
		id: 'leaderboard',
		to: '/leaderboard'
	},
	{
		id: 'friends',
		to: '/friends'
	},
	{
		id: 'messages',
		to: '/messages'
	},
	{
		id: 'settings',
		to: '/settings'
	}
];
