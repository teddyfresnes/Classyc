import type { ExerciseAnswer, LearningExercise } from '@classyc/shared';

export const chineseStarterExercises: readonly LearningExercise[] = [
	{
		id: 'zh-nihao-meaning',
		type: 'multipleChoice',
		prompt: 'Que veut dire 你好 ?',
		instruction: 'Associe le mot chinois a son sens.',
		potentialXp: 8,
		openMojiHexcode: '1F44B',
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
				id: 'water',
				label: 'Eau'
			}
		],
		correctOptionId: 'hello'
	},
	{
		id: 'zh-nihao-fill',
		type: 'fillBlank',
		prompt: '你 ___',
		instruction: 'Complete le mot 你好.',
		potentialXp: 10,
		openMojiHexcode: '270D',
		placeholder: '好',
		pronunciationHint: {
			pinyin: 'nǐ hǎo',
			meaning: 'bonjour'
		},
		acceptedAnswers: ['好', 'hao', 'hǎo']
	},
	{
		id: 'zh-xiexie-true-false',
		type: 'trueFalse',
		prompt: 'Observe 谢谢.',
		statement: '`谢谢` veut dire merci.',
		potentialXp: 6,
		openMojiHexcode: '2705',
		pronunciationHint: {
			pinyin: 'xiè xie',
			meaning: 'merci'
		},
		correctAnswer: true
	},
	{
		id: 'zh-water-character',
		type: 'multipleChoice',
		prompt: 'Choisis le caractere pour eau.',
		instruction: 'Utilise le sens et le pinyin pour reconnaitre le caractere.',
		potentialXp: 10,
		openMojiHexcode: '1F4A7',
		options: [
			{
				id: 'water',
				label: '水',
				pronunciationHint: {
					pinyin: 'shuǐ',
					meaning: 'eau'
				}
			},
			{
				id: 'fire',
				label: '火',
				pronunciationHint: {
					pinyin: 'huǒ',
					meaning: 'feu'
				}
			},
			{
				id: 'person',
				label: '人',
				pronunciationHint: {
					pinyin: 'rén',
					meaning: 'personne'
				}
			}
		],
		correctOptionId: 'water'
	},
	{
		id: 'zh-reading-short',
		type: 'readingComprehension',
		prompt: 'Lis le texte court.',
		instruction: 'Reponds avec 是 ou 不是.',
		potentialXp: 12,
		openMojiHexcode: '1F4D6',
		passageTitle: '小明的书',
		passage: '小明有一本书。他喜欢书。',
		pronunciationHint: {
			pinyin: 'Xiǎo Míng yǒu yì běn shū. Tā xǐ huān shū.',
			meaning: 'Xiao Ming a un livre. Il aime les livres.'
		},
		questions: [
			{
				id: 'has-book',
				prompt: '小明有书吗？',
				pronunciationHint: {
					pinyin: 'Xiǎo Míng yǒu shū ma?',
					meaning: 'Xiao Ming a-t-il un livre ?'
				},
				options: [
					{
						id: 'yes',
						label: '是',
						pronunciationHint: {
							pinyin: 'shì',
							meaning: 'oui / c est'
						}
					},
					{
						id: 'no',
						label: '不是',
						pronunciationHint: {
							pinyin: 'bú shì',
							meaning: 'non / ce n est pas'
						}
					}
				],
				correctOptionId: 'yes'
			},
			{
				id: 'likes-water',
				prompt: '他喜欢水吗？',
				pronunciationHint: {
					pinyin: 'Tā xǐ huān shuǐ ma?',
					meaning: 'Aime-t-il l eau ?'
				},
				options: [
					{
						id: 'yes',
						label: '是',
						pronunciationHint: {
							pinyin: 'shì',
							meaning: 'oui / c est'
						}
					},
					{
						id: 'no',
						label: '不是',
						pronunciationHint: {
							pinyin: 'bú shì',
							meaning: 'non / ce n est pas'
						}
					}
				],
				correctOptionId: 'no'
			}
		]
	}
];

export const chineseStarterExerciseAnswers: readonly ExerciseAnswer[] = [
	{
		exerciseId: 'zh-nihao-meaning',
		type: 'multipleChoice',
		optionId: 'hello'
	},
	{
		exerciseId: 'zh-nihao-fill',
		type: 'fillBlank',
		value: '好'
	},
	{
		exerciseId: 'zh-xiexie-true-false',
		type: 'trueFalse',
		value: true
	},
	{
		exerciseId: 'zh-water-character',
		type: 'multipleChoice',
		optionId: 'water'
	},
	{
		exerciseId: 'zh-reading-short',
		type: 'readingComprehension',
		answers: [
			{
				questionId: 'has-book',
				optionId: 'yes'
			},
			{
				questionId: 'likes-water',
				optionId: 'no'
			}
		]
	}
];
