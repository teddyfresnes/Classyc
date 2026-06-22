import { useMemo, useState } from 'react';
import type {
	ExerciseAnswer,
	ExerciseEvaluation,
	ExerciseMatchItem,
	ExercisePronunciationHint,
	ImageChoiceExercise,
	LearningExercise,
	MatchingExercise,
	ReadingComprehensionExercise,
	ReadingComprehensionQuestion,
	WordOrderExercise
} from '@classyc/shared';
import { resolveOpenMojiIconSrc } from '@/assets/openmoji';

interface ExercisePreviewProps {
	exercise: LearningExercise;
	answer?: ExerciseAnswer;
	evaluation?: ExerciseEvaluation;
	onAnswerChange?: (answer: ExerciseAnswer) => void;
}

export function ExercisePreview({ answer, evaluation, exercise, onAnswerChange }: ExercisePreviewProps) {
	return (
		<section className="exercise-preview" aria-label={exercise.prompt}>
			<header className="exercise-preview__header">
				{exercise.openMojiHexcode ? (
					<OpenMojiPicture className="exercise-preview__icon" hexcode={exercise.openMojiHexcode} />
				) : null}
				<div className="min-w-0">
					<h2 className="exercise-preview__prompt">{exercise.prompt}</h2>
					{exercise.instruction ? <p className="exercise-preview__instruction">{exercise.instruction}</p> : null}
					{exercise.pronunciationHint ? <PronunciationHint hint={exercise.pronunciationHint} /> : null}
				</div>
			</header>

			<div className="exercise-preview__body">
				{renderExerciseBody(exercise, answer, onAnswerChange)}
			</div>

			{evaluation ? (
				<footer className={`exercise-preview__feedback exercise-preview__feedback--${evaluation.feedback}`}>
					<span>{formatExerciseFeedback(evaluation.feedback)}</span>
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
				<OptionList
					answer={answer?.type === 'multipleChoice' ? answer.optionId : undefined}
					onAnswerChange={(optionId) => onAnswerChange?.({ exerciseId: exercise.id, type: 'multipleChoice', optionId })}
					options={exercise.options}
					readOnly={!onAnswerChange}
				/>
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
					<OptionList
						answer={answer?.type === 'trueFalse' ? String(answer.value) : undefined}
						onAnswerChange={(optionId) => (
							onAnswerChange?.({ exerciseId: exercise.id, type: 'trueFalse', value: optionId === 'true' })
						)}
						options={[
							{ id: 'true', label: 'Vrai', openMojiHexcode: '2705' },
							{ id: 'false', label: 'Faux', openMojiHexcode: '274C' }
						]}
						readOnly={!onAnswerChange}
						variant="binary"
					/>
				</div>
			);
		case 'readingComprehension':
			return <ReadingExerciseBody answer={answer} exercise={exercise} onAnswerChange={onAnswerChange} />;
		case 'matching':
			return <MatchingExerciseBody answer={answer} exercise={exercise} onAnswerChange={onAnswerChange} />;
		case 'imageChoice':
			return <ImageChoiceExerciseBody answer={answer} exercise={exercise} onAnswerChange={onAnswerChange} />;
		case 'wordOrder':
			return <WordOrderExerciseBody answer={answer} exercise={exercise} onAnswerChange={onAnswerChange} />;
	}
}

function OptionList({
	answer,
	onAnswerChange,
	options,
	readOnly,
	variant
}: {
	answer: string | undefined;
	onAnswerChange: (optionId: string) => void;
	options: readonly {
		id: string;
		label: string;
		openMojiHexcode?: string;
		pronunciationHint?: ExercisePronunciationHint;
	}[];
	readOnly: boolean;
	variant?: 'binary';
}) {
	return (
		<div className={`exercise-option-list${variant === 'binary' ? ' exercise-option-list--binary' : ''}`}>
			{options.map((option) => (
				<button
					aria-label={formatOptionAccessibleLabel(option.label, option.pronunciationHint)}
					aria-pressed={answer === option.id}
					className="exercise-option"
					data-selected={answer === option.id}
					disabled={readOnly}
					key={option.id}
					onClick={() => onAnswerChange(option.id)}
					title={formatPronunciationTitle(option.pronunciationHint)}
					type="button"
				>
					<OptionLabel
						label={option.label}
						openMojiHexcode={option.openMojiHexcode}
						pronunciationHint={option.pronunciationHint}
					/>
				</button>
			))}
		</div>
	);
}

function ImageChoiceExerciseBody({
	answer,
	exercise,
	onAnswerChange
}: {
	answer: ExerciseAnswer | undefined;
	exercise: ImageChoiceExercise;
	onAnswerChange: ExercisePreviewProps['onAnswerChange'];
}) {
	return (
		<div className="exercise-image-choice">
			<figure className="exercise-image-choice__picture">
				<OpenMojiPicture alt={exercise.imageAlt} hexcode={exercise.imageOpenMojiHexcode} />
			</figure>
			<OptionList
				answer={answer?.type === 'imageChoice' ? answer.optionId : undefined}
				onAnswerChange={(optionId) => onAnswerChange?.({ exerciseId: exercise.id, type: 'imageChoice', optionId })}
				options={exercise.options}
				readOnly={!onAnswerChange}
			/>
		</div>
	);
}

function MatchingExerciseBody({
	answer,
	exercise,
	onAnswerChange
}: {
	answer: ExerciseAnswer | undefined;
	exercise: MatchingExercise;
	onAnswerChange: ExercisePreviewProps['onAnswerChange'];
}) {
	const [activeLeftId, setActiveLeftId] = useState<string | null>(null);
	const matches = answer?.type === 'matching' ? answer.matches : [];
	const rightItems = useMemo(() => rotateMatchingItems(exercise.pairs.map((pair) => pair.right)), [exercise.pairs]);
	const matchedRightByLeftId = Object.fromEntries(matches.map((match) => [match.leftId, match.rightId]));
	const matchedLeftByRightId = Object.fromEntries(matches.map((match) => [match.rightId, match.leftId]));

	function chooseRight(rightId: string) {
		if (!activeLeftId) {
			return;
		}

		onAnswerChange?.(createMatchingAnswer(answer, exercise.id, activeLeftId, rightId));
		setActiveLeftId(null);
	}

	return (
		<div className="exercise-matching" aria-label={exercise.prompt}>
			<div className="exercise-matching__column">
				{exercise.pairs.map((pair) => {
					const isActive = activeLeftId === pair.left.id;
					const isMatched = Boolean(matchedRightByLeftId[pair.left.id]);

					return (
						<MatchButton
							item={pair.left}
							key={pair.left.id}
							onClick={() => setActiveLeftId(pair.left.id)}
							state={isActive ? 'active' : isMatched ? 'matched' : 'idle'}
						/>
					);
				})}
			</div>
			<div className="exercise-matching__column">
				{rightItems.map((item) => {
					const isMatched = Boolean(matchedLeftByRightId[item.id]);
					const isActiveMatch = activeLeftId ? matchedRightByLeftId[activeLeftId] === item.id : false;

					return (
						<MatchButton
							item={item}
							key={item.id}
							onClick={() => chooseRight(item.id)}
							state={isActiveMatch ? 'active' : isMatched ? 'matched' : 'idle'}
						/>
					);
				})}
			</div>
		</div>
	);
}

function MatchButton({
	item,
	onClick,
	state
}: {
	item: ExerciseMatchItem;
	onClick: () => void;
	state: 'active' | 'idle' | 'matched';
}) {
	return (
		<button
			aria-pressed={state !== 'idle'}
			className="exercise-match-card"
			data-state={state}
			onClick={onClick}
			title={formatPronunciationTitle(item.pronunciationHint)}
			type="button"
		>
			<OptionLabel
				label={item.label}
				openMojiHexcode={item.openMojiHexcode}
				pronunciationHint={item.pronunciationHint}
			/>
		</button>
	);
}

function WordOrderExerciseBody({
	answer,
	exercise,
	onAnswerChange
}: {
	answer: ExerciseAnswer | undefined;
	exercise: WordOrderExercise;
	onAnswerChange: ExercisePreviewProps['onAnswerChange'];
}) {
	const selectedTokenIds = answer?.type === 'wordOrder' ? answer.tokenIds : [];
	const selectedTokens = selectedTokenIds
		.map((tokenId) => exercise.tokens.find((token) => token.id === tokenId))
		.filter((token): token is WordOrderExercise['tokens'][number] => Boolean(token));
	const remainingTokens = exercise.tokens.filter((token) => !selectedTokenIds.includes(token.id));

	function addToken(tokenId: string) {
		onAnswerChange?.({
			exerciseId: exercise.id,
			type: 'wordOrder',
			tokenIds: [...selectedTokenIds, tokenId]
		});
	}

	function removeToken(index: number) {
		onAnswerChange?.({
			exerciseId: exercise.id,
			type: 'wordOrder',
			tokenIds: selectedTokenIds.filter((_, tokenIndex) => tokenIndex !== index)
		});
	}

	return (
		<div className="exercise-word-order">
			<div className="exercise-word-order__answer" aria-label="Réponse">
				{selectedTokens.length > 0 ? (
					selectedTokens.map((token, index) => (
						<button
							className="exercise-word-token exercise-word-token--selected"
							key={`${token.id}-${index}`}
							onClick={() => removeToken(index)}
							title={formatPronunciationTitle(token.pronunciationHint)}
							type="button"
						>
							<OptionLabel label={token.label} pronunciationHint={token.pronunciationHint} />
						</button>
					))
				) : (
					<span className="exercise-word-order__placeholder">...</span>
				)}
			</div>
			<div className="exercise-word-order__bank">
				{remainingTokens.map((token) => (
					<button
						className="exercise-word-token"
						key={token.id}
						onClick={() => addToken(token.id)}
						title={formatPronunciationTitle(token.pronunciationHint)}
						type="button"
					>
						<OptionLabel label={token.label} pronunciationHint={token.pronunciationHint} />
					</button>
				))}
			</div>
		</div>
	);
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
				{exercise.pronunciationHint ? <PronunciationHint hint={exercise.pronunciationHint} /> : null}
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
			{question.pronunciationHint ? <PronunciationHint hint={question.pronunciationHint} /> : null}
			<OptionList
				answer={selectedOptionId}
				onAnswerChange={(optionId) => onAnswerChange?.(createReadingAnswer(answer, exerciseId, question.id, optionId))}
				options={question.options}
				readOnly={!onAnswerChange}
			/>
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

function createMatchingAnswer(
	currentAnswer: ExerciseAnswer | undefined,
	exerciseId: string,
	leftId: string,
	rightId: string
): Extract<ExerciseAnswer, { type: 'matching' }> {
	const previousMatches = currentAnswer?.type === 'matching' ? currentAnswer.matches : [];
	const matches = [
		...previousMatches.filter((match) => match.leftId !== leftId && match.rightId !== rightId),
		{ leftId, rightId }
	];

	return {
		exerciseId,
		type: 'matching',
		matches
	};
}

function rotateMatchingItems(items: readonly ExerciseMatchItem[]) {
	if (items.length <= 2) {
		return [...items].reverse();
	}

	return [...items.slice(1), items[0]];
}

function PronunciationHint({ hint }: { hint: ExercisePronunciationHint }) {
	return (
		<p className="exercise-pronunciation" title={formatPronunciationTitle(hint)}>
			<span>{hint.pinyin}</span>
			{hint.meaning ? <span>{hint.meaning}</span> : null}
		</p>
	);
}

function OptionLabel({
	label,
	openMojiHexcode,
	pronunciationHint
}: {
	label: string;
	openMojiHexcode?: string;
	pronunciationHint?: ExercisePronunciationHint;
}) {
	return (
		<span className="exercise-option__content">
			{openMojiHexcode ? <OpenMojiPicture className="exercise-option__icon" hexcode={openMojiHexcode} /> : null}
			<span className="exercise-option__text">
				<span>{label}</span>
				{pronunciationHint ? (
					<span className="exercise-option__hint" aria-hidden="true">
						{pronunciationHint.pinyin}
					</span>
				) : null}
			</span>
		</span>
	);
}

function OpenMojiPicture({
	alt = '',
	className,
	hexcode
}: {
	alt?: string;
	className?: string;
	hexcode: string;
}) {
	return (
		<img
			alt={alt}
			className={className}
			draggable={false}
			src={resolveOpenMojiIconSrc(hexcode)}
		/>
	);
}

function formatPronunciationTitle(hint: ExercisePronunciationHint | undefined) {
	if (!hint) {
		return undefined;
	}

	return hint.meaning ? `${hint.pinyin} - ${hint.meaning}` : hint.pinyin;
}

function formatOptionAccessibleLabel(label: string, hint: ExercisePronunciationHint | undefined) {
	const hintLabel = formatPronunciationTitle(hint);

	return hintLabel ? `${label} - ${hintLabel}` : label;
}

function formatExerciseFeedback(feedback: ExerciseEvaluation['feedback']) {
	const labels: Record<ExerciseEvaluation['feedback'], string> = {
		correct: 'Bien joué',
		incorrect: 'À revoir',
		partial: 'Presque'
	};

	return labels[feedback];
}
