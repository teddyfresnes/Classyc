import type { ExerciseAnswer, LearningExercise } from '@classyc/shared';

export const chineseStarterExercises: readonly LearningExercise[] = [
	{
		id: 'zh-hello-image',
		type: 'imageChoice',
		prompt: 'On dit quoi ici ?',
		potentialXp: 6,
		openMojiHexcode: '1F44B',
		imageOpenMojiHexcode: '1F44B',
		imageAlt: 'Main qui salue',
		options: [
			{
				id: 'nihao',
				label: '你好',
				pronunciationHint: {
					pinyin: 'nǐ hǎo',
					meaning: 'bonjour'
				}
			},
			{
				id: 'xiexie',
				label: '谢谢',
				pronunciationHint: {
					pinyin: 'xiè xie',
					meaning: 'merci'
				}
			},
			{
				id: 'bushi',
				label: '不是',
				pronunciationHint: {
					pinyin: 'bú shì',
					meaning: 'non / ce n’est pas'
				}
			}
		],
		correctOptionId: 'nihao'
	},
	{
		id: 'zh-basic-match',
		type: 'matching',
		prompt: 'Relie chaque mot.',
		potentialXp: 10,
		openMojiHexcode: '1F4AC',
		pairs: [
			{
				id: 'nihao',
				left: {
					id: 'nihao',
					label: '你好',
					pronunciationHint: {
						pinyin: 'nǐ hǎo'
					}
				},
				right: {
					id: 'hello',
					label: 'Bonjour'
				}
			},
			{
				id: 'xiexie',
				left: {
					id: 'xiexie',
					label: '谢谢',
					pronunciationHint: {
						pinyin: 'xiè xie'
					}
				},
				right: {
					id: 'thanks',
					label: 'Merci'
				}
			},
			{
				id: 'zaijian',
				left: {
					id: 'zaijian',
					label: '再见',
					pronunciationHint: {
						pinyin: 'zài jiàn'
					}
				},
				right: {
					id: 'goodbye',
					label: 'Au revoir'
				}
			}
		]
	},
	{
		id: 'zh-thanks-image',
		type: 'imageChoice',
		prompt: 'Choisis le mot.',
		potentialXp: 6,
		openMojiHexcode: '1F64F',
		imageOpenMojiHexcode: '1F64F',
		imageAlt: 'Geste de remerciement',
		options: [
			{
				id: 'nihao',
				label: '你好',
				pronunciationHint: {
					pinyin: 'nǐ hǎo',
					meaning: 'bonjour'
				}
			},
			{
				id: 'xiexie',
				label: '谢谢',
				pronunciationHint: {
					pinyin: 'xiè xie',
					meaning: 'merci'
				}
			},
			{
				id: 'zaijian',
				label: '再见',
				pronunciationHint: {
					pinyin: 'zài jiàn',
					meaning: 'au revoir'
				}
			}
		],
		correctOptionId: 'xiexie'
	},
	{
		id: 'zh-yes-no-image-match',
		type: 'matching',
		prompt: 'Associe le mot et l’image.',
		potentialXp: 10,
		openMojiHexcode: '2705',
		pairs: [
			{
				id: 'shi',
				left: {
					id: 'shi',
					label: '是',
					pronunciationHint: {
						pinyin: 'shì',
						meaning: 'oui / c’est'
					}
				},
				right: {
					id: 'yes-icon',
					label: 'Oui',
					openMojiHexcode: '2705'
				}
			},
			{
				id: 'bushi',
				left: {
					id: 'bushi',
					label: '不是',
					pronunciationHint: {
						pinyin: 'bú shì',
						meaning: 'non / ce n’est pas'
					}
				},
				right: {
					id: 'no-icon',
					label: 'Non',
					openMojiHexcode: '274C'
				}
			},
			{
				id: 'nihao',
				left: {
					id: 'nihao',
					label: '你好',
					pronunciationHint: {
						pinyin: 'nǐ hǎo',
						meaning: 'bonjour'
					}
				},
				right: {
					id: 'wave-icon',
					label: 'Salut',
					openMojiHexcode: '1F44B'
				}
			}
		]
	},
	{
		id: 'zh-name-order',
		type: 'wordOrder',
		prompt: 'Remets les mots.',
		potentialXp: 8,
		openMojiHexcode: '1F464',
		tokens: [
			{
				id: 'wo',
				label: '我',
				pronunciationHint: {
					pinyin: 'wǒ',
					meaning: 'je'
				}
			},
			{
				id: 'jiao',
				label: '叫',
				pronunciationHint: {
					pinyin: 'jiào',
					meaning: 's’appeler'
				}
			},
			{
				id: 'lina',
				label: 'Lina'
			}
		],
		correctTokenIds: ['wo', 'jiao', 'lina']
	},
	{
		id: 'zh-nihao-choice-repeat',
		type: 'multipleChoice',
		prompt: '你好',
		potentialXp: 6,
		openMojiHexcode: '1F642',
		pronunciationHint: {
			pinyin: 'nǐ hǎo',
			meaning: 'bonjour'
		},
		options: [
			{
				id: 'hello',
				label: 'Bonjour'
			},
			{
				id: 'thanks',
				label: 'Merci'
			},
			{
				id: 'bye',
				label: 'Au revoir'
			}
		],
		correctOptionId: 'hello'
	},
	{
		id: 'zh-goodbye-order',
		type: 'wordOrder',
		prompt: 'Remets les mots.',
		potentialXp: 8,
		openMojiHexcode: '1F44B',
		tokens: [
			{
				id: 'zai',
				label: '再',
				pronunciationHint: {
					pinyin: 'zài'
				}
			},
			{
				id: 'jian',
				label: '见',
				pronunciationHint: {
					pinyin: 'jiàn'
				}
			},
			{
				id: 'lina',
				label: 'Lina'
			}
		],
		correctTokenIds: ['zai', 'jian', 'lina']
	},
	{
		id: 'zh-mini-phrase',
		type: 'readingComprehension',
		prompt: 'Lis.',
		potentialXp: 10,
		openMojiHexcode: '1F4D6',
		passage: '你好！我叫 Lina。谢谢。再见！',
		pronunciationHint: {
			pinyin: 'Nǐ hǎo! Wǒ jiào Lina. Xiè xie. Zài jiàn!',
			meaning: 'Bonjour ! Je m’appelle Lina. Merci. Au revoir !'
		},
		questions: [
			{
				id: 'name',
				prompt: '她叫什么？',
				pronunciationHint: {
					pinyin: 'Tā jiào shénme?',
					meaning: 'Comment elle s’appelle ?'
				},
				options: [
					{
						id: 'lina',
						label: 'Lina'
					},
					{
						id: 'xiexie',
						label: '谢谢',
						pronunciationHint: {
							pinyin: 'xiè xie'
						}
					}
				],
				correctOptionId: 'lina'
			},
			{
				id: 'thanks',
				prompt: '哪个词表示 merci ?',
				pronunciationHint: {
					pinyin: 'Nǎ ge cí biǎoshì merci?'
				},
				options: [
					{
						id: 'xiexie',
						label: '谢谢',
						pronunciationHint: {
							pinyin: 'xiè xie'
						}
					},
					{
						id: 'bushi',
						label: '不是',
						pronunciationHint: {
							pinyin: 'bú shì'
						}
					}
				],
				correctOptionId: 'xiexie'
			}
		]
	}
];

export const chineseStarterExerciseAnswers: readonly ExerciseAnswer[] = [
	{
		exerciseId: 'zh-hello-image',
		type: 'imageChoice',
		optionId: 'nihao'
	},
	{
		exerciseId: 'zh-basic-match',
		type: 'matching',
		matches: [
			{
				leftId: 'nihao',
				rightId: 'hello'
			},
			{
				leftId: 'xiexie',
				rightId: 'thanks'
			},
			{
				leftId: 'zaijian',
				rightId: 'goodbye'
			}
		]
	},
	{
		exerciseId: 'zh-thanks-image',
		type: 'imageChoice',
		optionId: 'xiexie'
	},
	{
		exerciseId: 'zh-yes-no-image-match',
		type: 'matching',
		matches: [
			{
				leftId: 'shi',
				rightId: 'yes-icon'
			},
			{
				leftId: 'bushi',
				rightId: 'no-icon'
			},
			{
				leftId: 'nihao',
				rightId: 'wave-icon'
			}
		]
	},
	{
		exerciseId: 'zh-name-order',
		type: 'wordOrder',
		tokenIds: ['wo', 'jiao', 'lina']
	},
	{
		exerciseId: 'zh-nihao-choice-repeat',
		type: 'multipleChoice',
		optionId: 'hello'
	},
	{
		exerciseId: 'zh-goodbye-order',
		type: 'wordOrder',
		tokenIds: ['zai', 'jian', 'lina']
	},
	{
		exerciseId: 'zh-mini-phrase',
		type: 'readingComprehension',
		answers: [
			{
				questionId: 'name',
				optionId: 'lina'
			},
			{
				questionId: 'thanks',
				optionId: 'xiexie'
			}
		]
	}
];
