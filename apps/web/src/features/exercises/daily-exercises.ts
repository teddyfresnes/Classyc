import type { ExerciseAnswer, LearningExercise, SupportedLanguageCode } from '@classyc/shared';
import type { ExerciseDeckContent } from './exercise-content';

export type DailyExerciseTemplateId = 'daily-routine' | 'daily-memory' | 'daily-sounds' | 'daily-challenge';

export interface DailyExerciseDeckContent extends ExerciseDeckContent {
	difficultyLabel: string;
	lessonId: string;
}

const dailyExerciseTemplateIds: readonly DailyExerciseTemplateId[] = [
	'daily-routine',
	'daily-memory',
	'daily-sounds',
	'daily-challenge'
];

const dailyDifficultyLabels: Record<SupportedLanguageCode, Record<DailyExerciseTemplateId, string>> = {
	en: {
		'daily-challenge': 'Hard',
		'daily-memory': 'Medium',
		'daily-routine': 'Easy',
		'daily-sounds': 'Medium'
	},
	fr: {
		'daily-challenge': 'Difficile',
		'daily-memory': 'Moyen',
		'daily-routine': 'Facile',
		'daily-sounds': 'Moyen'
	},
	zh: {
		'daily-challenge': '困难',
		'daily-memory': '中等',
		'daily-routine': '简单',
		'daily-sounds': '中等'
	}
};

const dailyDeckTitles: Record<SupportedLanguageCode, string> = {
	en: 'Daily quest',
	fr: 'Quête du jour',
	zh: '每日任务'
};

const dailyExerciseContent: Record<
	DailyExerciseTemplateId,
	Record<SupportedLanguageCode, Omit<DailyExerciseDeckContent, 'difficultyLabel' | 'language' | 'lessonId'>>
> = {
	'daily-routine': {
		en: {
			eyebrow: '',
			title: 'Daily quest',
			exercises: [
				{
					id: 'daily-en-routine-hello',
					type: 'imageChoice',
					prompt: 'What do you say here?',
					potentialXp: 5,
					openMojiHexcode: '1F44B',
					imageOpenMojiHexcode: '1F44B',
					imageAlt: 'Waving hand',
					options: [
						{ id: 'hello', label: 'Hello' },
						{ id: 'thanks', label: 'Thank you' },
						{ id: 'no', label: 'No' }
					],
					correctOptionId: 'hello'
				},
				{
					id: 'daily-en-routine-order',
					type: 'wordOrder',
					prompt: 'Put the words in order.',
					potentialXp: 6,
					openMojiHexcode: '1F464',
					tokens: [
						{ id: 'my', label: 'My' },
						{ id: 'name', label: 'name' },
						{ id: 'is', label: 'is' },
						{ id: 'mia', label: 'Mia' }
					],
					correctTokenIds: ['my', 'name', 'is', 'mia']
				}
			]
		},
		fr: {
			eyebrow: '',
			title: 'Quête du jour',
			exercises: [
				{
					id: 'daily-fr-routine-hello',
					type: 'imageChoice',
					prompt: 'Que dit-on ici ?',
					potentialXp: 5,
					openMojiHexcode: '1F44B',
					imageOpenMojiHexcode: '1F44B',
					imageAlt: 'Main qui salue',
					options: [
						{ id: 'bonjour', label: 'Bonjour' },
						{ id: 'merci', label: 'Merci' },
						{ id: 'non', label: 'Non' }
					],
					correctOptionId: 'bonjour'
				},
				{
					id: 'daily-fr-routine-order',
					type: 'wordOrder',
					prompt: 'Remets les mots.',
					potentialXp: 6,
					openMojiHexcode: '1F464',
					tokens: [
						{ id: 'je', label: 'Je' },
						{ id: 'mappelle', label: 'm’appelle' },
						{ id: 'lina', label: 'Lina' }
					],
					correctTokenIds: ['je', 'mappelle', 'lina']
				}
			]
		},
		zh: {
			eyebrow: '',
			title: '每日练习',
			exercises: [
				{
					id: 'daily-zh-routine-hello',
					type: 'imageChoice',
					prompt: 'On dit quoi ici ?',
					potentialXp: 5,
					openMojiHexcode: '1F44B',
					imageOpenMojiHexcode: '1F44B',
					imageAlt: 'Main qui salue',
					options: [
						{
							id: 'nihao',
							label: '你好',
							pronunciationHint: { pinyin: 'nǐ hǎo', meaning: 'bonjour' }
						},
						{
							id: 'xiexie',
							label: '谢谢',
							pronunciationHint: { pinyin: 'xiè xie', meaning: 'merci' }
						},
						{
							id: 'bushi',
							label: '不是',
							pronunciationHint: { pinyin: 'bú shì', meaning: 'non' }
						}
					],
					correctOptionId: 'nihao'
				},
				{
					id: 'daily-zh-routine-order',
					type: 'wordOrder',
					prompt: 'Remets les mots.',
					potentialXp: 6,
					openMojiHexcode: '1F464',
					tokens: [
						{ id: 'wo', label: '我', pronunciationHint: { pinyin: 'wǒ' } },
						{ id: 'jiao', label: '叫', pronunciationHint: { pinyin: 'jiào' } },
						{ id: 'lina', label: 'Lina' }
					],
					correctTokenIds: ['wo', 'jiao', 'lina']
				}
			]
		}
	},
	'daily-memory': {
		en: {
			eyebrow: '',
			title: 'Daily quest',
			exercises: [
				{
					id: 'daily-en-memory-be',
					type: 'multipleChoice',
					prompt: 'She ___ ready.',
					potentialXp: 8,
					openMojiHexcode: '270D',
					options: [
						{ id: 'is', label: 'is' },
						{ id: 'are', label: 'are' },
						{ id: 'am', label: 'am' }
					],
					correctOptionId: 'is'
				},
				{
					id: 'daily-en-memory-true',
					type: 'trueFalse',
					prompt: 'Read.',
					statement: '`They are here` is correct.',
					potentialXp: 6,
					openMojiHexcode: '2705',
					correctAnswer: true
				}
			]
		},
		fr: {
			eyebrow: '',
			title: 'Quête du jour',
			exercises: [
				{
					id: 'daily-fr-memory-est',
					type: 'multipleChoice',
					prompt: 'Il ___ content.',
					potentialXp: 8,
					openMojiHexcode: '270D',
					options: [
						{ id: 'est', label: 'est' },
						{ id: 'et', label: 'et' },
						{ id: 'es', label: 'es' }
					],
					correctOptionId: 'est'
				},
				{
					id: 'daily-fr-memory-et',
					type: 'trueFalse',
					prompt: 'Observe.',
					statement: '`et` relie deux mots.',
					potentialXp: 6,
					openMojiHexcode: '2705',
					correctAnswer: true
				}
			]
		},
		zh: {
			eyebrow: '',
			title: '每日练习',
			exercises: [
				{
					id: 'daily-zh-memory-shi',
					type: 'multipleChoice',
					prompt: '是',
					potentialXp: 8,
					openMojiHexcode: '2705',
					pronunciationHint: { pinyin: 'shì', meaning: 'oui / c’est' },
					options: [
						{ id: 'yes', label: 'Oui' },
						{ id: 'thanks', label: 'Merci' },
						{ id: 'bye', label: 'Au revoir' }
					],
					correctOptionId: 'yes'
				},
				{
					id: 'daily-zh-memory-bushi',
					type: 'trueFalse',
					prompt: '不是',
					statement: '`不是` veut dire non / ce n’est pas.',
					potentialXp: 6,
					openMojiHexcode: '274C',
					pronunciationHint: { pinyin: 'bú shì' },
					correctAnswer: true
				}
			]
		}
	},
	'daily-sounds': {
		en: {
			eyebrow: '',
			title: 'Daily quest',
			exercises: [
				{
					id: 'daily-en-sounds-match',
					type: 'matching',
					prompt: 'Match sound and word.',
					potentialXp: 8,
					openMojiHexcode: '1F399',
					pairs: [
						{
							id: 'hello',
							left: { id: 'heh-loh', label: 'heh-loh' },
							right: { id: 'hello', label: 'Hello' }
						},
						{
							id: 'thanks',
							left: { id: 'thanks-sound', label: 'thanks' },
							right: { id: 'thanks', label: 'Thank you' }
						}
					]
				},
				{
					id: 'daily-en-sounds-choice',
					type: 'multipleChoice',
					prompt: 'How are you?',
					potentialXp: 6,
					openMojiHexcode: '1F642',
					options: [
						{ id: 'fine', label: 'I am fine.' },
						{ id: 'bye', label: 'Goodbye.' },
						{ id: 'yes', label: 'Yes.' }
					],
					correctOptionId: 'fine'
				}
			]
		},
		fr: {
			eyebrow: '',
			title: 'Quête du jour',
			exercises: [
				{
					id: 'daily-fr-sounds-match',
					type: 'matching',
					prompt: 'Relie son et mot.',
					potentialXp: 8,
					openMojiHexcode: '1F399',
					pairs: [
						{
							id: 'bonjour',
							left: { id: 'bon-jour', label: 'bon-jour' },
							right: { id: 'bonjour', label: 'Bonjour' }
						},
						{
							id: 'merci',
							left: { id: 'mer-ci', label: 'mer-ci' },
							right: { id: 'merci', label: 'Merci' }
						}
					]
				},
				{
					id: 'daily-fr-sounds-choice',
					type: 'multipleChoice',
					prompt: 'Ça va ?',
					potentialXp: 6,
					openMojiHexcode: '1F642',
					options: [
						{ id: 'oui', label: 'Oui, ça va.' },
						{ id: 'bye', label: 'Au revoir.' },
						{ id: 'name', label: 'Je m’appelle.' }
					],
					correctOptionId: 'oui'
				}
			]
		},
		zh: {
			eyebrow: '',
			title: '每日练习',
			exercises: [
				{
					id: 'daily-zh-sounds-match',
					type: 'matching',
					prompt: 'Relie pinyin et mot.',
					potentialXp: 8,
					openMojiHexcode: '1F399',
					pairs: [
						{
							id: 'nihao',
							left: { id: 'ni-hao', label: 'nǐ hǎo' },
							right: { id: 'nihao', label: '你好' }
						},
						{
							id: 'xiexie',
							left: { id: 'xie-xie', label: 'xiè xie' },
							right: { id: 'xiexie', label: '谢谢' }
						}
					]
				},
				{
					id: 'daily-zh-sounds-choice',
					type: 'multipleChoice',
					prompt: 'nǐ hǎo',
					potentialXp: 6,
					openMojiHexcode: '1F44B',
					options: [
						{ id: 'nihao', label: '你好' },
						{ id: 'xiexie', label: '谢谢' },
						{ id: 'zaijian', label: '再见' }
					],
					correctOptionId: 'nihao'
				}
			]
		}
	},
	'daily-challenge': {
		en: {
			eyebrow: '',
			title: 'Daily quest',
			exercises: [
				{
					id: 'daily-en-challenge-has',
					type: 'fillBlank',
					prompt: 'She ___ a blue bag.',
					potentialXp: 10,
					openMojiHexcode: '1F4DD',
					placeholder: 'has',
					acceptedAnswers: ['has']
				},
				{
					id: 'daily-en-challenge-reading',
					type: 'readingComprehension',
					prompt: 'Read.',
					potentialXp: 10,
					openMojiHexcode: '1F4D6',
					passage: 'Mia has a small book. She reads it in the park.',
					questions: [
						{
							id: 'object',
							prompt: 'What does Mia have?',
							options: [
								{ id: 'book', label: 'A book' },
								{ id: 'bike', label: 'A bike' }
							],
							correctOptionId: 'book'
						}
					]
				}
			]
		},
		fr: {
			eyebrow: '',
			title: 'Quête du jour',
			exercises: [
				{
					id: 'daily-fr-challenge-connaitre',
					type: 'fillBlank',
					prompt: 'Je ___ cette ville.',
					potentialXp: 10,
					openMojiHexcode: '1F4DD',
					placeholder: 'connais',
					acceptedAnswers: ['connais']
				},
				{
					id: 'daily-fr-challenge-etre',
					type: 'fillBlank',
					prompt: 'Nous ___ prêts.',
					potentialXp: 10,
					openMojiHexcode: '270D',
					placeholder: 'sommes',
					acceptedAnswers: ['sommes']
				}
			]
		},
		zh: {
			eyebrow: '',
			title: '每日练习',
			exercises: [
				{
					id: 'daily-zh-challenge-reading',
					type: 'readingComprehension',
					prompt: 'Lis.',
					potentialXp: 10,
					openMojiHexcode: '1F4D6',
					passage: '小明说：你好。我叫小明。谢谢。',
					pronunciationHint: {
						pinyin: 'Xiǎo Míng shuō: nǐ hǎo. Wǒ jiào Xiǎo Míng. Xiè xie.'
					},
					questions: [
						{
							id: 'name',
							prompt: '他叫什么？',
							options: [
								{ id: 'xiaoming', label: '小明', pronunciationHint: { pinyin: 'Xiǎo Míng' } },
								{ id: 'xiexie', label: '谢谢', pronunciationHint: { pinyin: 'xiè xie' } }
							],
							correctOptionId: 'xiaoming'
						}
					]
				},
				{
					id: 'daily-zh-challenge-bushi',
					type: 'multipleChoice',
					prompt: '不是',
					potentialXp: 8,
					openMojiHexcode: '274C',
					pronunciationHint: { pinyin: 'bú shì' },
					options: [
						{ id: 'not', label: 'Non / ce n’est pas' },
						{ id: 'thanks', label: 'Merci' },
						{ id: 'hello', label: 'Bonjour' }
					],
					correctOptionId: 'not'
				}
			]
		}
	}
};

export const dailyExerciseAnswers: Record<
	DailyExerciseTemplateId,
	Record<SupportedLanguageCode, readonly ExerciseAnswer[]>
> = {
	'daily-routine': {
		en: [
			{ exerciseId: 'daily-en-routine-hello', type: 'imageChoice', optionId: 'hello' },
			{ exerciseId: 'daily-en-routine-order', type: 'wordOrder', tokenIds: ['my', 'name', 'is', 'mia'] }
		],
		fr: [
			{ exerciseId: 'daily-fr-routine-hello', type: 'imageChoice', optionId: 'bonjour' },
			{ exerciseId: 'daily-fr-routine-order', type: 'wordOrder', tokenIds: ['je', 'mappelle', 'lina'] }
		],
		zh: [
			{ exerciseId: 'daily-zh-routine-hello', type: 'imageChoice', optionId: 'nihao' },
			{ exerciseId: 'daily-zh-routine-order', type: 'wordOrder', tokenIds: ['wo', 'jiao', 'lina'] }
		]
	},
	'daily-memory': {
		en: [
			{ exerciseId: 'daily-en-memory-be', type: 'multipleChoice', optionId: 'is' },
			{ exerciseId: 'daily-en-memory-true', type: 'trueFalse', value: true }
		],
		fr: [
			{ exerciseId: 'daily-fr-memory-est', type: 'multipleChoice', optionId: 'est' },
			{ exerciseId: 'daily-fr-memory-et', type: 'trueFalse', value: true }
		],
		zh: [
			{ exerciseId: 'daily-zh-memory-shi', type: 'multipleChoice', optionId: 'yes' },
			{ exerciseId: 'daily-zh-memory-bushi', type: 'trueFalse', value: true }
		]
	},
	'daily-sounds': {
		en: [
			{
				exerciseId: 'daily-en-sounds-match',
				type: 'matching',
				matches: [
					{ leftId: 'heh-loh', rightId: 'hello' },
					{ leftId: 'thanks-sound', rightId: 'thanks' }
				]
			},
			{ exerciseId: 'daily-en-sounds-choice', type: 'multipleChoice', optionId: 'fine' }
		],
		fr: [
			{
				exerciseId: 'daily-fr-sounds-match',
				type: 'matching',
				matches: [
					{ leftId: 'bon-jour', rightId: 'bonjour' },
					{ leftId: 'mer-ci', rightId: 'merci' }
				]
			},
			{ exerciseId: 'daily-fr-sounds-choice', type: 'multipleChoice', optionId: 'oui' }
		],
		zh: [
			{
				exerciseId: 'daily-zh-sounds-match',
				type: 'matching',
				matches: [
					{ leftId: 'ni-hao', rightId: 'nihao' },
					{ leftId: 'xie-xie', rightId: 'xiexie' }
				]
			},
			{ exerciseId: 'daily-zh-sounds-choice', type: 'multipleChoice', optionId: 'nihao' }
		]
	},
	'daily-challenge': {
		en: [
			{ exerciseId: 'daily-en-challenge-has', type: 'fillBlank', value: 'has' },
			{
				exerciseId: 'daily-en-challenge-reading',
				type: 'readingComprehension',
				answers: [{ questionId: 'object', optionId: 'book' }]
			}
		],
		fr: [
			{ exerciseId: 'daily-fr-challenge-connaitre', type: 'fillBlank', value: 'connais' },
			{ exerciseId: 'daily-fr-challenge-etre', type: 'fillBlank', value: 'sommes' }
		],
		zh: [
			{
				exerciseId: 'daily-zh-challenge-reading',
				type: 'readingComprehension',
				answers: [{ questionId: 'name', optionId: 'xiaoming' }]
			},
			{ exerciseId: 'daily-zh-challenge-bushi', type: 'multipleChoice', optionId: 'not' }
		]
	}
};

export function getDailyExerciseDeckContent(
	dailyLevelId: string | undefined,
	language: SupportedLanguageCode,
	uiLanguage: SupportedLanguageCode = 'fr'
): DailyExerciseDeckContent {
	const templateId = getDailyExerciseTemplateId(dailyLevelId);
	const content = dailyExerciseContent[templateId][language];

	return {
		...content,
		difficultyLabel: dailyDifficultyLabels[uiLanguage][templateId],
		exercises: localizeDailyExercises(content.exercises, language, uiLanguage),
		lessonId: dailyLevelId ?? templateId,
		title: dailyDeckTitles[uiLanguage],
		language
	};
}

export function getDailyExerciseAnswers(
	dailyLevelId: string | undefined,
	language: SupportedLanguageCode
) {
	return dailyExerciseAnswers[getDailyExerciseTemplateId(dailyLevelId)][language];
}

export function getDailyExerciseTemplateId(dailyLevelId: string | undefined): DailyExerciseTemplateId {
	return dailyExerciseTemplateIds.find((templateId) => (
		dailyLevelId === templateId || dailyLevelId?.startsWith(`${templateId}-`)
	)) ?? 'daily-routine';
}

function localizeDailyExercises(
	exercises: readonly LearningExercise[],
	targetLanguage: SupportedLanguageCode,
	uiLanguage: SupportedLanguageCode
): readonly LearningExercise[] {
	if (targetLanguage !== 'zh') {
		return exercises;
	}

	return exercises.map((exercise) => {
		if (exercise.id === 'daily-zh-routine-hello' && exercise.type === 'imageChoice') {
			return {
				...exercise,
				imageAlt: zhMeaningLabels.hello[uiLanguage],
				options: exercise.options.map((option) => ({
					...option,
					pronunciationHint: option.pronunciationHint
						? {
							...option.pronunciationHint,
							meaning: getZhOptionMeaning(option.id, uiLanguage)
						}
						: undefined
				}))
			};
		}

		if (exercise.id === 'daily-zh-memory-shi' && exercise.type === 'multipleChoice') {
			return {
				...exercise,
				pronunciationHint: {
					pinyin: 'shì',
					meaning: zhMeaningLabels.yes[uiLanguage]
				},
				options: [
					{ id: 'yes', label: zhMeaningLabels.yes[uiLanguage] },
					{ id: 'thanks', label: zhMeaningLabels.thanks[uiLanguage] },
					{ id: 'bye', label: zhMeaningLabels.goodbye[uiLanguage] }
				]
			};
		}

		if (exercise.id === 'daily-zh-memory-bushi' && exercise.type === 'trueFalse') {
			return {
				...exercise,
				pronunciationHint: {
					pinyin: 'bú shì',
					meaning: zhMeaningLabels.not[uiLanguage]
				},
				statement: `不是 = ${zhMeaningLabels.not[uiLanguage]}`
			};
		}

		if (exercise.id === 'daily-zh-challenge-bushi' && exercise.type === 'multipleChoice') {
			return {
				...exercise,
				pronunciationHint: {
					pinyin: 'bú shì',
					meaning: zhMeaningLabels.not[uiLanguage]
				},
				options: [
					{ id: 'not', label: zhMeaningLabels.not[uiLanguage] },
					{ id: 'thanks', label: zhMeaningLabels.thanks[uiLanguage] },
					{ id: 'hello', label: zhMeaningLabels.hello[uiLanguage] }
				]
			};
		}

		return exercise;
	});
}

const zhMeaningLabels: Record<string, Record<SupportedLanguageCode, string>> = {
	goodbye: {
		en: 'goodbye',
		fr: 'au revoir',
		zh: '再见'
	},
	hello: {
		en: 'hello',
		fr: 'bonjour',
		zh: '你好'
	},
	not: {
		en: 'no / not',
		fr: 'non / ce n’est pas',
		zh: '不是'
	},
	thanks: {
		en: 'thank you',
		fr: 'merci',
		zh: '谢谢'
	},
	yes: {
		en: 'yes',
		fr: 'oui',
		zh: '是'
	}
};

function getZhOptionMeaning(optionId: string, uiLanguage: SupportedLanguageCode) {
	if (optionId === 'nihao') {
		return zhMeaningLabels.hello[uiLanguage];
	}

	if (optionId === 'xiexie') {
		return zhMeaningLabels.thanks[uiLanguage];
	}

	if (optionId === 'bushi') {
		return zhMeaningLabels.not[uiLanguage];
	}

	return undefined;
}
