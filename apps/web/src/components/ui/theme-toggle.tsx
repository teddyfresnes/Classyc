import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/app/theme-provider';

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	const Icon = theme === 'dark' ? Sun : Moon;
	const label = theme === 'dark' ? 'Passer au theme clair' : 'Passer au theme sombre';

	return (
		<button
			aria-label={label}
			className="inline-flex size-10 items-center justify-center rounded-lg border border-[var(--border-soft)] bg-[var(--surface-2)] text-[var(--text-primary)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--surface-3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
			onClick={toggleTheme}
			title={label}
			type="button"
		>
			<Icon aria-hidden="true" size={19} strokeWidth={2.3} />
		</button>
	);
}
