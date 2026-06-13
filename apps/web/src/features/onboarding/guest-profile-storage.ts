import type { GuestProfile, SupportedLanguageCode } from '@classyc/shared';

const storageKey = 'classyc-guest-profile';
const languageCodes: readonly SupportedLanguageCode[] = ['fr', 'en', 'zh'];

interface GuestProfileInput {
	firstName: string;
	nativeLanguage: SupportedLanguageCode;
	targetLanguage: SupportedLanguageCode;
}

function isSupportedLanguageCode(value: unknown): value is SupportedLanguageCode {
	return typeof value === 'string' && languageCodes.includes(value as SupportedLanguageCode);
}

function isGuestProfile(value: unknown): value is GuestProfile {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const profile = value as Partial<GuestProfile>;

	return (
		profile.mode === 'guest'
		&& typeof profile.id === 'string'
		&& typeof profile.firstName === 'string'
		&& profile.firstName.trim().length > 0
		&& isSupportedLanguageCode(profile.nativeLanguage)
		&& isSupportedLanguageCode(profile.targetLanguage)
		&& profile.nativeLanguage !== profile.targetLanguage
		&& typeof profile.createdAt === 'string'
		&& typeof profile.onboardingCompletedAt === 'string'
	);
}

function createGuestId() {
	if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
		return crypto.randomUUID();
	}

	return `guest-${Date.now()}`;
}

export function createGuestProfile(input: GuestProfileInput): GuestProfile {
	const now = new Date().toISOString();

	return {
		id: createGuestId(),
		mode: 'guest',
		firstName: input.firstName.trim(),
		nativeLanguage: input.nativeLanguage,
		targetLanguage: input.targetLanguage,
		progress: {
			xp: 0,
			streakDays: 0
		},
		createdAt: now,
		onboardingCompletedAt: now
	};
}

export function loadGuestProfile() {
	try {
		const storedProfile = window.localStorage.getItem(storageKey);

		if (!storedProfile) {
			return null;
		}

		const parsedProfile = JSON.parse(storedProfile) as unknown;

		return isGuestProfile(parsedProfile) ? parsedProfile : null;
	} catch {
		return null;
	}
}

export function saveGuestProfile(profile: GuestProfile) {
	window.localStorage.setItem(storageKey, JSON.stringify(profile));
}
