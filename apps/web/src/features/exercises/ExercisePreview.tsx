import { useEffect, useMemo, useState } from 'react';
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
import type { ExerciseDeckCopy } from './exercise-copy';

interface ExercisePreviewProps {
	exercise: LearningExercise;
	answer?: ExerciseAnswer;
	copy: ExerciseDeckCopy;
	evaluation?: ExerciseEvaluation;
	onAnswerChange?: (answer: ExerciseAnswer) => void;
}

type ExerciseChoiceState = 'correct' | 'idle' | 'incorrect' | 'selected';
type MatchCardState = 'active' | 'correct' | 'idle' | 'incorrect';
type MatchSelection = { id: string; side: 'left' | 'right' };

export function ExercisePreview({ answer, copy, evaluation, exercise, onAnswerChange }: ExercisePreviewProps) {
	const writableAnswerChange = evaluation ? undefined : onAnswerChange;
	const title = getExerciseTitle(exercise, copy);
	const instruction = getExerciseInstruction(exercise, copy);

	return (
		<section className="exercise-preview" aria-label={title}>
			<header className="exercise-preview__header">
				{exercise.openMojiHexcode ? (
					<OpenMojiPicture className="exercise-preview__icon" hexcode={exercise.openMojiHexcode} />
				) : null}
				<div className="min-w-0">
					<h2 className="exercise-preview__prompt">{title}</h2>
					{instruction ? <p className="exercise-preview__instruction">{instruction}</p> : null}
					{exercise.pronunciationHint ? <PronunciationHint hint={exercise.pronunciationHint} /> : null}
				</div>
			</header>

			<div className="exercise-preview__body">
				{renderExerciseBody(exercise, answer, writableAnswerChange, evaluation, copy)}
			</div>
		</section>
	);
}

function renderExerciseBody(
	exercise: LearningExercise,
	answer: ExerciseAnswer | undefined,
	onAnswerChange: ExercisePreviewProps['onAnswerChange'],
	evaluation: ExerciseEvaluation | undefined,
	copy: ExerciseDeckCopy
) {
	switch (exercise.type) {
		case 'multipleChoice':
			return (
				<OptionList
					answer={answer?.type === 'multipleChoice' ? answer.optionId : undefined}
					onAnswerChange={(optionId) => onAnswerChange?.({ exerciseId: exercise.id, type: 'multipleChoice', optionId })}
					optionStates={getChoiceOptionStates(
						answer?.type === 'multipleChoice' ? answer.optionId : undefined,
						exercise.correctOptionId,
						evaluation
					)}
					options={exercise.options}
					readOnly={!onAnswerChange}
				/>
			);
		case 'fillBlank':
			return (
				<input
					aria-label={exercise.prompt}
					className="exercise-text-input"
					data-state={getTextInputState(answer, evaluation)}
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
						optionStates={getChoiceOptionStates(
							answer?.type === 'trueFalse' ? String(answer.value) : undefined,
							String(exercise.correctAnswer),
							evaluation
						)}
						options={[
							{ id: 'true', label: copy.trueFalse.true, openMojiHexcode: '2705' },
							{ id: 'false', label: copy.trueFalse.false, openMojiHexcode: '274C' }
						]}
						readOnly={!onAnswerChange}
						variant="binary"
					/>
				</div>
			);
		case 'readingComprehension':
			return (
				<ReadingExerciseBody
					answer={answer}
					evaluation={evaluation}
					exercise={exercise}
					onAnswerChange={onAnswerChange}
				/>
			);
		case 'matching':
			return <MatchingExerciseBody answer={answer} exercise={exercise} onAnswerChange={onAnswerChange} />;
		case 'imageChoice':
			return (
				<ImageChoiceExerciseBody
					answer={answer}
					evaluation={evaluation}
					exercise={exercise}
					onAnswerChange={onAnswerChange}
				/>
			);
		case 'wordOrder':
			return (
				<WordOrderExerciseBody
					answer={answer}
					copy={copy}
					evaluation={evaluation}
					exercise={exercise}
					onAnswerChange={onAnswerChange}
				/>
			);
	}
}

function OptionList({
	answer,
	onAnswerChange,
	optionStates,
	options,
	readOnly,
	shortcutStart = 1,
	variant
}: {
	answer: string | undefined;
	onAnswerChange: (optionId: string) => void;
	optionStates?: Record<string, ExerciseChoiceState>;
	options: readonly {
		id: string;
		label: string;
		openMojiHexcode?: string;
		pronunciationHint?: ExercisePronunciationHint;
	}[];
	readOnly: boolean;
	shortcutStart?: number;
	variant?: 'binary';
}) {
	useEffect(() => {
		if (readOnly) {
			return undefined;
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (isTypingTarget(event.target)) {
				return;
			}

			const shortcutNumber = getShortcutNumberFromKey(event);
			const option = shortcutNumber ? options[shortcutNumber - shortcutStart] : undefined;

			if (!option) {
				return;
			}

			event.preventDefault();
			onAnswerChange(option.id);
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [onAnswerChange, options, readOnly, shortcutStart]);

	return (
		<div className={`exercise-option-list${variant === 'binary' ? ' exercise-option-list--binary' : ''}`}>
			{options.map((option, index) => {
				const state = optionStates?.[option.id] ?? (answer === option.id ? 'selected' : 'idle');

				return (
					<button
						aria-label={formatOptionAccessibleLabel(option.label, option.pronunciationHint)}
						aria-pressed={state !== 'idle'}
						className="exercise-option"
						data-state={state}
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
							shortcutNumber={shortcutStart + index}
						/>
					</button>
				);
			})}
		</div>
	);
}

function ImageChoiceExerciseBody({
	answer,
	evaluation,
	exercise,
	onAnswerChange
}: {
	answer: ExerciseAnswer | undefined;
	evaluation: ExerciseEvaluation | undefined;
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
				optionStates={getChoiceOptionStates(
					answer?.type === 'imageChoice' ? answer.optionId : undefined,
					exercise.correctOptionId,
					evaluation
				)}
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
	const [activeSelection, setActiveSelection] = useState<MatchSelection | null>(null);
	const matches = answer?.type === 'matching' ? answer.matches : [];
	const rightItems = useMemo(() => rotateMatchingItems(exercise.pairs.map((pair) => pair.right)), [exercise.pairs]);
	const matchedRightByLeftId = Object.fromEntries(matches.map((match) => [match.leftId, match.rightId]));
	const matchedLeftByRightId = Object.fromEntries(matches.map((match) => [match.rightId, match.leftId]));
	const correctRightByLeftId = Object.fromEntries(exercise.pairs.map((pair) => [pair.left.id, pair.right.id]));

	useEffect(() => {
		if (!onAnswerChange) {
			return undefined;
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (isTypingTarget(event.target)) {
				return;
			}

			const shortcutNumber = getShortcutNumberFromKey(event);

			if (!shortcutNumber) {
				return;
			}

			const leftShortcutCount = exercise.pairs.length;
			const leftPair = exercise.pairs[shortcutNumber - 1];
			const rightItem = rightItems[shortcutNumber - leftShortcutCount - 1];

			if (leftPair) {
				event.preventDefault();
				chooseMatchItem({ id: leftPair.left.id, side: 'left' });
				return;
			}

			if (rightItem) {
				event.preventDefault();
				chooseMatchItem({ id: rightItem.id, side: 'right' });
			}
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	});

	function chooseMatchItem(selection: MatchSelection) {
		if (!onAnswerChange) {
			return;
		}

		if (activeSelection?.side === selection.side && activeSelection.id === selection.id) {
			setActiveSelection(null);
			return;
		}

		if (activeSelection && activeSelection.side !== selection.side) {
			const leftId = activeSelection.side === 'left' ? activeSelection.id : selection.id;
			const rightId = activeSelection.side === 'right' ? activeSelection.id : selection.id;

			onAnswerChange(createMatchingAnswer(answer, exercise.id, leftId, rightId));
			setActiveSelection(null);
			return;
		}

		setActiveSelection(selection);
	}

	return (
		<div className="exercise-matching" aria-label={exercise.prompt}>
			<div className="exercise-matching__column">
				{exercise.pairs.map((pair, index) => {
					const isActive = activeSelection?.side === 'left' && activeSelection.id === pair.left.id;
					const matchedRightId = matchedRightByLeftId[pair.left.id];

					return (
						<MatchButton
							disabled={!onAnswerChange}
							item={pair.left}
							key={pair.left.id}
							onClick={() => chooseMatchItem({ id: pair.left.id, side: 'left' })}
							shortcutNumber={index + 1}
							state={isActive ? 'active' : getMatchState(matchedRightId, pair.right.id)}
						/>
					);
				})}
			</div>
			<div className="exercise-matching__column">
				{rightItems.map((item, index) => {
					const matchedLeftId = matchedLeftByRightId[item.id];
					const isActive = activeSelection?.side === 'right' && activeSelection.id === item.id;
					const correctRightId = matchedLeftId ? correctRightByLeftId[matchedLeftId] : undefined;

					return (
						<MatchButton
							disabled={!onAnswerChange}
							item={item}
							key={item.id}
							onClick={() => chooseMatchItem({ id: item.id, side: 'right' })}
							shortcutNumber={exercise.pairs.length + index + 1}
							state={isActive ? 'active' : getMatchState(item.id, correctRightId)}
						/>
					);
				})}
			</div>
		</div>
	);
}

function MatchButton({
	disabled,
	item,
	onClick,
	shortcutNumber,
	state
}: {
	disabled: boolean;
	item: ExerciseMatchItem;
	onClick: () => void;
	shortcutNumber: number;
	state: MatchCardState;
}) {
	return (
		<button
			aria-pressed={state !== 'idle'}
			className="exercise-match-card"
			data-state={state}
			disabled={disabled}
			onClick={onClick}
			title={formatPronunciationTitle(item.pronunciationHint)}
			type="button"
		>
			<OptionLabel
				label={item.label}
				openMojiHexcode={item.openMojiHexcode}
				pronunciationHint={item.pronunciationHint}
				shortcutNumber={shortcutNumber}
			/>
		</button>
	);
}

function WordOrderExerciseBody({
	answer,
	copy,
	evaluation,
	exercise,
	onAnswerChange
}: {
	answer: ExerciseAnswer | undefined;
	copy: ExerciseDeckCopy;
	evaluation: ExerciseEvaluation | undefined;
	exercise: WordOrderExercise;
	onAnswerChange: ExercisePreviewProps['onAnswerChange'];
}) {
	const selectedTokenIds = answer?.type === 'wordOrder' ? answer.tokenIds : [];
	const selectedTokens = selectedTokenIds
		.map((tokenId) => exercise.tokens.find((token) => token.id === tokenId))
		.filter((token): token is WordOrderExercise['tokens'][number] => Boolean(token));
	const remainingTokens = exercise.tokens.filter((token) => !selectedTokenIds.includes(token.id));

	useEffect(() => {
		if (!onAnswerChange) {
			return undefined;
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (isTypingTarget(event.target)) {
				return;
			}

			const shortcutNumber = getShortcutNumberFromKey(event);
			const token = shortcutNumber ? remainingTokens[shortcutNumber - 1] : undefined;

			if (!token) {
				return;
			}

			event.preventDefault();
			onAnswerChange?.({
				exerciseId: exercise.id,
				type: 'wordOrder',
				tokenIds: [...selectedTokenIds, token.id]
			});
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [exercise.id, onAnswerChange, remainingTokens, selectedTokenIds]);

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
			<div
				aria-label={copy.wordOrderAnswer}
				className="exercise-word-order__answer"
				data-state={getWordOrderState(answer, evaluation)}
			>
				{selectedTokens.length > 0 ? (
					selectedTokens.map((token, index) => (
						<button
							className="exercise-word-token exercise-word-token--selected"
							disabled={!onAnswerChange}
							key={`${token.id}-${index}`}
							onClick={() => removeToken(index)}
							title={formatPronunciationTitle(token.pronunciationHint)}
							type="button"
						>
							<OptionLabel label={token.label} pronunciationHint={token.pronunciationHint} />
						</button>
					))
				) : (
					<span className="exercise-word-order__placeholder">{copy.wordOrderPlaceholder}</span>
				)}
			</div>
			<div className="exercise-word-order__bank">
				{remainingTokens.map((token, index) => (
					<button
						className="exercise-word-token"
						disabled={!onAnswerChange}
						key={token.id}
						onClick={() => addToken(token.id)}
						title={formatPronunciationTitle(token.pronunciationHint)}
						type="button"
					>
						<OptionLabel label={token.label} pronunciationHint={token.pronunciationHint} shortcutNumber={index + 1} />
					</button>
				))}
			</div>
		</div>
	);
}

function ReadingExerciseBody({
	answer,
	evaluation,
	exercise,
	onAnswerChange
}: {
	answer: ExerciseAnswer | undefined;
	evaluation: ExerciseEvaluation | undefined;
	exercise: ReadingComprehensionExercise;
	onAnswerChange: ExercisePreviewProps['onAnswerChange'];
}) {
	let shortcutStart = 1;

	return (
		<div className="exercise-reading">
			<article className="exercise-reading__passage">
				{exercise.passageTitle ? <h3>{exercise.passageTitle}</h3> : null}
				<p>{exercise.passage}</p>
				{exercise.pronunciationHint ? <PronunciationHint hint={exercise.pronunciationHint} /> : null}
			</article>
			<div className="exercise-reading__questions">
				{exercise.questions.map((question) => {
					const questionShortcutStart = shortcutStart;
					shortcutStart += question.options.length;

					return (
						<ReadingQuestionCard
							answer={answer}
							evaluation={evaluation}
							exerciseId={exercise.id}
							key={question.id}
							onAnswerChange={onAnswerChange}
							question={question}
							shortcutStart={questionShortcutStart}
						/>
					);
				})}
			</div>
		</div>
	);
}

function ReadingQuestionCard({
	answer,
	evaluation,
	exerciseId,
	onAnswerChange,
	question,
	shortcutStart
}: {
	answer: ExerciseAnswer | undefined;
	evaluation: ExerciseEvaluation | undefined;
	exerciseId: string;
	onAnswerChange: ExercisePreviewProps['onAnswerChange'];
	question: ReadingComprehensionQuestion;
	shortcutStart: number;
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
				optionStates={getChoiceOptionStates(selectedOptionId, question.correctOptionId, evaluation)}
				options={question.options}
				readOnly={!onAnswerChange}
				shortcutStart={shortcutStart}
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

function getChoiceOptionStates(
	selectedOptionId: string | undefined,
	correctOptionId: string,
	evaluation: ExerciseEvaluation | undefined
): Record<string, ExerciseChoiceState> {
	if (!evaluation) {
		return selectedOptionId ? { [selectedOptionId]: 'selected' } : {};
	}

	return {
		...(selectedOptionId && selectedOptionId !== correctOptionId ? { [selectedOptionId]: 'incorrect' as const } : {}),
		[correctOptionId]: 'correct'
	};
}

function getTextInputState(answer: ExerciseAnswer | undefined, evaluation: ExerciseEvaluation | undefined) {
	if (evaluation) {
		return evaluation.correct ? 'correct' : 'incorrect';
	}

	return answer?.type === 'fillBlank' && answer.value.trim().length > 0 ? 'selected' : 'idle';
}

function getWordOrderState(answer: ExerciseAnswer | undefined, evaluation: ExerciseEvaluation | undefined) {
	if (evaluation) {
		return evaluation.correct ? 'correct' : 'incorrect';
	}

	return answer?.type === 'wordOrder' && answer.tokenIds.length > 0 ? 'selected' : 'idle';
}

function getMatchState(matchedRightId: string | undefined, correctRightId: string | undefined): MatchCardState {
	if (!matchedRightId || !correctRightId) {
		return 'idle';
	}

	return matchedRightId === correctRightId ? 'correct' : 'incorrect';
}

function getExerciseTitle(exercise: LearningExercise, copy: ExerciseDeckCopy) {
	if (exercise.type === 'fillBlank' || exercise.type === 'multipleChoice') {
		return exercise.prompt || copy.typeInstructions[exercise.type];
	}

	return copy.typeInstructions[exercise.type];
}

function getExerciseInstruction(exercise: LearningExercise, copy: ExerciseDeckCopy) {
	if (exercise.type === 'fillBlank' || exercise.type === 'multipleChoice') {
		return exercise.prompt ? copy.typeInstructions[exercise.type] : undefined;
	}

	return undefined;
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
	pronunciationHint,
	shortcutNumber
}: {
	label: string;
	openMojiHexcode?: string;
	pronunciationHint?: ExercisePronunciationHint;
	shortcutNumber?: number;
}) {
	return (
		<span className="exercise-option__content">
			{shortcutNumber ? (
				<span className="exercise-shortcut-key" aria-hidden="true">
					{formatShortcutNumber(shortcutNumber)}
				</span>
			) : null}
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

function getShortcutNumberFromKey(event: KeyboardEvent) {
	if (event.altKey || event.ctrlKey || event.metaKey) {
		return null;
	}

	if (/^[1-9]$/.test(event.key)) {
		return Number(event.key);
	}

	return event.key === '0' ? 10 : null;
}

function formatShortcutNumber(shortcutNumber: number) {
	return shortcutNumber === 10 ? '0' : String(shortcutNumber);
}

function isTypingTarget(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) {
		return false;
	}

	return Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));
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
