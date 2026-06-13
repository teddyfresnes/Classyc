import { AnimatePresence, motion } from 'framer-motion';
import {
	Bell,
	BookOpenCheck,
	MessageCircle,
	Settings,
	Trophy,
	UserRound,
	UsersRound
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import type { GuestProfile } from '@classyc/shared';
import type { ShellRouteId } from '@/domain/navigation';
import { navigationItems } from '@/domain/navigation';
import { BrandLogo } from '@/components/ui/brand-logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { getLanguageOption, getUiCopy } from '@/features/i18n/ui-copy';
import {
	createDailyQuests,
	createShellSections,
	getLearningSummary,
	levelNodes
} from '@/features/shell/shell-content';
import type { DailyQuestPreview, LevelNodePreview, ShellSectionPreview } from '@/features/shell/shell-content';

const routeIcons: Record<ShellRouteId, LucideIcon> = {
	learn: BookOpenCheck,
	stats: Trophy,
	friends: UsersRound,
	messages: MessageCircle,
	settings: Settings,
	profile: UserRound
};

const levelRoadPath = [
	'M180 72',
	'C226 100 258 132 238 176',
	'C218 222 182 236 180 280',
	'C178 324 128 338 122 384',
	'C116 430 164 448 180 488',
	'C196 528 238 548 238 592',
	'C238 632 206 656 180 682'
].join(' ');

function navigationClassName({ isActive }: { isActive: boolean }) {
	return `nav-link${isActive ? ' active' : ''}`;
}

export function AppShell({ profile }: { profile: GuestProfile }) {
	const location = useLocation();
	const copy = getUiCopy(profile.nativeLanguage);
	const shellSections = createShellSections(profile.nativeLanguage);

	return (
		<div className="app-shell">
			<div className="mx-auto flex h-full max-w-[1440px]">
				<DesktopSidebar copy={copy} profile={profile} />

				<div className="flex min-h-0 min-w-0 flex-1 flex-col pb-[5.25rem] lg:pb-0">
					<ShellHeader copy={copy} profile={profile} />

					<main className="app-main">
						<AnimatePresence mode="wait">
							<Routes key={location.pathname} location={location}>
								<Route
									element={<PageTransition><LearningHome profile={profile} /></PageTransition>}
									path="/"
								/>
								<Route
									element={<PageTransition><ShellSection section={shellSections.stats} /></PageTransition>}
									path="/stats"
								/>
								<Route
									element={<PageTransition><ShellSection section={shellSections.friends} /></PageTransition>}
									path="/friends"
								/>
								<Route
									element={<PageTransition><ShellSection section={shellSections.messages} /></PageTransition>}
									path="/messages"
								/>
								<Route
									element={<PageTransition><SettingsPage copy={copy} /></PageTransition>}
									path="/settings"
								/>
								<Route
									element={<PageTransition><ShellSection section={shellSections.profile} /></PageTransition>}
									path="/profile"
								/>
								<Route
									element={<PageTransition><LearningHome profile={profile} /></PageTransition>}
									path="*"
								/>
							</Routes>
						</AnimatePresence>
					</main>
				</div>
			</div>

			<MobileNavigation copy={copy} />
		</div>
	);
}

function PageTransition({ children }: { children: ReactNode }) {
	return (
		<motion.div
			animate={{ opacity: 1, y: 0, scale: 1 }}
			className="page-transition"
			exit={{ opacity: 0, y: 8, scale: 0.99 }}
			initial={{ opacity: 0, y: 10, scale: 0.99 }}
			transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
}

function DesktopSidebar({ copy, profile }: { copy: ReturnType<typeof getUiCopy>; profile: GuestProfile }) {
	return (
		<aside className="desktop-sidebar">
			<div className="mb-7 px-2">
				<BrandLogo />
			</div>

			<nav aria-label="Navigation principale" className="sidebar-nav">
				{navigationItems.map((item) => {
					const Icon = routeIcons[item.id];
					const itemCopy = copy.navigation[item.id];

					return (
						<NavLink className={navigationClassName} end={item.to === '/'} key={item.id} to={item.to}>
							<span className="nav-link__icon">
								<Icon aria-hidden="true" size={18} strokeWidth={2.35} />
							</span>
							<span className="min-w-0 truncate">{itemCopy.label}</span>
						</NavLink>
					);
				})}
			</nav>

			<div className="sidebar-footer">
				<div className="sidebar-profile-card">
					<NavLink className="profile-link" to="/profile">
						<div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[var(--surface-3)] text-[var(--accent-strong)]">
							<UserRound aria-hidden="true" size={19} strokeWidth={2.35} />
						</div>
						<div className="min-w-0">
							<p className="truncate text-sm font-black">{profile.firstName}</p>
							<p className="truncate text-xs font-semibold text-[var(--text-muted)]">{copy.guestMode}</p>
						</div>
					</NavLink>
					<IconButton icon={Bell} label={copy.notifications} variant="flat" />
				</div>
			</div>
		</aside>
	);
}

function ShellHeader({ copy, profile }: { copy: ReturnType<typeof getUiCopy>; profile: GuestProfile }) {
	return (
		<header className="shell-header">
			<div className="flex items-center justify-between gap-4">
				<div className="lg:hidden">
					<BrandLogo />
				</div>
				<div className="hidden lg:block" />
				<HeaderProgress copy={copy} profile={profile} />
			</div>
		</header>
	);
}

function HeaderProgress({ copy, profile }: { copy: ReturnType<typeof getUiCopy>; profile: GuestProfile }) {
	const target = getLanguageOption(profile.targetLanguage, profile.nativeLanguage);

	return (
		<div className="top-progress" aria-label={copy.progress}>
			<div className="top-progress__item top-progress__item--xp" title={`${target.label} - ${profile.progress.xp} ${copy.xp}`}>
				<span className="top-progress__flag" aria-hidden="true">{target.flag}</span>
				<span className="tabular-nums">{profile.progress.xp}</span>
				<span className="text-xs font-black text-[var(--text-muted)]">{copy.xp}</span>
			</div>
			<div className="top-progress__item top-progress__item--streak" title={copy.streak}>
				<StreakMark />
				<span className="tabular-nums">{profile.progress.streakDays}</span>
			</div>
		</div>
	);
}

function StreakMark() {
	return (
		<span className="streak-mark" aria-hidden="true">
			<svg viewBox="0 0 32 32" focusable="false">
				<path
					className="streak-mark__outer"
					d="M17 29.5c6.1 0 10.2-4 10.2-9.6 0-3.9-1.9-7-5.6-9.5-.6-.4-1.3.1-1.2.8.2 1.8-.3 3.1-1.5 4.1-.9-4.2-3.5-7.8-7.2-10.5-.7-.5-1.6 0-1.6.9-.1 5-4.8 7-4.8 13.1 0 6.2 4.8 10.7 11.7 10.7Z"
				/>
				<path
					className="streak-mark__inner"
					d="M16.6 27.2c3.1 0 5.2-2 5.2-4.8 0-1.9-.9-3.5-2.8-4.7-.4-.3-.9 0-.9.5.1 1.1-.2 2-.9 2.6-.5-2.2-1.8-4.1-3.8-5.6-.4-.3-1 0-1 .5-.1 2.7-2.6 3.8-2.6 7 0 2.7 2.4 4.5 6.8 4.5Z"
				/>
				<path
					className="streak-mark__shine"
					d="M13 10.2c1.5 1.4 2.7 3.1 3.5 5.1.2.6 1.1.5 1.2-.1.1-.8 0-1.5-.1-2.1-.6-1.3-1.5-2.7-2.6-3.9-.7-.8-2.4.2-2 1Z"
				/>
			</svg>
		</span>
	);
}

function LearningHome({ profile }: { profile: GuestProfile }) {
	const summary = getLearningSummary(profile);
	const quests = createDailyQuests(profile.nativeLanguage);

	return (
		<div className="learn-grid">
			<motion.section
				animate={{ opacity: 1, y: 0 }}
				className="learn-path"
				initial={{ opacity: 0, y: 8 }}
				transition={{ duration: 0.28, ease: 'easeOut' }}
			>
				<div className="unit-ribbon">
					<div className="min-w-0">
						<p className="text-xs font-black uppercase tracking-[0.12em] text-white/80">Section 1</p>
						<h1 className="truncate text-2xl font-black text-white sm:text-3xl">{summary.mapTitle}</h1>
					</div>
				</div>

				<div className="level-map" aria-label={summary.title}>
					<svg className="level-map__canvas" viewBox="0 0 360 740" role="img" aria-label={summary.title}>
						<path className="level-road level-road--base" d={levelRoadPath} pathLength={100} />
						<path className="level-road level-road--progress" d={levelRoadPath} pathLength={100} />
						{levelNodes.map((node, index) => (
							<LevelNodeCard index={index} key={node.id} node={node} />
						))}
					</svg>
				</div>
			</motion.section>

			<aside className="learn-side">
				<h2 className="mb-4 text-lg font-black">{summary.dailyQuests}</h2>
				<div className="space-y-3">
					{quests.map((quest, index) => (
						<DailyQuestCard index={index} key={quest.id} quest={quest} />
					))}
				</div>
			</aside>
		</div>
	);
}

function LevelNodeCard({ index, node }: { index: number; node: LevelNodePreview }) {
	return (
		<g className={`map-node map-node--${node.state}`} transform={`translate(${node.x} ${node.y})`}>
			<motion.g
				animate={{ opacity: 1, scale: 1 }}
				initial={{ opacity: 0, scale: 0.92 }}
				style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
				transition={{ delay: index * 0.045, duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
			>
				<title>{node.reward ? `Niveau ${node.label} - 1.5x d'XP gagné en plus` : `Niveau ${node.label}`}</title>
				<circle className="map-node__ring" r="38" />
				<circle className="map-node__disc" r="29" />
				<text className="map-node__number" dominantBaseline="central" textAnchor="middle">
					{node.label}
				</text>
				{node.reward ? (
					<g className="map-node__reward" transform="translate(31 -27)">
						<rect height="24" rx="12" width="46" x="-23" y="-12" />
						<text dominantBaseline="central" textAnchor="middle">1.5x</text>
					</g>
				) : null}
			</motion.g>
		</g>
	);
}

function DailyQuestCard({ index, quest }: { index: number; quest: DailyQuestPreview }) {
	return (
		<motion.article
			animate={{ opacity: 1, x: 0 }}
			className="daily-quest"
			initial={{ opacity: 0, x: 10 }}
			transition={{ delay: index * 0.04, duration: 0.2, ease: 'easeOut' }}
			whileHover={{ y: -1 }}
		>
			<span className={`daily-quest__dot daily-quest__dot--${quest.state}`} aria-hidden="true" />
			<div className="min-w-0 flex-1">
				<p className="truncate text-sm font-black">{quest.label}</p>
				<div className="mt-2 h-2 rounded-full bg-[var(--surface-3)]">
					<div className="h-full w-0 rounded-full bg-[var(--accent)]" />
				</div>
			</div>
			<span className="rounded-md bg-[var(--surface-3)] px-2 py-1 text-xs font-black text-[var(--text-muted)]">{quest.value}</span>
		</motion.article>
	);
}

function ShellSection({ section }: { section: ShellSectionPreview }) {
	const Icon = routeIcons[section.id];

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
				{section.panels.map((panel, index) => (
					<motion.article
						animate={{ opacity: 1, y: 0 }}
						className="app-panel p-4"
						initial={{ opacity: 0, y: 8 }}
						key={panel.id}
						transition={{ delay: index * 0.04, duration: 0.2, ease: 'easeOut' }}
						whileHover={{ y: -2 }}
					>
						<div className="mb-4 flex items-start justify-between gap-3">
							<h3 className="min-w-0 text-base font-black">{panel.title}</h3>
							<span className="shrink-0 rounded-md bg-[var(--surface-3)] px-2 py-1 text-xs font-black text-[var(--text-muted)]">{panel.meta}</span>
						</div>
						<p className="text-sm leading-6 text-[var(--text-muted)]">{panel.detail}</p>
					</motion.article>
				))}
			</section>
		</div>
	);
}

function SettingsPage({ copy }: { copy: ReturnType<typeof getUiCopy> }) {
	return (
		<div className="mx-auto max-w-3xl">
			<section className="settings-panel">
				<div className="settings-row">
					<div className="min-w-0">
						<h2 className="text-xl font-black">{copy.navigation.settings.label}</h2>
					</div>
					<ThemeToggle labelDark={copy.themeDark} labelLight={copy.themeLight} />
				</div>
			</section>
		</div>
	);
}

function MobileNavigation({ copy }: { copy: ReturnType<typeof getUiCopy> }) {
	return (
		<nav aria-label="Navigation mobile" className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--border-soft)] bg-[var(--surface-2)] px-2 py-2 shadow-[0_-10px_28px_rgba(15,23,42,0.08)] lg:hidden">
			<div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
				{navigationItems.map((item) => {
					const Icon = routeIcons[item.id];
					const itemCopy = copy.navigation[item.id];

					return (
						<NavLink className="mobile-nav-link" end={item.to === '/'} key={item.id} to={item.to}>
							<Icon aria-hidden="true" size={19} strokeWidth={2.35} />
							<span className="max-w-full truncate">{itemCopy.shortLabel}</span>
						</NavLink>
					);
				})}
			</div>
		</nav>
	);
}

function IconButton({ icon: Icon, label, variant = 'default' }: { icon: LucideIcon; label: string; variant?: 'default' | 'flat' }) {
	return (
		<button
			aria-label={label}
			className={`icon-action icon-action--${variant}`}
			title={label}
			type="button"
		>
			<Icon aria-hidden="true" size={19} strokeWidth={2.35} />
		</button>
	);
}
