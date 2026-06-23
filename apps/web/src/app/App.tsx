import { MotionConfig } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { GuestProfile } from '@classyc/shared';
import { AppShell } from '@/components/layout/AppShell';
import { OnboardingFlow } from '@/features/onboarding/OnboardingFlow';
import { loadGuestProfile, saveGuestProfile } from '@/features/onboarding/guest-profile-storage';

export function App() {
	const [guestProfile, setGuestProfile] = useState<GuestProfile | null>(() => loadGuestProfile());

	useEffect(() => {
		document.documentElement.lang = guestProfile?.nativeLanguage ?? 'fr';
	}, [guestProfile?.nativeLanguage]);

	function updateGuestProfile(nextProfile: GuestProfile) {
		saveGuestProfile(nextProfile);
		setGuestProfile(nextProfile);
	}

	return (
		<MotionConfig reducedMotion="user">
			{guestProfile ? (
				<AppShell onProfileChange={updateGuestProfile} profile={guestProfile} />
			) : (
				<OnboardingFlow onComplete={setGuestProfile} />
			)}
		</MotionConfig>
	);
}
