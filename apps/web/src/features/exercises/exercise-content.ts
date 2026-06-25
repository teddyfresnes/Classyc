import type {
	ExerciseMatchItem,
	ExerciseOption,
	LearningExercise,
	ReadingComprehensionQuestion,
	SupportedLanguageCode
} from '@classyc/shared';
import { chineseStarterExercises } from './chinese-exercises';
import { englishStarterExercises } from './english-exercises';
import { frenchStarterExercises } from './french-exercises';
import { getExerciseCopy } from './exercise-copy';
import campaignIntroLevelSource from './levels/campaign-intro.json';

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

export function getExerciseDeckContent(
	language: SupportedLanguageCode,
	uiLanguage: SupportedLanguageCode = 'fr',
	lessonStep = 0
) {
	return {
		...exerciseDeckContentByLanguage[language],
		title: getStarterLessonTitle(uiLanguage, lessonStep),
		exercises: createStarterExercises(language, uiLanguage, lessonStep)
	};
}

type StarterConceptId =
	| 'bye'
	| 'fine'
	| 'goodbye'
	| 'hello'
	| 'hi'
	| 'name'
	| 'no'
	| 'not'
	| 'thanks'
	| 'yes';

type StarterImageConceptId = Extract<StarterConceptId, 'hello' | 'hi' | 'no' | 'yes'>;
type StarterReadingQuestionId = 'hello' | 'name' | 'thanks';
type StarterWordOrderId = 'goodbye' | 'name';
type ConversationChoiceId = 'goodbye' | 'namePhrase' | 'no' | 'yes';
type SafeConversationChoiceId = Extract<ConversationChoiceId, 'goodbye' | 'namePhrase'>;

interface CampaignIntroLessonSource {
	conversationChoice: {
		distractors: readonly ConversationChoiceId[];
		prompt: 'howAreYou';
	};
	id: string;
	imageChoice: {
		concept: StarterImageConceptId;
		distractors: readonly StarterConceptId[];
	};
	imageMatchConcepts: readonly StarterImageConceptId[];
	meaningChoice: {
		concept: StarterConceptId;
		distractors: readonly StarterConceptId[];
	};
	personNames: Partial<Record<SupportedLanguageCode, string>>;
	readingQuestions: readonly StarterReadingQuestionId[];
	translationMatchConcepts: readonly StarterConceptId[];
	wordOrders: readonly StarterWordOrderId[];
}

interface CampaignIntroLevelSource {
	id: 'campaign-intro';
	lessons: readonly CampaignIntroLessonSource[];
	requiredSteps: number;
}

interface ConceptLabeler {
	(concept: StarterConceptId): string;
	matchItem: (concept: StarterConceptId, id?: string) => ExerciseMatchItem;
	option: (concept: StarterConceptId, id?: string) => ExerciseOption;
}

const campaignIntroLevel = campaignIntroLevelSource as CampaignIntroLevelSource;

const starterConceptLabels: Record<StarterConceptId, Record<SupportedLanguageCode, string>> = {
	bye: {
		en: 'Goodbye',
		fr: 'Au revoir',
		zh: '再见'
	},
	fine: {
		en: 'I am fine.',
		fr: 'Oui, ça va.',
		zh: '我很好'
	},
	goodbye: {
		en: 'Goodbye',
		fr: 'Au revoir',
		zh: '再见'
	},
	hello: {
		en: 'Hello',
		fr: 'Bonjour',
		zh: '你好'
	},
	hi: {
		en: 'Hi',
		fr: 'Salut',
		zh: '你好'
	},
	name: {
		en: 'Name',
		fr: 'Prénom',
		zh: '名字'
	},
	no: {
		en: 'No',
		fr: 'Non',
		zh: '不是'
	},
	not: {
		en: 'No / not',
		fr: 'Non / ce n’est pas',
		zh: '不是'
	},
	thanks: {
		en: 'Thank you',
		fr: 'Merci',
		zh: '谢谢'
	},
	yes: {
		en: 'Yes',
		fr: 'Oui',
		zh: '是'
	}
};

const starterPinyin: Partial<Record<StarterConceptId, string>> = {
	bye: 'zài jiàn',
	goodbye: 'zài jiàn',
	hello: 'nǐ hǎo',
	hi: 'nǐ hǎo',
	no: 'bú shì',
	not: 'bú shì',
	thanks: 'xiè xie',
	yes: 'shì'
};

function createStarterExercises(
	targetLanguage: SupportedLanguageCode,
	uiLanguage: SupportedLanguageCode,
	lessonStep = 0
): readonly LearningExercise[] {
	const lesson = getCampaignIntroLesson(lessonStep);

	if (!lesson) {
		return createLegacyStarterExercises(targetLanguage, uiLanguage);
	}

	const copy = getExerciseCopy(uiLanguage);
	const target = createConceptLabeler(targetLanguage, uiLanguage);
	const native = createConceptLabeler(uiLanguage, uiLanguage);
	const personName = lesson.personNames[targetLanguage] ?? (targetLanguage === 'en' ? 'Mia' : 'Lina');
	const seed = `${campaignIntroLevel.id}:${lesson.id}:${targetLanguage}:${uiLanguage}`;
	const primaryWordOrderId = lesson.wordOrders[0] ?? 'name';
	const secondaryWordOrderId = lesson.wordOrders[1] ?? (primaryWordOrderId === 'name' ? 'goodbye' : 'name');

	return [
		createImageChoiceExercise(targetLanguage, uiLanguage, target, lesson, `${seed}:image-choice`),
		createTranslationMatchExercise(targetLanguage, target, native, lesson, `${seed}:translation-match`),
		createMeaningChoiceExercise(targetLanguage, uiLanguage, target, native, lesson, `${seed}:meaning-choice`),
		createImageMatchingExercise(targetLanguage, target, native, lesson, `${seed}:image-match`),
		createWordOrderExercise(targetLanguage, personName, lesson.id, primaryWordOrderId, `${seed}:word-order:0`),
		createConversationChoiceExercise(targetLanguage, uiLanguage, target, native, lesson, personName, `${seed}:conversation`),
		createWordOrderExercise(targetLanguage, personName, lesson.id, secondaryWordOrderId, `${seed}:word-order:1`),
		createReadingExercise(targetLanguage, uiLanguage, copy, target, native, lesson, personName, `${seed}:reading`)
	];
}

function createLegacyStarterExercises(targetLanguage: SupportedLanguageCode, uiLanguage: SupportedLanguageCode): readonly LearningExercise[] {
	const copy = getExerciseCopy(uiLanguage);
	const target = createConceptLabeler(targetLanguage, uiLanguage);
	const native = createConceptLabeler(uiLanguage, uiLanguage);
	const personName = targetLanguage === 'en' ? 'Mia' : 'Lina';

	return [
		{
			id: `${targetLanguage}-hello-image`,
			type: 'imageChoice',
			prompt: target('hello'),
			potentialXp: 6,
			openMojiHexcode: '1F44B',
			imageOpenMojiHexcode: '1F44B',
			imageAlt: target('hello'),
			pronunciationHint: getPronunciationHint('hello', targetLanguage, uiLanguage),
			options: createIllustratedConceptOptions(target, 'hello', ['thanks', 'no'], `${targetLanguage}:legacy:image-choice`),
			correctOptionId: 'hello'
		},
		{
			id: `${targetLanguage}-basic-match`,
			type: 'matching',
			prompt: '',
			presentation: 'translation',
			potentialXp: 10,
			openMojiHexcode: '1F4AC',
			pairs: [
				{
					id: 'hello',
					left: native.matchItem('hello', 'hello-native'),
					right: target.matchItem('hello')
				},
				{
					id: 'thanks',
					left: native.matchItem('thanks', 'thanks-native'),
					right: target.matchItem('thanks')
				},
				{
					id: 'goodbye',
					left: native.matchItem('goodbye', 'goodbye-native'),
					right: target.matchItem('goodbye')
				}
			]
		},
		{
			id: `${targetLanguage}-thanks-meaning`,
			type: 'multipleChoice',
			prompt: target('thanks'),
			presentation: 'translation',
			potentialXp: 6,
			openMojiHexcode: '1F4AC',
			pronunciationHint: getPronunciationHint('thanks', targetLanguage, uiLanguage),
			options: [
				native.option('hi'),
				native.option('thanks'),
				native.option('goodbye')
			],
			correctOptionId: 'thanks'
		},
		{
			id: `${targetLanguage}-yes-no-image-match`,
			type: 'matching',
			prompt: '',
			potentialXp: 10,
			openMojiHexcode: '2705',
			pairs: [
				{
					id: 'yes',
					left: target.matchItem('yes'),
					right: {
						...native.matchItem('yes'),
						id: 'yes-icon',
						openMojiHexcode: '2705'
					}
				},
				{
					id: 'no',
					left: target.matchItem('no'),
					right: {
						...native.matchItem('no'),
						id: 'no-icon',
						openMojiHexcode: '274C'
					}
				},
				{
					id: 'hi',
					left: target.matchItem('hi'),
					right: {
						...native.matchItem('hi'),
						id: 'wave-icon',
						openMojiHexcode: '1F44B'
					}
				}
			]
		},
		createNameOrderExercise(targetLanguage, personName),
		{
			id: `${targetLanguage}-how-are-you-choice`,
			type: 'multipleChoice',
			prompt: getHowAreYouPrompt(targetLanguage),
			presentation: 'conversation',
			potentialXp: 6,
			openMojiHexcode: '1F642',
			pronunciationHint: targetLanguage === 'zh'
				? {
					pinyin: 'nǐ hǎo ma?',
					meaning: native('hello')
				}
				: undefined,
			options: [
				getFineOption(targetLanguage, uiLanguage),
				target.option('goodbye', 'bye'),
				getNamePhraseOption(targetLanguage, personName)
			],
			correctOptionId: 'fine'
		},
		createGoodbyeOrderExercise(targetLanguage, personName),
		{
			id: `${targetLanguage}-mini-phrase`,
			type: 'readingComprehension',
			prompt: '',
			potentialXp: 10,
			openMojiHexcode: '1F4D6',
			passage: getStarterPassage(targetLanguage, personName),
			pronunciationHint: targetLanguage === 'zh'
				? {
					pinyin: `Nǐ hǎo! Wǒ jiào ${personName}. Xiè xie. Zài jiàn!`,
					meaning: `${native('hello')} ! ${getNativeNameSentence(uiLanguage, personName)}. ${native('thanks')}. ${native('goodbye')} !`
				}
				: undefined,
			questions: [
				{
					id: 'name',
					prompt: copy.reading.nameQuestion,
					options: [
						{
							id: 'person-name',
							label: personName
						},
						target.option('thanks')
					],
					correctOptionId: 'person-name'
				},
				{
					id: 'thanks',
					prompt: copy.reading.thanksQuestion,
					options: [
						target.option('thanks'),
						target.option('no')
					],
					correctOptionId: 'thanks'
				}
			]
		}
	];
}

function createImageChoiceExercise(
	targetLanguage: SupportedLanguageCode,
	uiLanguage: SupportedLanguageCode,
	target: ConceptLabeler,
	lesson: CampaignIntroLessonSource,
	seed: string
): LearningExercise {
	const concept = lesson.imageChoice.concept;

	return {
		id: `${targetLanguage}-${lesson.id}-image-${concept}`,
		type: 'imageChoice',
		prompt: target(concept),
		potentialXp: 6,
		openMojiHexcode: getImageConceptOpenMojiHexcode(concept),
		imageOpenMojiHexcode: getImageConceptOpenMojiHexcode(concept),
		imageAlt: target(concept),
		pronunciationHint: getPronunciationHint(concept, targetLanguage, uiLanguage),
		options: createIllustratedConceptOptions(target, concept, lesson.imageChoice.distractors, seed),
		correctOptionId: concept
	};
}

function createTranslationMatchExercise(
	targetLanguage: SupportedLanguageCode,
	target: ConceptLabeler,
	native: ConceptLabeler,
	lesson: CampaignIntroLessonSource,
	seed: string
): LearningExercise {
	return {
		id: `${targetLanguage}-${lesson.id}-translation-match`,
		type: 'matching',
		prompt: '',
		presentation: 'translation',
		potentialXp: 10,
		openMojiHexcode: '1F4AC',
		pairs: shuffleBySeed(uniqueItems(lesson.translationMatchConcepts), seed).map((concept) => ({
			id: concept,
			left: native.matchItem(concept, `${concept}-native`),
			right: target.matchItem(concept)
		}))
	};
}

function createMeaningChoiceExercise(
	targetLanguage: SupportedLanguageCode,
	uiLanguage: SupportedLanguageCode,
	target: ConceptLabeler,
	native: ConceptLabeler,
	lesson: CampaignIntroLessonSource,
	seed: string
): LearningExercise {
	const concept = lesson.meaningChoice.concept;
	const useNativePrompt = shouldUseNativePromptForMeaningChoice(lesson);
	const promptLabeler = useNativePrompt ? native : target;
	const optionLabeler = useNativePrompt ? target : native;
	const promptLanguage = useNativePrompt ? uiLanguage : targetLanguage;

	return {
		id: `${targetLanguage}-${lesson.id}-${concept}-meaning`,
		type: 'multipleChoice',
		prompt: promptLabeler(concept),
		presentation: 'translation',
		potentialXp: 6,
		openMojiHexcode: '1F4AC',
		pronunciationHint: getPronunciationHint(concept, promptLanguage, uiLanguage),
		options: createConceptOptions(optionLabeler, concept, lesson.meaningChoice.distractors, seed),
		correctOptionId: concept
	};
}

function shouldUseNativePromptForMeaningChoice(lesson: CampaignIntroLessonSource) {
	return lesson.id === 'oui-non';
}

function createImageMatchingExercise(
	targetLanguage: SupportedLanguageCode,
	target: ConceptLabeler,
	native: ConceptLabeler,
	lesson: CampaignIntroLessonSource,
	seed: string
): LearningExercise {
	return {
		id: `${targetLanguage}-${lesson.id}-image-match`,
		type: 'matching',
		prompt: '',
		potentialXp: 10,
		openMojiHexcode: '2705',
		pairs: shuffleBySeed(uniqueItems(lesson.imageMatchConcepts), seed).map((concept) => ({
			id: concept,
			left: target.matchItem(concept),
			right: {
				...native.matchItem(concept),
				id: `${concept}-icon`,
				openMojiHexcode: getImageConceptOpenMojiHexcode(concept)
			}
		}))
	};
}

function createConversationChoiceExercise(
	targetLanguage: SupportedLanguageCode,
	uiLanguage: SupportedLanguageCode,
	target: ConceptLabeler,
	native: ConceptLabeler,
	lesson: CampaignIntroLessonSource,
	personName: string,
	seed: string
): LearningExercise {
	return {
		id: `${targetLanguage}-${lesson.id}-how-are-you-choice`,
		type: 'multipleChoice',
		prompt: getHowAreYouPrompt(targetLanguage),
		presentation: 'conversation',
		potentialXp: 6,
		openMojiHexcode: '1F642',
		pronunciationHint: targetLanguage === 'zh'
			? {
				pinyin: 'ni hao ma?',
				meaning: native('hello')
			}
			: undefined,
		options: shuffleBySeed(
			[
				getFineOption(targetLanguage, uiLanguage),
				...getSafeConversationDistractors(lesson.conversationChoice.distractors).map((distractor) => (
					createConversationDistractorOption(target, targetLanguage, personName, distractor)
				))
			],
			seed
		),
		correctOptionId: 'fine'
	};
}

function createWordOrderExercise(
	language: SupportedLanguageCode,
	personName: string,
	lessonId: string,
	wordOrderId: StarterWordOrderId,
	seed: string
): Extract<LearningExercise, { type: 'wordOrder' }> {
	const exercise = wordOrderId === 'name'
		? createNameOrderExercise(language, personName)
		: createGoodbyeOrderExercise(language, personName);

	return {
		...exercise,
		id: `${language}-${lessonId}-${wordOrderId}-order`,
		tokens: shuffleBySeed(addWordOrderDistractors(exercise, language, wordOrderId), seed)
	};
}

function addWordOrderDistractors(
	exercise: Extract<LearningExercise, { type: 'wordOrder' }>,
	language: SupportedLanguageCode,
	wordOrderId: StarterWordOrderId
) {
	const distractors = getWordOrderDistractors(language, wordOrderId);
	const existingTokenIds = new Set(exercise.tokens.map((token) => token.id));

	return [
		...exercise.tokens,
		...distractors.filter((token) => !existingTokenIds.has(token.id))
	];
}

function getWordOrderDistractors(
	language: SupportedLanguageCode,
	wordOrderId: StarterWordOrderId
): Extract<LearningExercise, { type: 'wordOrder' }>['tokens'] {
	if (language === 'en') {
		return wordOrderId === 'name'
			? [
				{ id: 'hello-extra', label: 'Hello' },
				{ id: 'thanks-extra', label: 'Thank you' },
				{ id: 'no-extra', label: 'No' }
			]
			: [
				{ id: 'my-extra', label: 'My' },
				{ id: 'is-extra', label: 'is' },
				{ id: 'thanks-extra', label: 'Thank you' }
			];
	}

	if (language === 'zh') {
		return wordOrderId === 'name'
			? [
				{ id: 'nihao-extra', label: '\u4F60\u597D', pronunciationHint: { pinyin: 'ni hao' } },
				{ id: 'xiexie-extra', label: '\u8C22\u8C22', pronunciationHint: { pinyin: 'xie xie' } },
				{ id: 'bushi-extra', label: '\u4E0D\u662F', pronunciationHint: { pinyin: 'bu shi' } }
			]
			: [
				{ id: 'wo-extra', label: '\u6211', pronunciationHint: { pinyin: 'wo' } },
				{ id: 'nihao-extra', label: '\u4F60\u597D', pronunciationHint: { pinyin: 'ni hao' } },
				{ id: 'xiexie-extra', label: '\u8C22\u8C22', pronunciationHint: { pinyin: 'xie xie' } }
			];
	}

	return wordOrderId === 'name'
		? [
			{ id: 'bonjour-extra', label: 'Bonjour' },
			{ id: 'merci-extra', label: 'Merci' },
			{ id: 'non-extra', label: 'Non' }
		]
		: [
			{ id: 'je-extra', label: 'Je' },
			{ id: 'merci-extra', label: 'Merci' },
			{ id: 'bonjour-extra', label: 'Bonjour' }
		];
}

function createReadingExercise(
	targetLanguage: SupportedLanguageCode,
	uiLanguage: SupportedLanguageCode,
	copy: ReturnType<typeof getExerciseCopy>,
	target: ConceptLabeler,
	native: ConceptLabeler,
	lesson: CampaignIntroLessonSource,
	personName: string,
	seed: string
): LearningExercise {
	const fallbackQuestionIds: readonly StarterReadingQuestionId[] = ['name', 'thanks'];
	const questionIds = lesson.readingQuestions.length > 0 ? lesson.readingQuestions : fallbackQuestionIds;

	return {
		id: `${targetLanguage}-${lesson.id}-mini-phrase`,
		type: 'readingComprehension',
		prompt: '',
		potentialXp: 10,
		openMojiHexcode: '1F4D6',
		passage: getStarterPassage(targetLanguage, personName),
		pronunciationHint: targetLanguage === 'zh'
			? {
				pinyin: `Ni hao! Wo jiao ${personName}. Xie xie. Zai jian!`,
				meaning: `${native('hello')} ! ${getNativeNameSentence(uiLanguage, personName)}. ${native('thanks')}. ${native('goodbye')} !`
			}
			: undefined,
		questions: questionIds.map((questionId, index) => (
			createReadingQuestion(copy, target, questionId, personName, `${seed}:${questionId}:${index}`)
		))
	};
}

function createReadingQuestion(
	copy: ReturnType<typeof getExerciseCopy>,
	target: ConceptLabeler,
	questionId: StarterReadingQuestionId,
	personName: string,
	seed: string
): ReadingComprehensionQuestion {
	if (questionId === 'name') {
		return {
			id: 'name',
			prompt: copy.reading.nameQuestion,
			options: shuffleBySeed([
				{
					id: 'person-name',
					label: personName
				},
				target.option('thanks')
			], seed),
			correctOptionId: 'person-name'
		};
	}

	if (questionId === 'hello') {
		return {
			id: 'hello',
			prompt: copy.reading.helloQuestion,
			options: createConceptOptions(target, 'hello', ['no'], seed),
			correctOptionId: 'hello'
		};
	}

	return {
		id: 'thanks',
		prompt: copy.reading.thanksQuestion,
		options: createConceptOptions(target, 'thanks', ['no'], seed),
		correctOptionId: 'thanks'
	};
}

function createConceptOptions(
	labeler: ConceptLabeler,
	correctConcept: StarterConceptId,
	distractors: readonly StarterConceptId[],
	seed: string
) {
	return shuffleBySeed([correctConcept, ...uniqueItems(distractors).filter((concept) => concept !== correctConcept)], seed)
		.map((concept) => labeler.option(concept));
}

function createIllustratedConceptOptions(
	labeler: ConceptLabeler,
	correctConcept: StarterConceptId,
	distractors: readonly StarterConceptId[],
	seed: string
) {
	return createConceptOptions(labeler, correctConcept, distractors, seed)
		.map((option) => ({
			...option,
			openMojiHexcode: getImageConceptOpenMojiHexcode(option.id as StarterConceptId)
		}));
}

function getSafeConversationDistractors(distractors: readonly ConversationChoiceId[]): readonly SafeConversationChoiceId[] {
	return uniqueItems<SafeConversationChoiceId>([
		...distractors.filter(isSafeConversationDistractor),
		'goodbye',
		'namePhrase'
	]).slice(0, 2);
}

function isSafeConversationDistractor(distractor: ConversationChoiceId): distractor is SafeConversationChoiceId {
	return distractor === 'goodbye' || distractor === 'namePhrase';
}

function createConversationDistractorOption(
	target: ConceptLabeler,
	targetLanguage: SupportedLanguageCode,
	personName: string,
	distractor: ConversationChoiceId
): ExerciseOption {
	if (distractor === 'namePhrase') {
		return getNamePhraseOption(targetLanguage, personName);
	}

	if (distractor === 'goodbye') {
		return target.option('goodbye', 'bye');
	}

	return target.option(distractor);
}

function getCampaignIntroLesson(lessonStep: number) {
	const lessonIndex = getCampaignIntroLessonIndex(lessonStep);

	return campaignIntroLevel.lessons[lessonIndex];
}

function getCampaignIntroLessonIndex(lessonStep: number) {
	const lastLessonIndex = campaignIntroLevel.lessons.length - 1;

	if (lastLessonIndex <= 0) {
		return 0;
	}

	return Math.max(0, Math.min(Math.floor(lessonStep), lastLessonIndex));
}

function getImageConceptOpenMojiHexcode(concept: StarterConceptId) {
	const hexcodes: Record<StarterConceptId, string> = {
		bye: '1F44B',
		fine: '1F642',
		goodbye: '1F44B',
		hello: '1F44B',
		hi: '1F44B',
		name: '1F464',
		no: '274C',
		not: '274C',
		thanks: '1F64F',
		yes: '2705'
	};

	return hexcodes[concept];
}

function uniqueItems<T>(items: readonly T[]) {
	return Array.from(new Set(items));
}

function shuffleBySeed<T>(items: readonly T[], seed: string): T[] {
	const result = [...items];
	const random = createSeededRandom(seed);

	for (let index = result.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(random() * (index + 1));
		const item = result[index];

		result[index] = result[swapIndex];
		result[swapIndex] = item;
	}

	return result;
}

function createSeededRandom(seed: string) {
	let state = hashString(seed) || 1;

	return () => {
		state = (Math.imul(state, 1664525) + 1013904223) >>> 0;

		return state / 4294967296;
	};
}

function hashString(value: string) {
	let hash = 2166136261;

	for (let index = 0; index < value.length; index += 1) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}

	return hash >>> 0;
}

function createConceptLabeler(language: SupportedLanguageCode, uiLanguage: SupportedLanguageCode) {
	const label = ((concept: StarterConceptId) => {
		return starterConceptLabels[concept][language];
	}) as ConceptLabeler;

	label.option = (concept: StarterConceptId, id = concept): ExerciseOption => ({
		id,
		label: label(concept),
		pronunciationHint: getPronunciationHint(concept, language, uiLanguage)
	});

	label.matchItem = (concept: StarterConceptId, id = concept) => ({
		id,
		label: label(concept),
		pronunciationHint: getPronunciationHint(concept, language, uiLanguage)
	});

	return label;
}

function getPronunciationHint(
	concept: StarterConceptId,
	language: SupportedLanguageCode,
	uiLanguage: SupportedLanguageCode
) {
	if (language !== 'zh') {
		return undefined;
	}

	const pinyin = starterPinyin[concept];

	if (!pinyin) {
		return undefined;
	}

	return {
		pinyin,
		meaning: starterConceptLabels[concept][uiLanguage]
	};
}

function createNameOrderExercise(
	language: SupportedLanguageCode,
	personName: string
): Extract<LearningExercise, { type: 'wordOrder' }> {
	if (language === 'en') {
		return {
			id: 'en-name-order',
			type: 'wordOrder',
			prompt: '',
			potentialXp: 8,
			openMojiHexcode: '1F464',
			tokens: [
				{ id: 'my', label: 'My' },
				{ id: 'name', label: 'name' },
				{ id: 'is', label: 'is' },
				{ id: 'mia', label: personName }
			],
			correctTokenIds: ['my', 'name', 'is', 'mia']
		};
	}

	if (language === 'zh') {
		return {
			id: 'zh-name-order',
			type: 'wordOrder',
			prompt: '',
			potentialXp: 8,
			openMojiHexcode: '1F464',
			tokens: [
				{ id: 'wo', label: '我', pronunciationHint: { pinyin: 'wǒ' } },
				{ id: 'jiao', label: '叫', pronunciationHint: { pinyin: 'jiào' } },
				{ id: 'lina', label: personName }
			],
			correctTokenIds: ['wo', 'jiao', 'lina']
		};
	}

	return {
		id: 'fr-name-order',
		type: 'wordOrder',
		prompt: '',
		potentialXp: 8,
		openMojiHexcode: '1F464',
		tokens: [
			{ id: 'je', label: 'Je' },
			{ id: 'mappelle', label: 'm’appelle' },
			{ id: 'lina', label: personName }
		],
		correctTokenIds: ['je', 'mappelle', 'lina']
	};
}

function createGoodbyeOrderExercise(
	language: SupportedLanguageCode,
	personName: string
): Extract<LearningExercise, { type: 'wordOrder' }> {
	if (language === 'en') {
		return {
			id: 'en-goodbye-order',
			type: 'wordOrder',
			prompt: '',
			potentialXp: 8,
			openMojiHexcode: '1F44B',
			tokens: [
				{ id: 'goodbye', label: 'Goodbye' },
				{ id: 'mia', label: personName }
			],
			correctTokenIds: ['goodbye', 'mia']
		};
	}

	if (language === 'zh') {
		return {
			id: 'zh-goodbye-order',
			type: 'wordOrder',
			prompt: '',
			potentialXp: 8,
			openMojiHexcode: '1F44B',
			tokens: [
				{ id: 'zai', label: '再', pronunciationHint: { pinyin: 'zài' } },
				{ id: 'jian', label: '见', pronunciationHint: { pinyin: 'jiàn' } },
				{ id: 'lina', label: personName }
			],
			correctTokenIds: ['zai', 'jian', 'lina']
		};
	}

	return {
		id: 'fr-goodbye-order',
		type: 'wordOrder',
		prompt: '',
		potentialXp: 8,
		openMojiHexcode: '1F44B',
		tokens: [
			{ id: 'au', label: 'Au' },
			{ id: 'revoir', label: 'revoir' },
			{ id: 'lina', label: personName }
		],
		correctTokenIds: ['au', 'revoir', 'lina']
	};
}

function getFineOption(language: SupportedLanguageCode, uiLanguage: SupportedLanguageCode): ExerciseOption {
	if (language === 'zh') {
		return {
			id: 'fine',
			label: '我很好',
			pronunciationHint: {
				pinyin: 'wǒ hěn hǎo',
				meaning: starterConceptLabels.fine[uiLanguage]
			}
		};
	}

	return {
		id: 'fine',
		label: starterConceptLabels.fine[language]
	};
}

function getNamePhraseOption(language: SupportedLanguageCode, personName: string): ExerciseOption {
	if (language === 'en') {
		return {
			id: 'name',
			label: `My name is ${personName}.`
		};
	}

	if (language === 'zh') {
		return {
			id: 'name',
			label: `我叫 ${personName}`,
			pronunciationHint: {
				pinyin: `wǒ jiào ${personName}`
			}
		};
	}

	return {
		id: 'name',
		label: `Je m’appelle ${personName}.`
	};
}

function getHowAreYouPrompt(language: SupportedLanguageCode) {
	if (language === 'en') {
		return 'How are you?';
	}

	if (language === 'zh') {
		return '你好吗？';
	}

	return 'Ça va ?';
}

function getStarterPassage(language: SupportedLanguageCode, personName: string) {
	if (language === 'en') {
		return `Hello! My name is ${personName}. Thank you. Goodbye!`;
	}

	if (language === 'zh') {
		return `你好！我叫 ${personName}。谢谢。再见！`;
	}

	return `Bonjour ! Je m’appelle ${personName}. Merci. Au revoir !`;
}

function getNativeNameSentence(language: SupportedLanguageCode, personName: string) {
	if (language === 'en') {
		return `My name is ${personName}`;
	}

	if (language === 'zh') {
		return `我叫 ${personName}`;
	}

	return `Je m’appelle ${personName}`;
}

function getStarterLessonTitle(uiLanguage: SupportedLanguageCode, lessonStep: number) {
	const lessonNumber = getCampaignIntroLessonIndex(lessonStep) + 1;
	const lessonCount = campaignIntroLevel.lessons.length;
	const titles: Record<SupportedLanguageCode, string> = {
		en: `Lesson ${lessonNumber}/${lessonCount}`,
		fr: `Leçon ${lessonNumber}/${lessonCount}`,
		zh: `第 ${lessonNumber}/${lessonCount} 课`
	};

	return titles[uiLanguage];
}
