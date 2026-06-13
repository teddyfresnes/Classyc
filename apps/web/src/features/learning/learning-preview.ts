import type { PreviewProgress } from '@classyc/shared';

export interface LearningPreviewCard {
	id: string;
	title: string;
	description: string;
	meta: string;
}

export const progressPreview: PreviewProgress = {
	xp: 0,
	level: 1,
	streakDays: 0
};

export const learningPreviewCards: readonly LearningPreviewCard[] = [
	{
		id: 'diagnostic',
		title: 'Diagnostic',
		description: 'Quelques questions courtes pour placer le depart.',
		meta: 'Pret'
	},
	{
		id: 'campaign',
		title: 'Campagne',
		description: 'Un chemin de niveaux lisible pour avancer sans surcharge.',
		meta: 'Plan'
	},
	{
		id: 'daily',
		title: 'Journalier',
		description: 'Une session rapide avec une difficulte ajustee.',
		meta: 'Plan'
	}
];
