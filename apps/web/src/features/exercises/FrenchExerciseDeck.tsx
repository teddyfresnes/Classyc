import type { LearningExercise } from '@classyc/shared';
import { ExerciseDeck } from './ExerciseDeck';
import { getExerciseCopy } from './exercise-copy';
import { getExerciseDeckContent } from './exercise-content';

interface FrenchExerciseDeckProps {
	exercises?: readonly LearningExercise[];
}

export function FrenchExerciseDeck({
	exercises = getExerciseDeckContent('fr', 'fr').exercises
}: FrenchExerciseDeckProps) {
	return <ExerciseDeck copy={getExerciseCopy('fr')} exercises={exercises} title="Leçon 1" />;
}
