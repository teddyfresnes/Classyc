import type {
	ExerciseAnswer,
	ExerciseEvaluation,
	ExerciseFeedbackState,
	LearningExercise,
	ReadingComprehensionExercise
} from '@classyc/shared';

export function evaluateExerciseAnswer(exercise: LearningExercise, answer: ExerciseAnswer): ExerciseEvaluation {
	if (exercise.id !== answer.exerciseId || exercise.type !== answer.type) {
		return createExerciseEvaluation(exercise, 0, getExerciseMaxScore(exercise));
	}

	switch (exercise.type) {
		case 'multipleChoice':
			if (answer.type !== 'multipleChoice') {
				return createExerciseEvaluation(exercise, 0, 1);
			}

			return createExerciseEvaluation(exercise, answer.optionId === exercise.correctOptionId ? 1 : 0, 1);
		case 'fillBlank':
			if (answer.type !== 'fillBlank') {
				return createExerciseEvaluation(exercise, 0, 1);
			}

			return createExerciseEvaluation(exercise, isAcceptedFillBlankAnswer(answer.value, exercise.acceptedAnswers) ? 1 : 0, 1);
		case 'trueFalse':
			if (answer.type !== 'trueFalse') {
				return createExerciseEvaluation(exercise, 0, 1);
			}

			return createExerciseEvaluation(exercise, answer.value === exercise.correctAnswer ? 1 : 0, 1);
		case 'readingComprehension':
			if (answer.type !== 'readingComprehension') {
				return createExerciseEvaluation(exercise, 0, getExerciseMaxScore(exercise));
			}

			return createExerciseEvaluation(
				exercise,
				countCorrectReadingAnswers(exercise, answer.answers),
				getExerciseMaxScore(exercise)
			);
		case 'matching':
			if (answer.type !== 'matching') {
				return createExerciseEvaluation(exercise, 0, getExerciseMaxScore(exercise));
			}

			return createExerciseEvaluation(
				exercise,
				countCorrectMatches(exercise, answer.matches),
				getExerciseMaxScore(exercise)
			);
		case 'imageChoice':
			if (answer.type !== 'imageChoice') {
				return createExerciseEvaluation(exercise, 0, 1);
			}

			return createExerciseEvaluation(exercise, answer.optionId === exercise.correctOptionId ? 1 : 0, 1);
		case 'wordOrder':
			if (answer.type !== 'wordOrder') {
				return createExerciseEvaluation(exercise, 0, 1);
			}

			return createExerciseEvaluation(exercise, areTokenIdsEqual(answer.tokenIds, exercise.correctTokenIds) ? 1 : 0, 1);
	}
}

export function getExerciseMaxScore(exercise: LearningExercise) {
	if (exercise.type === 'readingComprehension') {
		return Math.max(1, exercise.questions.length);
	}

	if (exercise.type === 'matching') {
		return Math.max(1, exercise.pairs.length);
	}

	return 1;
}

function createExerciseEvaluation(exercise: LearningExercise, score: number, maxScore: number): ExerciseEvaluation {
	const safeMaxScore = Math.max(1, maxScore);
	const normalizedScore = Math.max(0, Math.min(score, safeMaxScore));
	const feedback = getExerciseFeedback(normalizedScore, safeMaxScore);

	return {
		exerciseId: exercise.id,
		correct: normalizedScore === safeMaxScore,
		score: normalizedScore,
		maxScore: safeMaxScore,
		potentialXp: exercise.potentialXp,
		earnedPotentialXp: Math.round((normalizedScore / safeMaxScore) * exercise.potentialXp),
		feedback
	};
}

function getExerciseFeedback(score: number, maxScore: number): ExerciseFeedbackState {
	if (score === maxScore) {
		return 'correct';
	}

	if (score > 0) {
		return 'partial';
	}

	return 'incorrect';
}

function isAcceptedFillBlankAnswer(value: string, acceptedAnswers: readonly string[]) {
	const normalizedValue = normalizeTextAnswer(value);

	return acceptedAnswers.some((answer) => normalizeTextAnswer(answer) === normalizedValue);
}

function countCorrectReadingAnswers(
	exercise: ReadingComprehensionExercise,
	answers: Extract<ExerciseAnswer, { type: 'readingComprehension' }>['answers']
) {
	const answersByQuestionId = Object.fromEntries(answers.map((answer) => [answer.questionId, answer.optionId]));

	return exercise.questions.filter((question) => answersByQuestionId[question.id] === question.correctOptionId).length;
}

function countCorrectMatches(
	exercise: Extract<LearningExercise, { type: 'matching' }>,
	matches: Extract<ExerciseAnswer, { type: 'matching' }>['matches']
) {
	const rightIdsByLeftId = Object.fromEntries(matches.map((match) => [match.leftId, match.rightId]));

	return exercise.pairs.filter((pair) => rightIdsByLeftId[pair.left.id] === pair.right.id).length;
}

function areTokenIdsEqual(answerTokenIds: readonly string[], correctTokenIds: readonly string[]) {
	return answerTokenIds.length === correctTokenIds.length
		&& answerTokenIds.every((tokenId, index) => tokenId === correctTokenIds[index]);
}

function normalizeTextAnswer(value: string) {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/\s+/g, ' ')
		.trim();
}
