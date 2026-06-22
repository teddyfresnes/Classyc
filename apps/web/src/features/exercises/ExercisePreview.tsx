import type {
	ExerciseAnswer,
	ExerciseEvaluation,
	LearningExercise,
	ReadingComprehensionExercise,
	ReadingComprehensionQuestion
} from '@classyc/shared';
import { evaluateExerciseAnswer } from './exercise-engine';

interface ExercisePreviewProps {
	exercise: LearningExercise;
	answer?: ExerciseAnswer;
	evaluation?: ExerciseEvaluation;
	onAnswerChange?: (answer: ExerciseAnswer) => void;
}

export function ExercisePreview({ answer, evaluation, exercise, onAnswerChange }: ExercisePreviewProps) {
	const resolvedEvaluation = evaluation ?? (answer ? evaluateExerciseAnswer(exercise, answer) : undefined);

	return (
		<section className="exercise-preview" aria-label={exercise.prompt}>
			<header className="exercise-preview__header">
				<div className="min-w-0">
					<p className="exercise-preview__type">{formatExerciseType(exercise.type)}</p>
					<h2 className="exercise-preview__prompt">{exercise.prompt}</h2>
					{exercise.instruction ? <p className="exercise-preview__instruction">{exercise.instruction}</p> : null}
				</div>
				<span className="exercise-preview__xp">{exercise.potentialXp} XP</span>
			</header>

			<div className="exercise-preview__body">
				{renderExerciseBody(exercise, answer, onAnswerChange)}
			</div>

			{resolvedEvaluation ? (
				<footer className={`exercise-preview__feedback exercise-preview__feedback--${resolvedEvaluation.feedback}`}>
					<span>{formatExerciseFeedback(resolvedEvaluation.feedback)}</span>
					<span>{resolvedEvaluation.earnedPotentialXp}/{resolvedEvaluation.potentialXp} XP</span>
				</footer>
			) : null}
		</section>
	);
}

function renderExerciseBody(
	exercise: LearningExercise,
	answer: ExerciseAnswer | undefined,
	onAnswerChange: ExercisePreviewProps['onAnswerChange']
) {
	switch (exercise.type) {
		case 'multipleChoice':
			return (
				<div className="exercise-option-list">
					{exercise.options.map((option) => (
						<button
							aria-pressed={answer?.type === 'multipleChoice' && answer.optionId === option.id}
							className="exercise-option"
							data-selected={answer?.type === 'multipleChoice' && answer.optionId === option.id}
							disabled={!onAnswerChange}
							key={option.id}
							onClick={() => onAnswerChange?.({ exerciseId: exercise.id, type: 'multipleChoice', optionId: option.id })}
							type="button"
						>
							{option.label}
						</button>
					))}
				</div>
			);
		case 'fillBlank':
			return (
				<input
					aria-label={exercise.prompt}
					className="exercise-text-input"
					onChange={(event) => onAnswerChange?.({ exerciseId: exercise.id, type: 'fillBlank', value: event.target.value })}
					placeholder={exercise.placeholder}
					readOnly={!onAnswerChange}
					type="text"
					value={answer?.type === 'fillBlank' ? answer.value : ''}
				/>
			);
		case 'trueFalse':
			return (
				<div className="exercise-true-false">
					<p className="exercise-statement">{exercise.statement}</p>
					<div className="exercise-option-list exercise-option-list--binary">
						{[true, false].map((value) => (
							<button
								aria-pressed={answer?.type === 'trueFalse' && answer.value === value}
								className="exercise-option"
								data-selected={answer?.type === 'trueFalse' && answer.value === value}
								disabled={!onAnswerChange}
								key={String(value)}
								onClick={() => onAnswerChange?.({ exerciseId: exercise.id, type: 'trueFalse', value })}
								type="button"
							>
								{value ? 'Vrai' : 'Faux'}
							</button>
						))}
					</div>
				</div>
			);
		case 'readingComprehension':
			return <ReadingExerciseBody answer={answer} exercise={exercise} onAnswerChange={onAnswerChange} />;
	}
}

function ReadingExerciseBody({
	answer,
	exercise,
	onAnswerChange
}: {
	answer: ExerciseAnswer | undefined;
	exercise: ReadingComprehensionExercise;
	onAnswerChange: ExercisePreviewProps['onAnswerChange'];
}) {
	return (
		<div className="exercise-reading">
			<article className="exercise-reading__passage">
				{exercise.passageTitle ? <h3>{exercise.passageTitle}</h3> : null}
				<p>{exercise.passage}</p>
			</article>
			<div className="exercise-reading__questions">
				{exercise.questions.map((question) => (
					<ReadingQuestionCard
						answer={answer}
						exerciseId={exercise.id}
						key={question.id}
						onAnswerChange={onAnswerChange}
						question={question}
					/>
				))}
			</div>
		</div>
	);
}

function ReadingQuestionCard({
	answer,
	exerciseId,
	onAnswerChange,
	question
}: {
	answer: ExerciseAnswer | undefined;
	exerciseId: string;
	onAnswerChange: ExercisePreviewProps['onAnswerChange'];
	question: ReadingComprehensionQuestion;
}) {
	const selectedOptionId = answer?.type === 'readingComprehension'
		? answer.answers.find((item) => item.questionId === question.id)?.optionId
		: undefined;

	return (
		<section className="exercise-reading__question">
			<p>{question.prompt}</p>
			<div className="exercise-option-list">
				{question.options.map((option) => (
					<button
						aria-pressed={selectedOptionId === option.id}
						className="exercise-option"
						data-selected={selectedOptionId === option.id}
						disabled={!onAnswerChange}
						key={option.id}
						onClick={() => onAnswerChange?.(createReadingAnswer(answer, exerciseId, question.id, option.id))}
						type="button"
					>
						{option.label}
					</button>
				))}
			</div>
		</section>
	);
}

function createReadingAnswer(
	currentAnswer: ExerciseAnswer | undefined,
	exerciseId: string,
	questionId: string,
	optionId: string
): Extract<ExerciseAnswer, { type: 'readingComprehension' }> {
	const previousAnswers = currentAnswer?.type === 'readingComprehension' ? currentAnswer.answers : [];
	const answers = [
		...previousAnswers.filter((answer) => answer.questionId !== questionId),
		{ questionId, optionId }
	];

	return {
		exerciseId,
		type: 'readingComprehension',
		answers
	};
}

function formatExerciseType(type: LearningExercise['type']) {
	const labels: Record<LearningExercise['type'], string> = {
		fillBlank: 'Completer',
		multipleChoice: 'Choix multiple',
		readingComprehension: 'Lecture',
		trueFalse: 'Vrai / faux'
	};

	return labels[type];
}

function formatExerciseFeedback(feedback: ExerciseEvaluation['feedback']) {
	const labels: Record<ExerciseEvaluation['feedback'], string> = {
		correct: 'Correct',
		incorrect: 'A revoir',
		partial: 'Partiel'
	};

	return labels[feedback];
}
