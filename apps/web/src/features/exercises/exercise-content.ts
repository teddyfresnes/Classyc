import type { LearningExercise, SupportedLanguageCode } from '@classyc/shared';
import { chineseStarterExercises } from './chinese-exercises';
import { englishStarterExercises } from './english-exercises';
import { frenchStarterExercises } from './french-exercises';

export interface ExerciseDeckContent {
	language: SupportedLanguageCode;
	eyebrow: string;
	title: string;
	exercises: readonly LearningExercise[];
}

export const exerciseDeckContentByLanguage: Record<SupportedLanguageCode, ExerciseDeckContent> = {
	en: {
		language: 'en',
		eyebrow: 'English',
		title: 'First exercises',
		exercises: englishStarterExercises
	},
	fr: {
		language: 'fr',
		eyebrow: 'Français',
		title: 'Premiers exercices',
		exercises: frenchStarterExercises
	},
	zh: {
		language: 'zh',
		eyebrow: '中文',
		title: 'Premiers exercices chinois',
		exercises: chineseStarterExercises
	}
};

export function getExerciseDeckContent(language: SupportedLanguageCode) {
	return exerciseDeckContentByLanguage[language];
}
