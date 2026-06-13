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
		description: 'Placement initial prepare pour choisir le bon depart.',
		meta: 'Etape 3'
	},
	{
		id: 'campaign',
		title: 'Campagne',
		description: 'Carte de niveaux et bonus XP prevus pour la progression.',
		meta: 'Etape 7'
	},
	{
		id: 'daily',
		title: 'Journalier',
		description: 'Niveaux courts a difficulte variable pour garder le rythme.',
		meta: 'Etape 8'
	}
];
