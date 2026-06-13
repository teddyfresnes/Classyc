import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ThemePreference } from '@classyc/shared';

interface ThemeContextValue {
	theme: ThemePreference;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const storageKey = 'classyc-theme';

function getInitialTheme(): ThemePreference {
	if (typeof window === 'undefined') {
		return 'light';
	}

	const storedTheme = window.localStorage.getItem(storageKey);

	if (storedTheme === 'light' || storedTheme === 'dark') {
		return storedTheme;
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<ThemePreference>(getInitialTheme);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		window.localStorage.setItem(storageKey, theme);
	}, [theme]);

	const value = useMemo<ThemeContextValue>(() => ({
		theme,
		toggleTheme: () => {
			setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
		}
	}), [theme]);

	return (
		<ThemeContext.Provider value={value}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error('useTheme must be used inside ThemeProvider');
	}

	return context;
}
