import { useEffect, useState } from 'react';
import type { GuestProfile } from '@classyc/shared';
import { AppShell } from '@/components/layout/AppShell';
import { OnboardingFlow } from '@/features/onboarding/OnboardingFlow';
import { loadGuestProfile } from '@/features/onboarding/guest-profile-storage';

export function App() {
	const [guestProfile, setGuestProfile] = useState<GuestProfile | null>(() => loadGuestProfile());

	useEffect(() => {
		document.documentElement.lang = guestProfile?.nativeLanguage ?? 'fr';
	}, [guestProfile?.nativeLanguage]);

	if (!guestProfile) {
		return <OnboardingFlow onComplete={setGuestProfile} />;
	}

	return <AppShell profile={guestProfile} />;
}
