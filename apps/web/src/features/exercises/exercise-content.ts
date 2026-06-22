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
		eyebrow: '',
		title: 'Lesson 1',
		exercises: englishStarterExercises
	},
	fr: {
		language: 'fr',
		eyebrow: '',
		title: 'Leçon 1',
		exercises: frenchStarterExercises
	},
	zh: {
		language: 'zh',
		eyebrow: '',
		title: '第 1 课',
		exercises: chineseStarterExercises
	}
};

export function getExerciseDeckContent(language: SupportedLanguageCode) {
	return exerciseDeckContentByLanguage[language];
}
