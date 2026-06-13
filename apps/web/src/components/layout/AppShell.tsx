import { motion } from 'framer-motion';
import {
	BookOpenCheck,
	Flame,
	Home,
	MessageCircle,
	Sparkles,
	Trophy,
	UserRound,
	UsersRound
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { supportedLanguages } from '@classyc/shared';
import type { NavigationItem } from '@/domain/navigation';
import { navigationItems } from '@/domain/navigation';
import { learningPreviewCards, progressPreview } from '@/features/learning/learning-preview';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const iconMap = {
	home: Home,
	learn: BookOpenCheck,
	friends: UsersRound,
	messages: MessageCircle,
	profile: UserRound
} as const;

function getNavIcon(item: NavigationItem) {
	return iconMap[item.id as keyof typeof iconMap] ?? Home;
}

function navClassName({ isActive }: { isActive: boolean }) {
	return [
		'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition',
		'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
		isActive
			? 'bg-[var(--accent-soft)] text-[var(--accent-strong)]'
			: 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]'
	].join(' ');
}

export function AppShell() {
	return (
		<div className="min-h-screen bg-[var(--surface-1)] text-[var(--text-primary)]">
			<div className="mx-auto flex min-h-screen max-w-7xl">
				<aside className="hidden w-64 shrink-0 border-r border-[var(--border-soft)] px-4 py-5 lg:block">
					<div className="mb-8 flex items-center gap-3 px-2">
						<div className="grid size-10 place-items-center rounded-lg bg-[var(--accent)] text-white shadow-sm">
							<Sparkles aria-hidden="true" size={21} />
						</div>
						<div>
							<p className="text-lg font-black leading-none">Classyc</p>
							<p className="text-xs font-semibold text-[var(--text-muted)]">Langues modernes</p>
						</div>
					</div>

					<nav aria-label="Navigation principale" className="space-y-1">
						{navigationItems.map((item) => {
							const Icon = getNavIcon(item);

							return (
								<NavLink className={navClassName} end={item.to === '/'} key={item.id} to={item.to}>
									<Icon aria-hidden="true" size={19} strokeWidth={2.3} />
									<span>{item.label}</span>
								</NavLink>
							);
						})}
					</nav>
				</aside>

				<div className="flex min-w-0 flex-1 flex-col pb-20 lg:pb-0">
					<header className="sticky top-0 z-10 border-b border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-1)_88%,transparent)] px-4 py-3 backdrop-blur-xl sm:px-6">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="text-xs font-bold uppercase tracking-wide text-[var(--accent-strong)]">Etape 1</p>
								<h1 className="text-xl font-black sm:text-2xl">Socle Classyc</h1>
							</div>
							<ThemeToggle />
						</div>
					</header>

					<main className="grid flex-1 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
						<section className="space-y-4">
							<motion.section
								animate={{ opacity: 1, y: 0 }}
								className="app-card p-5 sm:p-6"
								initial={{ opacity: 0, y: 10 }}
								transition={{ duration: 0.35, ease: 'easeOut' }}
							>
								<div className="max-w-2xl">
									<p className="mb-2 text-sm font-bold text-[var(--accent-strong)]">Base technique prete</p>
									<h2 className="text-2xl font-black leading-tight sm:text-3xl">Un shell clair pour construire sans se disperser.</h2>
									<p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">
										La navigation, le theme, la structure modulaire et les premiers modeles partages sont en place. Les parcours utilisateur arrivent aux prochaines etapes.
									</p>
								</div>
							</motion.section>

							<section className="grid gap-3 md:grid-cols-3">
								{learningPreviewCards.map((card) => (
									<article className="app-card p-4" key={card.id}>
										<div className="mb-3 flex items-center justify-between gap-3">
											<h3 className="text-base font-black">{card.title}</h3>
											<span className="rounded-md bg-[var(--surface-3)] px-2 py-1 text-xs font-bold text-[var(--text-muted)]">
												{card.meta}
											</span>
										</div>
										<p className="text-sm leading-6 text-[var(--text-muted)]">{card.description}</p>
									</article>
								))}
							</section>
						</section>

						<aside className="space-y-4">
							<section className="app-card p-4">
								<h2 className="mb-4 text-base font-black">Progression locale</h2>
								<div className="grid grid-cols-3 gap-2">
									<ProgressMetric icon={Trophy} label="XP" value={progressPreview.xp} />
									<ProgressMetric icon={BookOpenCheck} label="Niveau" value={progressPreview.level} />
									<ProgressMetric icon={Flame} label="Serie" value={progressPreview.streakDays} />
								</div>
							</section>

							<section className="app-card p-4">
								<h2 className="mb-3 text-base font-black">Langues prevues</h2>
								<div className="space-y-2">
									{supportedLanguages.map((language) => (
										<div className="flex items-center justify-between rounded-lg border border-[var(--border-soft)] px-3 py-2" key={language.code}>
											<span className="text-sm font-bold">{language.label}</span>
											<span className="text-xs font-semibold text-[var(--text-muted)]">{language.nativeLabel}</span>
										</div>
									))}
								</div>
							</section>
						</aside>
					</main>
				</div>
			</div>

			<nav aria-label="Navigation mobile" className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--border-soft)] bg-[var(--surface-1)] px-2 py-2 shadow-[0_-10px_28px_rgba(15,23,42,0.08)] lg:hidden">
				<div className="mx-auto grid max-w-md grid-cols-5 gap-1">
					{navigationItems.map((item) => {
						const Icon = getNavIcon(item);

						return (
							<NavLink className="flex min-w-0 flex-col items-center gap-1 rounded-lg px-1 py-2 text-[0.68rem] font-bold text-[var(--text-muted)] transition hover:bg-[var(--surface-2)] [&.active]:bg-[var(--accent-soft)] [&.active]:text-[var(--accent-strong)]" end={item.to === '/'} key={item.id} to={item.to}>
								<Icon aria-hidden="true" size={19} strokeWidth={2.3} />
								<span className="max-w-full truncate">{item.label}</span>
							</NavLink>
						);
					})}
				</div>
			</nav>
		</div>
	);
}

function ProgressMetric({ icon: Icon, label, value }: { icon: typeof Trophy; label: string; value: number }) {
	return (
		<div className="rounded-lg border border-[var(--border-soft)] bg-[var(--surface-2)] p-3 text-center">
			<Icon aria-hidden="true" className="mx-auto mb-2 text-[var(--accent)]" size={18} strokeWidth={2.4} />
			<p className="text-lg font-black leading-none">{value}</p>
			<p className="mt-1 text-xs font-bold text-[var(--text-muted)]">{label}</p>
		</div>
	);
}
