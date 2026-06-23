import { ArrowRight, Check, Home } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ExerciseAnswer, ExerciseEvaluation, LearningExercise } from '@classyc/shared';
import type { LessonCompletionContext, LessonCompletionResult } from '@/features/learning/progress';
import type { ExerciseDeckCopy } from './exercise-copy';
import { evaluateExerciseAnswer } from './exercise-engine';
import { ExercisePreview } from './ExercisePreview';

interface ExerciseDeckProps {
	copy: ExerciseDeckCopy;
	exercises: readonly LearningExercise[];
	completionContext?: LessonCompletionContext;
	exitPath?: string;
	onLessonComplete?: (context: LessonCompletionContext) => LessonCompletionResult;
	title: string;
}

interface ExerciseAttempt {
	attemptId: string;
	exercise: LearningExercise;
	retryIndex: number;
}

type AnswerByAttemptId = Record<string, ExerciseAnswer | undefined>;
type EvaluationByAttemptId = Record<string, ExerciseEvaluation | undefined>;

export function ExerciseDeck({
	completionContext,
	copy,
	exitPath = '/',
	exercises,
	onLessonComplete,
	title
}: ExerciseDeckProps) {
	const navigate = useNavigate();
	const [queue, setQueue] = useState<readonly ExerciseAttempt[]>(() => createInitialQueue(exercises));
	const [currentIndex, setCurrentIndex] = useState(0);
	const [answers, setAnswers] = useState<AnswerByAttemptId>({});
	const [evaluations, setEvaluations] = useState<EvaluationByAttemptId>({});
	const [masteredExerciseIds, setMasteredExerciseIds] = useState<readonly string[]>([]);
	const [completionResult, setCompletionResult] = useState<LessonCompletionResult | null>(null);
	const [isComplete, setIsComplete] = useState(false);
	const masteredExerciseIdSet = useMemo(() => new Set(masteredExerciseIds), [masteredExerciseIds]);
	const currentAttempt = queue[currentIndex];
	const exercise = currentAttempt?.exercise;
	const answer = currentAttempt ? answers[currentAttempt.attemptId] : undefined;
	const evaluation = currentAttempt ? evaluations[currentAttempt.attemptId] : undefined;
	const canValidate = Boolean(exercise && answer && !evaluation && isExerciseAnswerComplete(exercise, answer));
	const progressPercent = exercises.length > 0 ? Math.round((masteredExerciseIds.length / exercises.length) * 100) : 0;
	const retryCount = getPendingRetryCount(queue, currentIndex, masteredExerciseIdSet, evaluation);
	const willFinishAfterContinue = Boolean(
		evaluation?.correct
		&& !masteredExerciseIdSet.has(evaluation.exerciseId)
		&& masteredExerciseIds.length + 1 >= exercises.length
	);

	if (!exercise || !currentAttempt) {
		return null;
	}

	function handleAnswerChange(nextAnswer: ExerciseAnswer) {
		setAnswers((currentAnswers) => ({
			...currentAnswers,
			[currentAttempt.attemptId]: nextAnswer
		}));
		setEvaluations((currentEvaluations) => ({
			...currentEvaluations,
			[currentAttempt.attemptId]: undefined
		}));
	}

	function validateAnswer() {
		if (!answer) {
			return;
		}

		setEvaluations((currentEvaluations) => ({
			...currentEvaluations,
			[currentAttempt.attemptId]: evaluateExerciseAnswer(exercise, answer)
		}));
	}

	function continueLesson() {
		if (!evaluation) {
			return;
		}

		const nextMasteredExerciseIds = evaluation.correct && !masteredExerciseIdSet.has(evaluation.exerciseId)
			? [...masteredExerciseIds, evaluation.exerciseId]
			: masteredExerciseIds;

		if (!evaluation.correct) {
			setQueue((currentQueue) => [
				...currentQueue,
				createRetryAttempt(currentAttempt, currentQueue.length)
			]);
		}

		setMasteredExerciseIds(nextMasteredExerciseIds);

		if (evaluation.correct && nextMasteredExerciseIds.length >= exercises.length) {
			completeLesson();
			return;
		}

		setCurrentIndex((index) => index + 1);
	}

	function completeLesson() {
		if (!completionResult && completionContext && onLessonComplete) {
			setCompletionResult(onLessonComplete(completionContext));
		}

		setIsComplete(true);
	}

	if (isComplete) {
		return (
			<section className="exercise-deck exercise-deck--complete" aria-label={title}>
				<div className="exercise-complete-card">
					<div className="exercise-complete-card__mark">
						<Check aria-hidden="true" size={34} strokeWidth={2.6} />
					</div>
					<div className="min-w-0">
						<h1>{copy.lessonComplete}</h1>
						<p>{copy.scoreLabel(exercises.length, exercises.length)}</p>
					</div>
					{completionResult ? (
						<div className="exercise-complete-card__rewards" aria-label={copy.progressLabel}>
							<span className={completionResult.xpAwarded > 0 ? 'is-xp' : 'is-muted'}>
								{completionResult.xpAwarded > 0
									? copy.xpAwarded(completionResult.xpAwarded)
									: copy.noXpAwarded}
							</span>
							{completionResult.completedSteps !== undefined && completionResult.requiredSteps !== undefined ? (
								<span>
									{copy.levelProgress} {completionResult.completedSteps}/{completionResult.requiredSteps}
								</span>
							) : null}
						</div>
					) : null}
					<div className="exercise-deck__actions">
						<button className="primary-action" onClick={() => navigate(exitPath)} type="button">
							<Home aria-hidden="true" size={18} strokeWidth={2.35} />
							{copy.backToMap}
						</button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<div className="exercise-deck" aria-label={title}>
			<header className="exercise-deck__header">
				<div className="exercise-deck__bar" aria-label={copy.progressLabel} role="progressbar" aria-valuemax={exercises.length} aria-valuemin={0} aria-valuenow={masteredExerciseIds.length}>
					<span style={{ width: `${progressPercent}%` }} />
				</div>
				<div className="exercise-deck__status">
					<span className="exercise-deck__progress">
						{masteredExerciseIds.length}/{exercises.length}
					</span>
					{retryCount > 0 ? (
						<span className="exercise-deck__retry-count">{copy.retryCount(retryCount)}</span>
					) : null}
				</div>
			</header>

			<ExercisePreview
				answer={answer}
				copy={copy}
				evaluation={evaluation}
				exercise={exercise}
				onAnswerChange={handleAnswerChange}
			/>

			<footer className="exercise-deck__footer">
				<div className="exercise-deck__feedback-slot">
					{evaluation ? (
						<span className={`exercise-deck__feedback exercise-deck__feedback--${evaluation.feedback}`}>
							{copy.feedback[evaluation.feedback]}
						</span>
					) : null}
				</div>
				<div className="exercise-deck__actions">
					{evaluation ? (
						<button className="primary-action" onClick={continueLesson} type="button">
							{willFinishAfterContinue ? (
								<Check aria-hidden="true" size={18} strokeWidth={2.35} />
							) : (
								<ArrowRight aria-hidden="true" size={18} strokeWidth={2.35} />
							)}
							{willFinishAfterContinue ? copy.finish : copy.continue}
						</button>
					) : (
						<button className="primary-action" disabled={!canValidate} onClick={validateAnswer} type="button">
							<Check aria-hidden="true" size={18} strokeWidth={2.35} />
							{copy.validate}
						</button>
					)}
				</div>
			</footer>
		</div>
	);
}

function createInitialQueue(exercises: readonly LearningExercise[]) {
	return exercises.map((exercise, index) => ({
		attemptId: `${exercise.id}:0:${index}`,
		exercise,
		retryIndex: 0
	}));
}

function createRetryAttempt(attempt: ExerciseAttempt, queueLength: number): ExerciseAttempt {
	const retryIndex = attempt.retryIndex + 1;

	return {
		attemptId: `${attempt.exercise.id}:${retryIndex}:${queueLength}`,
		exercise: attempt.exercise,
		retryIndex
	};
}

function getPendingRetryCount(
	queue: readonly ExerciseAttempt[],
	currentIndex: number,
	masteredExerciseIds: ReadonlySet<string>,
	evaluation: ExerciseEvaluation | undefined
) {
	const pendingExerciseIds = new Set(
		queue
			.slice(currentIndex + 1)
			.filter((attempt) => attempt.retryIndex > 0)
			.map((attempt) => attempt.exercise.id)
			.filter((exerciseId) => !masteredExerciseIds.has(exerciseId))
	);

	if (evaluation && !evaluation.correct) {
		pendingExerciseIds.add(evaluation.exerciseId);
	}

	return pendingExerciseIds.size;
}

function isExerciseAnswerComplete(exercise: LearningExercise, answer: ExerciseAnswer) {
	if (exercise.id !== answer.exerciseId || exercise.type !== answer.type) {
		return false;
	}

	switch (answer.type) {
		case 'multipleChoice':
			return Boolean(answer.optionId);
		case 'fillBlank':
			return answer.value.trim().length > 0;
		case 'trueFalse':
			return typeof answer.value === 'boolean';
		case 'readingComprehension':
			return exercise.type === 'readingComprehension'
				&& exercise.questions.every((question) => (
					answer.answers.some((item) => item.questionId === question.id && item.optionId.length > 0)
				));
		case 'matching':
			return exercise.type === 'matching'
				&& exercise.pairs.every((pair) => (
					answer.matches.some((match) => match.leftId === pair.left.id && match.rightId.length > 0)
				));
		case 'imageChoice':
			return Boolean(answer.optionId);
		case 'wordOrder':
			return exercise.type === 'wordOrder' && answer.tokenIds.length === exercise.tokens.length;
	}
}
