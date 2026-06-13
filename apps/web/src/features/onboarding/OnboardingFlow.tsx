import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supportedLanguages } from '@classyc/shared';
import type { GuestProfile, SupportedLanguageCode } from '@classyc/shared';
import { BrandLogo } from '@/components/ui/brand-logo';
import { getLanguageOption, getUiCopy } from '@/features/i18n/ui-copy';
import { createGuestProfile, saveGuestProfile } from '@/features/onboarding/guest-profile-storage';

type SetupStep = 'languages' | 'name';

interface OnboardingFlowProps {
	onComplete: (profile: GuestProfile) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
	const [step, setStep] = useState<SetupStep>('languages');
	const [nativeLanguage, setNativeLanguage] = useState<SupportedLanguageCode | null>(null);
	const [targetLanguage, setTargetLanguage] = useState<SupportedLanguageCode | null>(null);
	const [firstName, setFirstName] = useState('');
	const [showAccountNote, setShowAccountNote] = useState(false);
	const copy = getUiCopy(nativeLanguage);
	const trimmedName = firstName.trim();
	const canContinueToName = Boolean(nativeLanguage && targetLanguage);
	const canStart = Boolean(nativeLanguage && targetLanguage && trimmedName.length >= 2);

	useEffect(() => {
		document.documentElement.lang = nativeLanguage ?? 'fr';
	}, [nativeLanguage]);

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
			targetLanguage
		});

		saveGuestProfile(profile);
		onComplete(profile);
	}

	return (
		<div className="onboarding-page">
			<header className="onboarding-header">
				<BrandLogo />
			</header>

			<main className="onboarding-main">
				<motion.form
					animate={{ opacity: 1, y: 0 }}
					className="onboarding-card space-y-5"
					initial={{ opacity: 0, y: 8 }}
					onSubmit={(event) => {
						event.preventDefault();

						if (step === 'languages' && canContinueToName) {
							setStep('name');
						}

						if (step === 'name' && canStart) {
							completeOnboarding();
						}
					}}
					transition={{ duration: 0.28, ease: 'easeOut' }}
				>
					<AnimatePresence mode="wait">
						{step === 'languages' && (
							<motion.div
								animate={{ opacity: 1, x: 0 }}
								className="space-y-5"
								exit={{ opacity: 0, x: -12 }}
								initial={{ opacity: 0, x: 12 }}
								key="languages"
								transition={{ duration: 0.2, ease: 'easeOut' }}
							>
								<section className="space-y-3">
									<h1 className="text-2xl font-black leading-tight sm:text-3xl">{copy.onboardingTitle}</h1>
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
									disabledText={copy.targetDisabled}
									label={copy.learnLanguage}
									onSelect={setTargetLanguage}
									selectedLanguage={targetLanguage}
								/>

								{showAccountNote && (
									<div className="account-note" role="status">
										<p className="text-sm font-black">{copy.accountUnavailable}</p>
										<p className="mt-1 text-sm font-semibold text-[var(--text-muted)]">{copy.loginLater}</p>
									</div>
								)}

								<div className="onboarding-actions">
									<button className="secondary-action" onClick={() => setShowAccountNote(true)} type="button">
										<LogIn aria-hidden="true" size={18} strokeWidth={2.35} />
										<span>{copy.alreadyAccount}</span>
									</button>
									<button className="primary-action" disabled={!canContinueToName} type="submit">
										<span>{copy.continue}</span>
										<ArrowRight aria-hidden="true" size={18} strokeWidth={2.35} />
									</button>
								</div>
							</motion.div>
						)}

						{step === 'name' && (
							<motion.div
								animate={{ opacity: 1, x: 0 }}
								className="space-y-5"
								exit={{ opacity: 0, x: 12 }}
								initial={{ opacity: 0, x: 12 }}
								key="name"
								transition={{ duration: 0.2, ease: 'easeOut' }}
							>
								<label className="block">
									<span className="mb-2 block text-sm font-black">{copy.firstName}</span>
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

								<div className="onboarding-actions">
									<button className="secondary-action" onClick={() => setStep('languages')} type="button">
										<ArrowLeft aria-hidden="true" size={18} strokeWidth={2.35} />
										<span>{copy.back}</span>
									</button>
									<button className="primary-action" disabled={!canStart} type="submit">
										<span>{copy.start}</span>
										<CheckCircle2 aria-hidden="true" size={18} strokeWidth={2.35} />
									</button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.form>
			</main>
		</div>
	);
}

function LanguageChoiceGrid({
	copyLanguage,
	disabledLanguage,
	disabledText,
	label,
	onSelect,
	selectedLanguage
}: {
	copyLanguage: SupportedLanguageCode | null;
	disabledLanguage: SupportedLanguageCode | null;
	disabledText?: string;
	label: string;
	onSelect: (language: SupportedLanguageCode) => void;
	selectedLanguage: SupportedLanguageCode | null;
}) {
	return (
		<section className="space-y-2">
			<h2 className="text-sm font-black">{label}</h2>
			<div className="grid gap-3 sm:grid-cols-3">
				{supportedLanguages.map((language) => {
					const option = getLanguageOption(language.code, copyLanguage);
					const isDisabled = disabledLanguage === language.code;

					return (
						<button
							aria-pressed={selectedLanguage === language.code}
							className="choice-card"
							data-selected={selectedLanguage === language.code}
							disabled={isDisabled}
							key={language.code}
							onClick={() => onSelect(language.code)}
							type="button"
						>
							<span className="text-2xl" aria-hidden="true">{option.flag}</span>
							<span className="mt-2 text-base font-black">{option.label}</span>
							<span className="mt-1 text-sm font-bold text-[var(--text-muted)]">
								{isDisabled && disabledText ? disabledText : option.nativeLabel}
							</span>
						</button>
					);
				})}
			</div>
		</section>
	);
}
