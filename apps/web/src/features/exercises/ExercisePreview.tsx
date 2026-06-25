import { useEffect, useMemo, useState } from 'react';
import { defaultOpenPeepCustomization } from '@classyc/shared';
import type {
	ExerciseAnswer,
	ExerciseEvaluation,
	ExerciseMatchItem,
	ExercisePronunciationHint,
	ImageChoiceExercise,
	LearningExercise,
	MultipleChoiceExercise,
	OpenPeepCustomization,
	MatchingExercise,
	ReadingComprehensionExercise,
	ReadingComprehensionQuestion,
	WordOrderExercise
} from '@classyc/shared';
import { openPeepAtomAssets } from '@/assets/open-peeps-atoms';
import { resolveOpenMojiIconSrc } from '@/assets/openmoji';
import { OpenPeepComposer } from '@/features/character/OpenPeepComposer';
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
	const instruction = getExerciseInstruction(exercise);
	const useInlineTranslationHeader = isInlineTranslationExercise(exercise);

	return (
		<section
			aria-label={title}
			className="exercise-preview"
			data-presentation={exercise.presentation}
			data-type={exercise.type}
		>
			{useInlineTranslationHeader ? null : (
				<header className="exercise-preview__header">
					<div className="exercise-preview__header-copy">
						<h2 className="exercise-preview__prompt">{renderExerciseTitle(exercise, copy, title)}</h2>
						{instruction ? <p className="exercise-preview__instruction">{instruction}</p> : null}
						{exercise.pronunciationHint ? <PronunciationHint hint={exercise.pronunciationHint} /> : null}
					</div>
				</header>
			)}

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
			if (exercise.presentation === 'translation') {
				return (
					<TranslationChoiceExerciseBody
						answer={answer}
						copy={copy}
						evaluation={evaluation}
						exercise={exercise}
						onAnswerChange={onAnswerChange}
					/>
				);
			}

			if (exercise.presentation === 'conversation') {
				return (
					<ConversationChoiceExerciseBody
						answer={answer}
						evaluation={evaluation}
						exercise={exercise}
						onAnswerChange={onAnswerChange}
					/>
				);
			}

			return (
				<PromptChoiceExerciseBody
					answer={answer}
					evaluation={evaluation}
					exercise={exercise}
					onAnswerChange={onAnswerChange}
				/>
			);
		case 'fillBlank':
			return (
				<FillBlankExerciseBody
					answer={answer}
					evaluation={evaluation}
					exercise={exercise}
					onAnswerChange={onAnswerChange}
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
	variant?: 'binary' | 'conversation' | 'image' | 'translation';
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

	const listClassName = [
		'exercise-option-list',
		variant ? `exercise-option-list--${variant}` : ''
	].filter(Boolean).join(' ');

	return (
		<div className={listClassName}>
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
							imageOnly={variant === 'image' && Boolean(option.openMojiHexcode)}
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

function PromptChoiceExerciseBody({
	answer,
	evaluation,
	exercise,
	onAnswerChange
}: {
	answer: ExerciseAnswer | undefined;
	evaluation: ExerciseEvaluation | undefined;
	exercise: MultipleChoiceExercise;
	onAnswerChange: ExercisePreviewProps['onAnswerChange'];
}) {
	const selectedOptionId = answer?.type === 'multipleChoice' ? answer.optionId : undefined;

	return (
		<div className="exercise-choice-body">
			{exercise.prompt ? (
				<p className="exercise-target-prompt">{exercise.prompt}</p>
			) : null}
			<OptionList
				answer={selectedOptionId}
				onAnswerChange={(optionId) => onAnswerChange?.({ exerciseId: exercise.id, type: 'multipleChoice', optionId })}
				optionStates={getChoiceOptionStates(selectedOptionId, exercise.correctOptionId, evaluation)}
				options={exercise.options}
				readOnly={!onAnswerChange}
			/>
		</div>
	);
}

function FillBlankExerciseBody({
	answer,
	evaluation,
	exercise,
	onAnswerChange
}: {
	answer: ExerciseAnswer | undefined;
	evaluation: ExerciseEvaluation | undefined;
	exercise: Extract<LearningExercise, { type: 'fillBlank' }>;
	onAnswerChange: ExercisePreviewProps['onAnswerChange'];
}) {
	return (
		<div className="exercise-choice-body">
			{exercise.prompt ? (
				<p className="exercise-target-prompt">{exercise.prompt}</p>
			) : null}
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
		</div>
	);
}

function TranslationChoiceExerciseBody({
	answer,
	copy,
	evaluation,
	exercise,
	onAnswerChange
}: {
	answer: ExerciseAnswer | undefined;
	copy: ExerciseDeckCopy;
	evaluation: ExerciseEvaluation | undefined;
	exercise: MultipleChoiceExercise;
	onAnswerChange: ExercisePreviewProps['onAnswerChange'];
}) {
	const selectedOptionId = answer?.type === 'multipleChoice' ? answer.optionId : undefined;

	return (
		<div className="exercise-translation">
			<div className="exercise-translation__question">
				<div className="exercise-translation__copy">
					<p className="exercise-translation__prompt">
						<span>{copy.translation.choiceTitle} </span>
						<strong className="exercise-inline-keyword">{exercise.prompt}</strong>
					</p>
					{exercise.pronunciationHint ? <PronunciationHint hint={exercise.pronunciationHint} /> : null}
				</div>
				<ExercisePeepIllustration exercise={exercise} variant="translation" />
			</div>
			<div className="exercise-translation__options">
				<OptionList
					answer={selectedOptionId}
					onAnswerChange={(optionId) => onAnswerChange?.({ exerciseId: exercise.id, type: 'multipleChoice', optionId })}
					optionStates={getChoiceOptionStates(selectedOptionId, exercise.correctOptionId, evaluation)}
					options={exercise.options}
					readOnly={!onAnswerChange}
					variant="translation"
				/>
			</div>
		</div>
	);
}

function ConversationChoiceExerciseBody({
	answer,
	evaluation,
	exercise,
	onAnswerChange
}: {
	answer: ExerciseAnswer | undefined;
	evaluation: ExerciseEvaluation | undefined;
	exercise: MultipleChoiceExercise;
	onAnswerChange: ExercisePreviewProps['onAnswerChange'];
}) {
	const selectedOptionId = answer?.type === 'multipleChoice' ? answer.optionId : undefined;

	return (
		<div className="exercise-conversation">
			<div className="exercise-conversation__bubble exercise-conversation__bubble--prompt">
				<span>{exercise.prompt}</span>
			</div>
			<div className="exercise-conversation__answers">
				<OptionList
					answer={selectedOptionId}
					onAnswerChange={(optionId) => onAnswerChange?.({ exerciseId: exercise.id, type: 'multipleChoice', optionId })}
					optionStates={getChoiceOptionStates(selectedOptionId, exercise.correctOptionId, evaluation)}
					options={exercise.options}
					readOnly={!onAnswerChange}
					variant="conversation"
				/>
			</div>
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
	const usesImageOptions = hasImageChoiceOptions(exercise);

	return (
		<div className="exercise-image-choice">
			{usesImageOptions ? null : (
				<figure className="exercise-image-choice__picture">
					<OpenMojiPicture alt={exercise.imageAlt} hexcode={exercise.imageOpenMojiHexcode} />
				</figure>
			)}
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
				variant={usesImageOptions ? 'image' : undefined}
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

		if (isCorrectMatchLocked(selection)) {
			return;
		}

		if (activeSelection?.side === selection.side && activeSelection.id === selection.id) {
			setActiveSelection(null);
			return;
		}

		if (activeSelection && activeSelection.side !== selection.side) {
			if (isCorrectMatchLocked(activeSelection)) {
				setActiveSelection(null);
				return;
			}

			const leftId = activeSelection.side === 'left' ? activeSelection.id : selection.id;
			const rightId = activeSelection.side === 'right' ? activeSelection.id : selection.id;

			onAnswerChange(createMatchingAnswer(answer, exercise.id, leftId, rightId));
			setActiveSelection(null);
			return;
		}

		setActiveSelection(selection);
	}

	function isCorrectMatchLocked(selection: MatchSelection) {
		if (selection.side === 'left') {
			return matchedRightByLeftId[selection.id] === correctRightByLeftId[selection.id];
		}

		const matchedLeftId = matchedLeftByRightId[selection.id];

		return Boolean(matchedLeftId && correctRightByLeftId[matchedLeftId] === selection.id);
	}

	return (
		<div className="exercise-matching" aria-label={exercise.prompt}>
			<div className="exercise-matching__column">
				{exercise.pairs.map((pair, index) => {
					const isActive = activeSelection?.side === 'left' && activeSelection.id === pair.left.id;
					const matchedRightId = matchedRightByLeftId[pair.left.id];
					const isLocked = isCorrectMatchLocked({ id: pair.left.id, side: 'left' });

					return (
						<MatchButton
							disabled={!onAnswerChange || isLocked}
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
					const isLocked = isCorrectMatchLocked({ id: item.id, side: 'right' });

					return (
						<MatchButton
							disabled={!onAnswerChange || isLocked}
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
	const isImageOnly = Boolean(item.openMojiHexcode);

	return (
		<button
			aria-label={formatOptionAccessibleLabel(item.label, item.pronunciationHint)}
			aria-pressed={state !== 'idle'}
			className={`exercise-match-card${isImageOnly ? ' exercise-match-card--image' : ''}`}
			data-state={state}
			disabled={disabled}
			onClick={onClick}
			title={formatPronunciationTitle(item.pronunciationHint)}
			type="button"
		>
			<OptionLabel
				imageOnly={isImageOnly}
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
				) : null}
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
			<p>{renderPromptWithHighlightedKeyword(question.prompt)}</p>
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
	if (exercise.presentation === 'conversation') {
		return copy.typeInstructions.multipleChoice;
	}

	if (exercise.presentation === 'translation') {
		return exercise.type === 'matching' ? copy.translation.matchTitle : copy.translation.choiceTitle;
	}

	if (exercise.type === 'matching' && hasImageMatchItems(exercise)) {
		return copy.imageMatchTitle;
	}

	if (exercise.type === 'imageChoice' && hasImageChoiceOptions(exercise)) {
		return getImageChoicePromptText(exercise, copy);
	}

	if (exercise.type === 'fillBlank' || exercise.type === 'multipleChoice') {
		return copy.typeInstructions[exercise.type];
	}

	return exercise.prompt || copy.typeInstructions[exercise.type];
}

function renderExerciseTitle(exercise: LearningExercise, copy: ExerciseDeckCopy, title: string) {
	if (exercise.type === 'imageChoice' && hasImageChoiceOptions(exercise)) {
		return (
			<>
				<span>{copy.imageChoicePrompt.prefix}</span>
				<strong className="exercise-inline-keyword">{exercise.prompt}</strong>
				<span>{copy.imageChoicePrompt.suffix}</span>
			</>
		);
	}

	return title;
}

function getImageChoicePromptText(exercise: ImageChoiceExercise, copy: ExerciseDeckCopy) {
	return `${copy.imageChoicePrompt.prefix}${exercise.prompt}${copy.imageChoicePrompt.suffix}`;
}

function hasImageMatchItems(exercise: MatchingExercise) {
	return exercise.pairs.some((pair) => Boolean(pair.left.openMojiHexcode || pair.right.openMojiHexcode));
}

function hasImageChoiceOptions(exercise: ImageChoiceExercise) {
	return exercise.options.some((option) => Boolean(option.openMojiHexcode));
}

function getExerciseInstruction(exercise: LearningExercise) {
	if (exercise.presentation === 'conversation' || exercise.presentation === 'translation') {
		return undefined;
	}

	if (exercise.type === 'fillBlank' || exercise.type === 'multipleChoice') {
		return undefined;
	}

	return undefined;
}

function renderPromptWithHighlightedKeyword(prompt: string) {
	const parts = getPromptHighlightParts(prompt);

	if (!parts) {
		return prompt;
	}

	return (
		<>
			<span>{parts.before}</span>
			<strong className="exercise-inline-keyword">{parts.keyword}</strong>
			<span>{parts.after}</span>
		</>
	);
}

function getPromptHighlightParts(prompt: string) {
	const patterns = [
		/^(.*\bmeans\s+)(.+?)(\s*[?.!؟。！？])?$/i,
		/^(.*\bveut dire\s+)(.+?)(\s*[?.!؟。！？])?$/i,
		/^(.*表示)(.+?)(\s*[?.!؟。！？])?$/
	];

	for (const pattern of patterns) {
		const match = prompt.match(pattern);

		if (match?.[2]) {
			return {
				before: match[1],
				keyword: match[2].trimEnd(),
				after: match[3] ?? ''
			};
		}
	}

	return null;
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
	imageOnly = false,
	label,
	openMojiHexcode,
	pronunciationHint,
	shortcutNumber
}: {
	imageOnly?: boolean;
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
			<span className={`exercise-option__text${imageOnly ? ' sr-only' : ''}`}>
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

type PeepIllustrationVariant = 'translation';

function ExercisePeepIllustration({
	exercise,
	variant
}: {
	exercise: LearningExercise;
	variant: PeepIllustrationVariant;
}) {
	const customization = useMemo(() => createExercisePeepCustomization(exercise), [exercise]);

	return (
		<figure className={`exercise-peep-illustration exercise-peep-illustration--${variant}`} aria-hidden="true">
			<OpenPeepComposer
				className="exercise-peep-illustration__figure"
				customization={customization}
			/>
		</figure>
	);
}

const monochromePeepPalettes = [
	{
		skin: '#F8FAFC',
		hair: '#111827',
		outfit: '#FFFFFF',
		outfitSecondary: '#111827',
		accessory: '#111827'
	},
	{
		skin: '#E5E7EB',
		hair: '#030712',
		outfit: '#D1D5DB',
		outfitSecondary: '#FFFFFF',
		accessory: '#374151'
	},
	{
		skin: '#F3F4F6',
		hair: '#374151',
		outfit: '#111827',
		outfitSecondary: '#F9FAFB',
		accessory: '#111827'
	}
] as const;

function createExercisePeepCustomization(exercise: LearningExercise): OpenPeepCustomization {
	const seed = hashString(exercise.id);
	const palette = pickItem(monochromePeepPalettes, seed + 13);
	const preset = getExercisePeepPreset(exercise);

	return {
		...defaultOpenPeepCustomization,
		bodyId: preset.bodyId ?? pickAtomId('body', seed + 1),
		headId: preset.headId ?? 'Short 4',
		faceId: preset.faceId ?? pickAtomId('face', seed + 3),
		facialHairId: preset.facialHairId ?? '_ None',
		accessoryId: preset.accessoryId ?? '_ None',
		postureMode: 'bust',
		standingPoseId: pickAtomId('standingPose', seed + 7),
		sittingPoseId: pickAtomId('sittingPose', seed + 8),
		colors: {
			...defaultOpenPeepCustomization.colors,
			...palette,
			background: '#F8FAFC',
			ink: '#111827'
		}
	};
}

function getExercisePeepPreset(exercise: LearningExercise): Partial<OpenPeepCustomization> {
	const concept = getExerciseConceptHint(exercise);

	if (concept === 'thanks') {
		return {
			bodyId: 'Coffee',
			faceId: 'Loving Grin 1'
		};
	}

	if (concept === 'no') {
		return {
			bodyId: 'Tee Arms Crossed',
			faceId: 'Serious'
		};
	}

	if (concept === 'yes') {
		return {
			bodyId: 'Pointing Up',
			faceId: 'Smile Big'
		};
	}

	if (concept === 'hello' || concept === 'hi' || concept === 'goodbye') {
		return {
			bodyId: 'Explaining',
			faceId: 'Smile Big'
		};
	}

	return {
		bodyId: 'Explaining',
		faceId: 'Smile'
	};
}

function getExerciseConceptHint(exercise: LearningExercise) {
	const signature = `${exercise.id} ${exercise.prompt}`.toLowerCase();

	if (signature.includes('thanks') || signature.includes('merci')) {
		return 'thanks';
	}

	if (signature.includes('goodbye') || signature.includes('au-revoir') || signature.includes('bye')) {
		return 'goodbye';
	}

	if (signature.includes('hello') || signature.includes('bonjour')) {
		return 'hello';
	}

	if (signature.includes('hi') || signature.includes('salut')) {
		return 'hi';
	}

	if (signature.includes('yes') || signature.includes('oui')) {
		return 'yes';
	}

	if (signature.includes('no') || signature.includes('non')) {
		return 'no';
	}

	return null;
}

function isInlineTranslationExercise(exercise: LearningExercise) {
	return exercise.presentation === 'translation' && exercise.type === 'multipleChoice';
}

function pickAtomId(category: keyof typeof openPeepAtomAssets, seed: number) {
	const assets = openPeepAtomAssets[category];

	return pickItem(assets, seed)?.id ?? defaultOpenPeepCustomization[defaultAtomIdKeyByCategory[category]];
}

const defaultAtomIdKeyByCategory = {
	accessories: 'accessoryId',
	body: 'bodyId',
	face: 'faceId',
	facialHair: 'facialHairId',
	head: 'headId',
	sittingPose: 'sittingPoseId',
	standingPose: 'standingPoseId'
} as const;

function pickItem<T>(items: readonly T[], seed: number) {
	return items[Math.abs(seed) % items.length];
}

function hashString(value: string) {
	let hash = 2166136261;

	for (let index = 0; index < value.length; index += 1) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}

	return hash >>> 0;
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
