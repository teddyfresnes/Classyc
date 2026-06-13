import { motion } from 'framer-motion';
import {
	Bell,
	BookOpenCheck,
	CheckCircle2,
	ChevronRight,
	Flame,
	Home,
	Lock,
	MessageCircle,
	Play,
	Settings,
	Sparkles,
	Trophy,
	UserRound,
	UsersRound
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { supportedLanguages } from '@classyc/shared';
import type { NavigationItem, NavigationItemId } from '@/domain/navigation';
import { navigationItems } from '@/domain/navigation';
import {
	focusActions,
	levelNodes,
	metricPreviews,
	shellSections,
	socialPreviews
} from '@/features/shell/shell-content';
import type { LevelNodePreview, MetricPreview, ShellSectionPreview } from '@/features/shell/shell-content';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const navigationIcons: Record<NavigationItemId, LucideIcon> = {
	home: Home,
	learn: BookOpenCheck,
	friends: UsersRound,
	messages: MessageCircle,
	profile: UserRound
};

const metricIcons: Record<MetricPreview['id'], LucideIcon> = {
	xp: Trophy,
	level: BookOpenCheck,
	streak: Flame
};

function getActiveItem(pathname: string) {
	return navigationItems.find((item) => item.to === pathname || (item.to !== '/' && pathname.startsWith(item.to))) ?? navigationItems[0];
}

function navigationClassName({ isActive }: { isActive: boolean }) {
	return [
		'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition duration-200',
		'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]',
		isActive
			? 'bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-[inset_3px_0_0_var(--accent)]'
			: 'text-[var(--text-muted)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)]'
	].join(' ');
}

export function AppShell() {
	const activeItem = getActiveItem(useLocation().pathname);

	return (
		<div className="min-h-screen bg-[var(--surface-1)] text-[var(--text-primary)]">
			<div className="mx-auto flex min-h-screen max-w-[1440px]">
				<DesktopSidebar />

				<div className="flex min-w-0 flex-1 flex-col pb-[5.25rem] lg:pb-0">
					<ShellHeader activeItem={activeItem} />

					<main className="flex-1 px-4 py-4 sm:px-6 lg:px-8">
						<Routes>
							<Route element={<DashboardHome />} path="/" />
							<Route element={<ShellSection section={shellSections.learn} />} path="/learn" />
							<Route element={<ShellSection section={shellSections.friends} />} path="/friends" />
							<Route element={<ShellSection section={shellSections.messages} />} path="/messages" />
							<Route element={<ShellSection section={shellSections.profile} />} path="/profile" />
							<Route element={<DashboardHome />} path="*" />
						</Routes>
					</main>
				</div>
			</div>

			<MobileNavigation />
		</div>
	);
}

function DesktopSidebar() {
	return (
		<aside className="hidden w-72 shrink-0 border-r border-[var(--border-soft)] bg-[var(--surface-2)] px-4 py-5 lg:flex lg:flex-col">
			<div className="mb-7 flex items-center gap-3 px-2">
				<div className="grid size-11 place-items-center rounded-lg bg-[var(--accent)] text-white shadow-sm">
					<Sparkles aria-hidden="true" size={22} strokeWidth={2.4} />
				</div>
				<div className="min-w-0">
					<p className="truncate text-xl font-black leading-tight">Classyc</p>
					<p className="truncate text-xs font-semibold text-[var(--text-muted)]">Apprendre avec rythme</p>
				</div>
			</div>

			<nav aria-label="Navigation principale" className="space-y-1">
				{navigationItems.map((item) => {
					const Icon = navigationIcons[item.id];

					return (
						<NavLink className={navigationClassName} end={item.to === '/'} key={item.id} to={item.to}>
							<Icon aria-hidden="true" size={19} strokeWidth={2.35} />
							<span className="min-w-0 truncate">{item.label}</span>
						</NavLink>
					);
				})}
			</nav>

			<div className="mt-auto rounded-lg border border-[var(--border-soft)] bg-[var(--surface-1)] p-3">
				<div className="flex items-center gap-3">
					<div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[var(--surface-3)] text-[var(--accent-strong)]">
						<UserRound aria-hidden="true" size={19} strokeWidth={2.35} />
					</div>
					<div className="min-w-0">
						<p className="truncate text-sm font-black">Invite</p>
						<p className="truncate text-xs font-semibold text-[var(--text-muted)]">Progression locale</p>
					</div>
				</div>
			</div>
		</aside>
	);
}

function ShellHeader({ activeItem }: { activeItem: NavigationItem }) {
	return (
		<header className="sticky top-0 z-10 border-b border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-1)_92%,transparent)] px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
			<div className="flex items-center justify-between gap-4">
				<div className="min-w-0">
					<div className="mb-1 flex items-center gap-2 lg:hidden">
						<div className="grid size-8 place-items-center rounded-lg bg-[var(--accent)] text-white">
							<Sparkles aria-hidden="true" size={17} strokeWidth={2.4} />
						</div>
						<p className="text-sm font-black">Classyc</p>
					</div>
					<h1 className="truncate text-xl font-black leading-tight sm:text-2xl">{activeItem.label}</h1>
					<p className="hidden truncate text-sm font-semibold text-[var(--text-muted)] sm:block">{activeItem.description}</p>
				</div>

				<div className="flex shrink-0 items-center gap-2">
					<IconButton icon={Bell} label="Notifications" />
					<ThemeToggle />
					<IconButton icon={Settings} label="Parametres" />
				</div>
			</div>
		</header>
	);
}

function DashboardHome() {
	return (
		<div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
			<div className="space-y-4">
				<motion.section
					animate={{ opacity: 1, y: 0 }}
					className="focus-panel"
					initial={{ opacity: 0, y: 8 }}
					transition={{ duration: 0.32, ease: 'easeOut' }}
				>
					<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
						<div className="max-w-2xl">
							<p className="mb-2 text-sm font-black text-[var(--accent-strong)]">Aujourd hui</p>
							<h2 className="text-2xl font-black leading-tight sm:text-4xl">Un depart simple, puis une progression claire.</h2>
							<p className="mt-3 max-w-xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">
								Le shell est pret pour accueillir langue, personnage, diagnostic et parcours sans surcharger le premier ecran.
							</p>
						</div>
						<NavLink className="primary-action" to="/learn">
							<Play aria-hidden="true" size={18} fill="currentColor" strokeWidth={2.2} />
							<span>Continuer</span>
						</NavLink>
					</div>
				</motion.section>

				<section className="grid gap-3 md:grid-cols-3">
					{focusActions.map((item) => (
						<article className="app-panel p-4" key={item.id}>
							<p className="text-xs font-black text-[var(--text-muted)]">{item.label}</p>
							<p className="mt-2 text-lg font-black">{item.value}</p>
							<p className="mt-1 text-sm font-semibold text-[var(--text-muted)]">{item.detail}</p>
						</article>
					))}
				</section>

				<LearningPathPreview />
			</div>

			<aside className="space-y-4">
				<ProgressPanel />
				<LanguagePanel />
				<SocialPanel />
			</aside>
		</div>
	);
}

function LearningPathPreview() {
	return (
		<section className="app-panel p-4 sm:p-5">
			<div className="mb-5 flex items-center justify-between gap-3">
				<div className="min-w-0">
					<h2 className="truncate text-lg font-black">Chemin d apprentissage</h2>
					<p className="mt-1 text-sm font-semibold text-[var(--text-muted)]">Diagnostic, campagne et routine gardent chacun leur place.</p>
				</div>
				<NavLink aria-label="Ouvrir le parcours" className="icon-action" to="/learn">
					<ChevronRight aria-hidden="true" size={19} strokeWidth={2.5} />
				</NavLink>
			</div>

			<div className="grid gap-3 md:grid-cols-4">
				{levelNodes.map((node) => (
					<LevelNodeCard key={node.id} node={node} />
				))}
			</div>
		</section>
	);
}

function LevelNodeCard({ node }: { node: LevelNodePreview }) {
	const Icon = node.state === 'ready' ? CheckCircle2 : node.state === 'next' ? Sparkles : Lock;

	return (
		<article className="level-node">
			<div className={`level-node__icon level-node__icon--${node.state}`}>
				<Icon aria-hidden="true" size={20} strokeWidth={2.5} />
			</div>
			<div className="min-w-0">
				<h3 className="truncate text-sm font-black">{node.label}</h3>
				<p className="mt-1 truncate text-xs font-bold text-[var(--text-muted)]">{node.detail}</p>
			</div>
		</article>
	);
}

function ProgressPanel() {
	return (
		<section className="app-panel p-4">
			<div className="mb-4 flex items-center justify-between gap-3">
				<h2 className="text-base font-black">Progression</h2>
				<span className="rounded-md bg-[var(--surface-3)] px-2 py-1 text-xs font-black text-[var(--text-muted)]">Invite</span>
			</div>
			<div className="space-y-3">
				{metricPreviews.map((metric) => {
					const Icon = metricIcons[metric.id];

					return (
						<div className="metric-row" key={metric.id}>
							<div className={`metric-row__icon metric-row__icon--${metric.tone}`}>
								<Icon aria-hidden="true" size={18} strokeWidth={2.45} />
							</div>
							<div className="min-w-0 flex-1">
								<div className="flex items-center justify-between gap-3">
									<p className="truncate text-sm font-black">{metric.label}</p>
									<p className="text-sm font-black">{metric.value}</p>
								</div>
								<p className="mt-1 truncate text-xs font-bold text-[var(--text-muted)]">{metric.detail}</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}

function LanguagePanel() {
	return (
		<section className="app-panel p-4">
			<h2 className="mb-3 text-base font-black">Langues</h2>
			<div className="grid gap-2">
				{supportedLanguages.map((language) => (
					<div className="language-row" key={language.code}>
						<span className="text-sm font-black">{language.label}</span>
						<span className="truncate text-xs font-bold text-[var(--text-muted)]">{language.nativeLabel}</span>
					</div>
				))}
			</div>
		</section>
	);
}

function SocialPanel() {
	return (
		<section className="app-panel p-4">
			<div className="mb-3 flex items-center justify-between gap-3">
				<h2 className="text-base font-black">Social</h2>
				<MessageCircle aria-hidden="true" className="text-[var(--accent-strong)]" size={18} strokeWidth={2.4} />
			</div>
			<div className="space-y-2">
				{socialPreviews.map((item) => (
					<div className="social-row" key={item.id}>
						<div className="min-w-0">
							<p className="truncate text-sm font-black">{item.name}</p>
							<p className="mt-1 truncate text-xs font-bold text-[var(--text-muted)]">{item.detail}</p>
						</div>
						<span className="rounded-md bg-[var(--surface-3)] px-2 py-1 text-xs font-black text-[var(--text-muted)]">{item.meta}</span>
					</div>
				))}
			</div>
		</section>
	);
}

function ShellSection({ section }: { section: ShellSectionPreview }) {
	const Icon = navigationIcons[section.id];

	return (
		<div className="mx-auto max-w-5xl space-y-4">
			<section className="section-band">
				<div className="grid size-12 place-items-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-strong)]">
					<Icon aria-hidden="true" size={23} strokeWidth={2.45} />
				</div>
				<div className="min-w-0">
					<p className="text-sm font-black text-[var(--accent-strong)]">{section.kicker}</p>
					<h2 className="mt-1 text-2xl font-black leading-tight sm:text-3xl">{section.title}</h2>
					<p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">{section.summary}</p>
				</div>
			</section>

			<section className="grid gap-3 md:grid-cols-3">
				{section.panels.map((panel) => (
					<article className="app-panel p-4" key={panel.id}>
						<div className="mb-4 flex items-start justify-between gap-3">
							<h3 className="min-w-0 text-base font-black">{panel.title}</h3>
							<span className="shrink-0 rounded-md bg-[var(--surface-3)] px-2 py-1 text-xs font-black text-[var(--text-muted)]">{panel.meta}</span>
						</div>
						<p className="text-sm leading-6 text-[var(--text-muted)]">{panel.detail}</p>
					</article>
				))}
			</section>
		</div>
	);
}

function MobileNavigation() {
	return (
		<nav aria-label="Navigation mobile" className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--border-soft)] bg-[var(--surface-2)] px-2 py-2 shadow-[0_-10px_28px_rgba(15,23,42,0.08)] lg:hidden">
			<div className="mx-auto grid max-w-md grid-cols-5 gap-1">
				{navigationItems.map((item) => {
					const Icon = navigationIcons[item.id];

					return (
						<NavLink className="mobile-nav-link" end={item.to === '/'} key={item.id} to={item.to}>
							<Icon aria-hidden="true" size={19} strokeWidth={2.35} />
							<span className="max-w-full truncate">{item.shortLabel}</span>
						</NavLink>
					);
				})}
			</div>
		</nav>
	);
}

function IconButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
	return (
		<button
			aria-label={label}
			className="icon-action"
			title={label}
			type="button"
		>
			<Icon aria-hidden="true" size={19} strokeWidth={2.35} />
		</button>
	);
}
