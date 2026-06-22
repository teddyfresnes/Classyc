import type { LearningExercise } from '@classyc/shared';
import { ExerciseDeck } from './ExerciseDeck';
import { frenchStarterExercises } from './french-exercises';

interface FrenchExerciseDeckProps {
	exercises?: readonly LearningExercise[];
}

export function FrenchExerciseDeck({ exercises = frenchStarterExercises }: FrenchExerciseDeckProps) {
	return <ExerciseDeck eyebrow="Français" exercises={exercises} title="Premiers exercices" />;
}
