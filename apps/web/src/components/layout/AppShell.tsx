import { motion } from 'framer-motion';
import {
	Bell,
	BookOpenCheck,
	ChevronRight,
	Lock,
	MessageCircle,
	Settings,
	Star,
	Trophy,
	UserRound,
	UsersRound
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { NavLink, Route, Routes } from 'react-router-dom';
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

function navigationClassName({ isActive }: { isActive: boolean }) {
	return [
		'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition duration-200',
		'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]',
		isActive
			? 'bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-[inset_3px_0_0_var(--accent)]'
			: 'text-[var(--text-muted)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)]'
	].join(' ');
}

export function AppShell({ profile }: { profile: GuestProfile }) {
	const copy = getUiCopy(profile.nativeLanguage);
	const shellSections = createShellSections(profile.nativeLanguage);

	return (
		<div className="app-shell">
			<div className="mx-auto flex h-full max-w-[1440px]">
				<DesktopSidebar copy={copy} profile={profile} />

				<div className="flex min-h-0 min-w-0 flex-1 flex-col pb-[5.25rem] lg:pb-0">
					<ShellHeader copy={copy} profile={profile} />

					<main className="app-main">
						<Routes>
							<Route element={<LearningHome profile={profile} />} path="/" />
							<Route element={<ShellSection section={shellSections.stats} />} path="/stats" />
							<Route element={<ShellSection section={shellSections.friends} />} path="/friends" />
							<Route element={<ShellSection section={shellSections.messages} />} path="/messages" />
							<Route element={<SettingsPage copy={copy} />} path="/settings" />
							<Route element={<ShellSection section={shellSections.profile} />} path="/profile" />
							<Route element={<LearningHome profile={profile} />} path="*" />
						</Routes>
					</main>
				</div>
			</div>

			<MobileNavigation copy={copy} />
		</div>
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
							<Icon aria-hidden="true" size={19} strokeWidth={2.35} />
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
			<div className="top-progress__item" title={`${target.label} - ${profile.progress.xp} ${copy.xp}`}>
				<span className="text-lg leading-none" aria-hidden="true">{target.flag}</span>
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
					<button className="ribbon-action" type="button">
						<span>{summary.next}</span>
						<ChevronRight aria-hidden="true" size={18} strokeWidth={2.35} />
					</button>
				</div>

				<div className="level-map" aria-label={summary.title}>
					{levelNodes.map((node, index) => (
						<LevelNodeCard index={index} key={node.id} node={node} />
					))}
				</div>
			</motion.section>

			<aside className="app-panel p-4 sm:p-5">
				<h2 className="mb-4 text-lg font-black">{summary.dailyQuests}</h2>
				<div className="space-y-3">
					{quests.map((quest) => (
						<DailyQuestCard key={quest.id} quest={quest} />
					))}
				</div>
			</aside>
		</div>
	);
}

function LevelNodeCard({ index, node }: { index: number; node: LevelNodePreview }) {
	const Icon = node.state === 'locked' ? Lock : Star;

	return (
		<div className="level-map-row" data-side={index % 2 === 0 ? 'left' : 'right'}>
			<article className="map-node">
				<div className={`map-node__icon map-node__icon--${node.state}`}>
					<Icon aria-hidden="true" size={22} strokeWidth={2.5} />
				</div>
				<div className="min-w-0">
					<h3 className="truncate text-sm font-black">{node.label}</h3>
					<p className="mt-1 truncate text-xs font-bold text-[var(--text-muted)]">{node.detail}</p>
				</div>
			</article>
		</div>
	);
}

function DailyQuestCard({ quest }: { quest: DailyQuestPreview }) {
	return (
		<article className="daily-quest">
			<div className="min-w-0">
				<p className="truncate text-sm font-black">{quest.label}</p>
				<div className="mt-2 h-2 rounded-full bg-[var(--surface-3)]">
					<div className="h-full w-0 rounded-full bg-[var(--accent)]" />
				</div>
			</div>
			<span className="rounded-md bg-[var(--surface-3)] px-2 py-1 text-xs font-black text-[var(--text-muted)]">{quest.value}</span>
		</article>
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
