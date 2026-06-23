import type { ExerciseMatchItem, ExerciseOption, LearningExercise, SupportedLanguageCode } from '@classyc/shared';
import { chineseStarterExercises } from './chinese-exercises';
import { englishStarterExercises } from './english-exercises';
import { frenchStarterExercises } from './french-exercises';
import { getExerciseCopy } from './exercise-copy';

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
	uiLanguage: SupportedLanguageCode = 'fr'
) {
	return {
		...exerciseDeckContentByLanguage[language],
		title: getStarterLessonTitle(uiLanguage),
		exercises: createStarterExercises(language, uiLanguage)
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

interface ConceptLabeler {
	(concept: StarterConceptId): string;
	matchItem: (concept: StarterConceptId, id?: string) => ExerciseMatchItem;
	option: (concept: StarterConceptId, id?: string) => ExerciseOption;
}

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

function createStarterExercises(targetLanguage: SupportedLanguageCode, uiLanguage: SupportedLanguageCode): readonly LearningExercise[] {
	const copy = getExerciseCopy(uiLanguage);
	const target = createConceptLabeler(targetLanguage, uiLanguage);
	const native = createConceptLabeler(uiLanguage, uiLanguage);
	const personName = targetLanguage === 'en' ? 'Mia' : 'Lina';

	return [
		{
			id: `${targetLanguage}-hello-image`,
			type: 'imageChoice',
			prompt: '',
			potentialXp: 6,
			openMojiHexcode: '1F44B',
			imageOpenMojiHexcode: '1F44B',
			imageAlt: native('hello'),
			options: [
				target.option('hello'),
				target.option('thanks'),
				target.option('no')
			],
			correctOptionId: 'hello'
		},
		{
			id: `${targetLanguage}-basic-match`,
			type: 'matching',
			prompt: '',
			potentialXp: 10,
			openMojiHexcode: '1F4AC',
			pairs: [
				{
					id: 'hello',
					left: target.matchItem('hello'),
					right: native.matchItem('hello', 'hello-native')
				},
				{
					id: 'thanks',
					left: target.matchItem('thanks'),
					right: native.matchItem('thanks', 'thanks-native')
				},
				{
					id: 'goodbye',
					left: target.matchItem('goodbye'),
					right: native.matchItem('goodbye', 'goodbye-native')
				}
			]
		},
		{
			id: `${targetLanguage}-thanks-meaning`,
			type: 'multipleChoice',
			prompt: target('thanks'),
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

function createNameOrderExercise(language: SupportedLanguageCode, personName: string): LearningExercise {
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

function createGoodbyeOrderExercise(language: SupportedLanguageCode, personName: string): LearningExercise {
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

function getStarterLessonTitle(uiLanguage: SupportedLanguageCode) {
	const titles: Record<SupportedLanguageCode, string> = {
		en: 'Lesson 1',
		fr: 'Leçon 1',
		zh: '第 1 课'
	};

	return titles[uiLanguage];
}
