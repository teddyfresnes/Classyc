import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, LogIn } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { defaultOpenPeepCharacterId, defaultOpenPeepCustomization, supportedLanguages } from '@classyc/shared';
import type { GuestProfile, OpenPeepCustomization, SupportedLanguageCode } from '@classyc/shared';
import { BrandLogo } from '@/components/ui/brand-logo';
import { CharacterCreator } from '@/features/character/CharacterCreator';
import { getLanguageOption, getUiCopy } from '@/features/i18n/ui-copy';
import { createGuestProfile, saveGuestProfile } from '@/features/onboarding/guest-profile-storage';

type SetupStep = 'languages' | 'name' | 'character';
type CharacterPanelPhase = 'idle' | 'expanding' | 'ready' | 'confirming';

const choiceCardVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 8
	},
	show: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: index * 0.03,
			duration: 0.2,
			ease: 'easeOut'
		}
	})
};

const stepTransition = {
	type: 'spring',
	stiffness: 360,
	damping: 32,
	mass: 0.8
} as const;

const characterExpansionMs = 260;
const characterCompletionMs = 2000;

interface OnboardingFlowProps {
	onComplete: (profile: GuestProfile) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
	const prefersReducedMotion = useReducedMotion();
	const [step, setStep] = useState<SetupStep>('languages');
	const [nativeLanguage, setNativeLanguage] = useState<SupportedLanguageCode | null>(null);
	const [targetLanguage, setTargetLanguage] = useState<SupportedLanguageCode | null>(null);
	const [firstName, setFirstName] = useState('');
	const [characterCustomization, setCharacterCustomization] = useState<OpenPeepCustomization>(defaultOpenPeepCustomization);
	const [characterPanelPhase, setCharacterPanelPhase] = useState<CharacterPanelPhase>('idle');
	const [showAccountNote, setShowAccountNote] = useState(false);
	const characterExpansionTimerRef = useRef<number | null>(null);
	const characterCompletionTimerRef = useRef<number | null>(null);
	const copy = getUiCopy(nativeLanguage);
	const trimmedName = firstName.trim();
	const canContinueToName = Boolean(nativeLanguage && targetLanguage);
	const canContinueToCharacter = Boolean(nativeLanguage && targetLanguage && trimmedName.length >= 2);
	const canStart = Boolean(nativeLanguage && targetLanguage && trimmedName.length >= 2);
	const nativeOption = nativeLanguage ? getLanguageOption(nativeLanguage, nativeLanguage) : null;
	const targetOption = targetLanguage ? getLanguageOption(targetLanguage, nativeLanguage) : null;

	useEffect(() => {
		document.documentElement.lang = nativeLanguage ?? 'fr';
	}, [nativeLanguage]);

	useEffect(() => {
		if (characterExpansionTimerRef.current !== null) {
			window.clearTimeout(characterExpansionTimerRef.current);
			characterExpansionTimerRef.current = null;
		}

		if (step !== 'character') {
			setCharacterPanelPhase('idle');
			return;
		}

		setCharacterPanelPhase('expanding');
		characterExpansionTimerRef.current = window.setTimeout(() => {
			setCharacterPanelPhase('ready');
			characterExpansionTimerRef.current = null;
		}, prefersReducedMotion ? 80 : characterExpansionMs);

		return () => {
			if (characterExpansionTimerRef.current !== null) {
				window.clearTimeout(characterExpansionTimerRef.current);
				characterExpansionTimerRef.current = null;
			}
		};
	}, [prefersReducedMotion, step]);

	useEffect(() => () => {
		if (characterCompletionTimerRef.current !== null) {
			window.clearTimeout(characterCompletionTimerRef.current);
		}
	}, []);

	function selectNativeLanguage(language: SupportedLanguageCode) {
		setNativeLanguage(language);
		setShowAccountNote(false);

		if (targetLanguage === language) {
			setTargetLanguage(null);
		}
	}

	function completeOnboarding() {
		if (!nativeLanguage || !targetLanguage || trimmedName.length < 2) {
			return;
		}

		const profile = createGuestProfile({
			firstName: trimmedName,
			nativeLanguage,
			targetLanguage,
			characterId: defaultOpenPeepCharacterId,
			characterCustomization
		});

		saveGuestProfile(profile);
		onComplete(profile);
	}

	function beginOnboardingCompletion() {
		if (!canStart || characterPanelPhase === 'confirming') {
			return;
		}

		setCharacterPanelPhase('confirming');
		characterCompletionTimerRef.current = window.setTimeout(() => {
			characterCompletionTimerRef.current = null;
			completeOnboarding();
		}, prefersReducedMotion ? 360 : characterCompletionMs);
	}

	return (
		<div className="onboarding-page">
			<header className="onboarding-header">
				<BrandLogo />
			</header>

			<main className="onboarding-main">
				<motion.form
					animate={{ opacity: 1, y: 0 }}
					className="onboarding-card"
					data-character-phase={step === 'character' ? characterPanelPhase : undefined}
					data-step={step}
					initial={{ opacity: 0, y: 8 }}
					layout
					onSubmit={(event) => {
						event.preventDefault();

						if (step === 'languages' && canContinueToName) {
							setStep('name');
						}

						if (step === 'name' && canContinueToCharacter) {
							setStep('character');
						}

						if (step === 'character' && canStart && characterPanelPhase === 'ready') {
							beginOnboardingCompletion();
						}
					}}
					transition={{
						layout: {
							duration: prefersReducedMotion ? 0 : characterPanelPhase === 'expanding' ? 0.28 : 0.32,
							ease: [0.22, 1, 0.36, 1]
						},
						opacity: { duration: 0.28, ease: 'easeOut' },
						y: { duration: 0.28, ease: 'easeOut' }
					}}
				>
					<AnimatePresence mode="wait">
						{step === 'languages' && (
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="onboarding-step onboarding-step--languages"
								exit={{ opacity: 0, y: -8 }}
								initial={{ opacity: 0, y: 10 }}
								key="languages"
								transition={stepTransition}
							>
								<div className="onboarding-step-body">
									<section className="space-y-3">
										<h1 className="onboarding-title">{copy.onboardingTitle}</h1>
										<LanguageChoiceGrid
											copyLanguage={nativeLanguage}
											disabledLanguage={null}
											label={copy.yourLanguage}
											onSelect={selectNativeLanguage}
											selectedLanguage={nativeLanguage}
										/>
									</section>

									<LanguageChoiceGrid
										copyLanguage={nativeLanguage}
										disabledLanguage={nativeLanguage}
										label={copy.learnLanguage}
										onSelect={setTargetLanguage}
										selectedLanguage={targetLanguage}
									/>

									<AnimatePresence>
										{showAccountNote && (
											<motion.div
												animate={{ opacity: 1, y: 0 }}
												className="account-note"
												exit={{ opacity: 0, y: -4 }}
												initial={{ opacity: 0, y: 6 }}
												role="status"
												transition={{ duration: 0.16, ease: 'easeOut' }}
											>
												<p className="text-sm font-bold">{copy.accountUnavailable}</p>
												<p className="mt-1 text-sm font-medium text-[var(--text-muted)]">{copy.loginLater}</p>
											</motion.div>
										)}
									</AnimatePresence>
								</div>

								<div className="onboarding-actions">
									<motion.button className="secondary-action" onClick={() => setShowAccountNote(true)} type="button" whileTap={{ scale: 0.98 }}>
										<LogIn aria-hidden="true" size={18} strokeWidth={2.35} />
										<span>{copy.alreadyAccount}</span>
									</motion.button>
									<motion.button className="primary-action" disabled={!canContinueToName} type="submit" whileTap={{ scale: 0.98 }}>
										<span>{copy.continue}</span>
										<ArrowRight aria-hidden="true" size={18} strokeWidth={2.35} />
									</motion.button>
								</div>
							</motion.div>
						)}

						{step === 'name' && (
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="onboarding-step onboarding-step--name"
								exit={{ opacity: 0, y: 8 }}
								initial={{ opacity: 0, y: 10 }}
								key="name"
								transition={stepTransition}
							>
								<div className="space-y-5">
									<motion.div
										animate={{ opacity: 1, y: 0 }}
										className="onboarding-name-intro"
										initial={{ opacity: 0, y: 10 }}
										transition={{ delay: 0.08, duration: 0.22, ease: 'easeOut' }}
									>
										<p className="onboarding-title">{copy.nameIntroTitle}</p>
										{nativeOption && targetOption ? (
											<div className="onboarding-language-pair" title={`${nativeOption.label} -> ${targetOption.label}`}>
												<span aria-hidden="true">{nativeOption.flag}</span>
												<ArrowRight aria-hidden="true" size={16} strokeWidth={2.35} />
												<span aria-hidden="true">{targetOption.flag}</span>
											</div>
										) : null}
									</motion.div>

									<label className="block">
										<span className="sr-only">{copy.firstName}</span>
										<input
											autoComplete="given-name"
											autoFocus
											className="text-input"
											maxLength={32}
											onChange={(event) => setFirstName(event.target.value)}
											placeholder={copy.namePlaceholder}
											type="text"
											value={firstName}
										/>
									</label>
								</div>

								<div className="onboarding-actions">
									<motion.button className="secondary-action" onClick={() => setStep('languages')} type="button" whileTap={{ scale: 0.98 }}>
										<ArrowLeft aria-hidden="true" size={18} strokeWidth={2.35} />
										<span>{copy.back}</span>
									</motion.button>
									<motion.button className="primary-action" disabled={!canContinueToCharacter} type="submit" whileTap={{ scale: 0.98 }}>
										<span>{copy.continue}</span>
										<ArrowRight aria-hidden="true" size={18} strokeWidth={2.35} />
									</motion.button>
								</div>
							</motion.div>
						)}

						{step === 'character' && (
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="onboarding-step onboarding-step--character"
								exit={{ opacity: 0, y: 8 }}
								initial={{ opacity: 0, y: 10 }}
								key="character"
								transition={stepTransition}
							>
								<AnimatePresence mode="wait">
									{characterPanelPhase === 'confirming' ? (
										<OnboardingCompletionMark key="completion" />
									) : characterPanelPhase === 'ready' ? (
										<motion.div
											animate={{ opacity: 1, scale: 1 }}
											className="onboarding-character-content"
											exit={{ opacity: 0, scale: 0.98 }}
											initial={{ opacity: 0, scale: 0.985 }}
											key="creator"
											transition={{ duration: 0.22, ease: 'easeOut' }}
										>
											<div className="onboarding-character-body">
												<motion.div
													animate={{ opacity: 1, y: 0 }}
													className="onboarding-character-intro"
													initial={{ opacity: 0, y: 10 }}
													transition={{ delay: 0.08, duration: 0.22, ease: 'easeOut' }}
												>
													<p className="onboarding-title">{copy.characterIntroTitle}</p>
													{nativeOption && targetOption ? (
														<div className="onboarding-language-pair" title={`${nativeOption.label} -> ${targetOption.label}`}>
															<span aria-hidden="true">{nativeOption.flag}</span>
															<ArrowRight aria-hidden="true" size={16} strokeWidth={2.35} />
															<span aria-hidden="true">{targetOption.flag}</span>
														</div>
													) : null}
												</motion.div>

												<CharacterCreator
													copy={copy.characterCreator}
													onChange={setCharacterCustomization}
													value={characterCustomization}
												/>
											</div>

											<div className="onboarding-actions">
												<motion.button className="secondary-action" onClick={() => setStep('name')} type="button" whileTap={{ scale: 0.98 }}>
													<ArrowLeft aria-hidden="true" size={18} strokeWidth={2.35} />
													<span>{copy.back}</span>
												</motion.button>
												<motion.button className="primary-action" disabled={!canStart} type="submit" whileTap={{ scale: 0.98 }}>
													<span>{copy.start}</span>
													<CheckCircle2 aria-hidden="true" size={18} strokeWidth={2.35} />
												</motion.button>
											</div>
										</motion.div>
									) : (
										<motion.div
											animate={{ opacity: 1 }}
											aria-hidden="true"
											className="onboarding-character-expansion"
											exit={{ opacity: 0 }}
											initial={{ opacity: 0 }}
											key="expansion"
											transition={{ duration: 0.18, ease: 'easeOut' }}
										/>
									)}
								</AnimatePresence>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.form>
			</main>
		</div>
	);
}

function OnboardingCompletionMark() {
	return (
		<motion.div
			animate={{ opacity: 1, scale: 1 }}
			aria-label="Validation en cours"
			className="onboarding-complete-state"
			exit={{ opacity: 0, scale: 0.96 }}
			initial={{ opacity: 0, scale: 0.92 }}
			key="completion"
			role="status"
			transition={{ duration: 0.22, ease: 'easeOut' }}
		>
			<motion.svg
				aria-hidden="true"
				className="onboarding-complete-icon"
				focusable="false"
				viewBox="0 0 96 96"
			>
				<motion.circle
					animate={{ pathLength: 1 }}
					cx="48"
					cy="48"
					fill="none"
					initial={{ pathLength: 0 }}
					r="34"
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="7"
					transition={{ duration: 0.62, ease: 'easeOut' }}
				/>
				<motion.path
					animate={{ pathLength: 1 }}
					d="M32 49.5 43.2 60.5 65 36.5"
					fill="none"
					initial={{ pathLength: 0 }}
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="8"
					transition={{ delay: 0.36, duration: 0.46, ease: 'easeOut' }}
				/>
			</motion.svg>
		</motion.div>
	);
}

function LanguageChoiceGrid({
	copyLanguage,
	disabledLanguage,
	label,
	onSelect,
	selectedLanguage
}: {
	copyLanguage: SupportedLanguageCode | null;
	disabledLanguage: SupportedLanguageCode | null;
	label: string;
	onSelect: (language: SupportedLanguageCode) => void;
	selectedLanguage: SupportedLanguageCode | null;
}) {
	return (
		<section className="space-y-2">
			<h2 className="onboarding-section-label">{label}</h2>
			<div className="grid gap-3 sm:grid-cols-3">
				{supportedLanguages.map((language, index) => {
					const option = getLanguageOption(language.code, copyLanguage);
					const isDisabled = disabledLanguage === language.code;

					return (
						<motion.button
							animate="show"
							aria-pressed={selectedLanguage === language.code}
							className="choice-card"
							custom={index}
							data-selected={selectedLanguage === language.code}
							disabled={isDisabled}
							initial="hidden"
							key={language.code}
							onClick={() => onSelect(language.code)}
							type="button"
							variants={choiceCardVariants}
							whileHover={isDisabled ? undefined : { y: -2 }}
							whileTap={{ scale: 0.98 }}
						>
							<span className="choice-card__top">
								<span className="choice-card__flag" aria-hidden="true">{option.flag}</span>
								{isDisabled ? (
									<span className="choice-card__lock" aria-hidden="true">
										<Lock size={14} strokeWidth={2.45} />
									</span>
								) : null}
							</span>
							<span className="choice-card__label">{option.label}</span>
						</motion.button>
					);
				})}
			</div>
		</section>
	);
}
