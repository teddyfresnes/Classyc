import { ArrowRight, Check, Home, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ExerciseAnswer, ExerciseEvaluation, LearningExercise } from '@classyc/shared';
import { evaluateExerciseAnswer, getExerciseMaxScore } from './exercise-engine';
import { ExercisePreview } from './ExercisePreview';

interface ExerciseDeckProps {
	eyebrow?: string;
	title: string;
	exercises: readonly LearningExercise[];
	exitPath?: string;
}

type AnswerByExerciseId = Record<string, ExerciseAnswer | undefined>;
type EvaluationByExerciseId = Record<string, ExerciseEvaluation | undefined>;

export function ExerciseDeck({ exitPath = '/', exercises, title }: ExerciseDeckProps) {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [answers, setAnswers] = useState<AnswerByExerciseId>({});
	const [evaluations, setEvaluations] = useState<EvaluationByExerciseId>({});
	const [isComplete, setIsComplete] = useState(false);
	const exercise = exercises[currentIndex];
	const answer = exercise ? answers[exercise.id] : undefined;
	const evaluation = exercise ? evaluations[exercise.id] : undefined;
	const score = useMemo(() => getDeckScore(exercises, evaluations), [evaluations, exercises]);
	const isLastExercise = currentIndex === exercises.length - 1;
	const canValidate = Boolean(exercise && answer && isExerciseAnswerComplete(exercise, answer));

	if (!exercise) {
		return null;
	}

	function handleAnswerChange(nextAnswer: ExerciseAnswer) {
		setAnswers((currentAnswers) => ({
			...currentAnswers,
			[nextAnswer.exerciseId]: nextAnswer
		}));
		setEvaluations((currentEvaluations) => ({
			...currentEvaluations,
			[nextAnswer.exerciseId]: undefined
		}));
	}

	function validateAnswer() {
		if (!answer) {
			return;
		}

		setEvaluations((currentEvaluations) => ({
			...currentEvaluations,
			[exercise.id]: evaluateExerciseAnswer(exercise, answer)
		}));
	}

	function goNext() {
		if (isLastExercise) {
			setIsComplete(true);
			return;
		}

		setCurrentIndex((index) => index + 1);
	}

	function restart() {
		setAnswers({});
		setEvaluations({});
		setCurrentIndex(0);
		setIsComplete(false);
	}

	if (isComplete) {
		return (
			<section className="exercise-deck exercise-deck--complete" aria-label={title}>
				<div className="exercise-complete-card">
					<div className="exercise-complete-card__mark">
						<Check aria-hidden="true" size={34} strokeWidth={2.6} />
					</div>
					<div className="min-w-0">
						<h1>Leçon terminée</h1>
						<p>{score.score}/{score.maxScore}</p>
					</div>
					<div className="exercise-deck__actions">
						<button className="secondary-action" onClick={restart} type="button">
							<RotateCcw aria-hidden="true" size={18} strokeWidth={2.35} />
							Rejouer
						</button>
						<button className="primary-action" onClick={() => navigate(exitPath)} type="button">
							<Home aria-hidden="true" size={18} strokeWidth={2.35} />
							Carte
						</button>
					</div>
				</div>
			</section>
		);
	}

	return (
		<div className="exercise-deck" aria-label={title}>
			<header className="exercise-deck__header">
				<div className="exercise-deck__bar" aria-hidden="true">
					<span style={{ width: `${Math.round(((currentIndex + 1) / exercises.length) * 100)}%` }} />
				</div>
				<span className="exercise-deck__progress">
					{currentIndex + 1}/{exercises.length}
				</span>
			</header>

			<ExercisePreview
				answer={answer}
				evaluation={evaluation}
				exercise={exercise}
				onAnswerChange={handleAnswerChange}
			/>

			<footer className="exercise-deck__footer">
				<div className="exercise-deck__actions">
					<button className="secondary-action" onClick={restart} type="button">
						<RotateCcw aria-hidden="true" size={18} strokeWidth={2.35} />
						Recommencer
					</button>
					{evaluation ? (
						<button className="primary-action" onClick={goNext} type="button">
							{isLastExercise ? (
								<RotateCcw aria-hidden="true" size={18} strokeWidth={2.35} />
							) : (
								<ArrowRight aria-hidden="true" size={18} strokeWidth={2.35} />
							)}
							{isLastExercise ? 'Terminer' : 'Suivant'}
						</button>
					) : (
						<button className="primary-action" disabled={!canValidate} onClick={validateAnswer} type="button">
							<Check aria-hidden="true" size={18} strokeWidth={2.35} />
							Valider
						</button>
					)}
				</div>
			</footer>
		</div>
	);
}

function getDeckScore(
	exercises: readonly LearningExercise[],
	evaluations: EvaluationByExerciseId
) {
	return exercises.reduce(
		(score, exercise) => {
			const evaluation = evaluations[exercise.id];

			return {
				score: score.score + (evaluation?.score ?? 0),
				maxScore: score.maxScore + getExerciseMaxScore(exercise),
				potentialXp: score.potentialXp + exercise.potentialXp,
				earnedPotentialXp: score.earnedPotentialXp + (evaluation?.earnedPotentialXp ?? 0)
			};
		},
		{
			score: 0,
			maxScore: 0,
			potentialXp: 0,
			earnedPotentialXp: 0
		}
	);
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
