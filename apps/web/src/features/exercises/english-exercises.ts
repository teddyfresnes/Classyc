import type { ExerciseAnswer, LearningExercise } from '@classyc/shared';

export const englishStarterExercises: readonly LearningExercise[] = [
	{
		id: 'en-hello-image',
		type: 'imageChoice',
		prompt: 'What do you say here?',
		potentialXp: 6,
		openMojiHexcode: '1F44B',
		imageOpenMojiHexcode: '1F44B',
		imageAlt: 'Waving hand',
		options: [
			{
				id: 'hello',
				label: 'Hello'
			},
			{
				id: 'thanks',
				label: 'Thank you'
			},
			{
				id: 'no',
				label: 'No'
			}
		],
		correctOptionId: 'hello'
	},
	{
		id: 'en-basic-match',
		type: 'matching',
		prompt: 'Match the words.',
		potentialXp: 10,
		openMojiHexcode: '1F4AC',
		pairs: [
			{
				id: 'hello',
				left: {
					id: 'hello',
					label: 'Hello'
				},
				right: {
					id: 'bonjour',
					label: 'Bonjour'
				}
			},
			{
				id: 'thanks',
				left: {
					id: 'thanks',
					label: 'Thank you'
				},
				right: {
					id: 'merci',
					label: 'Merci'
				}
			},
			{
				id: 'goodbye',
				left: {
					id: 'goodbye',
					label: 'Goodbye'
				},
				right: {
					id: 'au-revoir',
					label: 'Au revoir'
				}
			}
		]
	},
	{
		id: 'en-thanks-image',
		type: 'imageChoice',
		prompt: 'Choose the word.',
		potentialXp: 6,
		openMojiHexcode: '1F64F',
		imageOpenMojiHexcode: '1F64F',
		imageAlt: 'Thank-you gesture',
		options: [
			{
				id: 'hi',
				label: 'Hi'
			},
			{
				id: 'thanks',
				label: 'Thank you'
			},
			{
				id: 'bye',
				label: 'Goodbye'
			}
		],
		correctOptionId: 'thanks'
	},
	{
		id: 'en-yes-no-image-match',
		type: 'matching',
		prompt: 'Match word and picture.',
		potentialXp: 10,
		openMojiHexcode: '2705',
		pairs: [
			{
				id: 'yes',
				left: {
					id: 'yes',
					label: 'Yes'
				},
				right: {
					id: 'yes-icon',
					label: 'Yes',
					openMojiHexcode: '2705'
				}
			},
			{
				id: 'no',
				left: {
					id: 'no',
					label: 'No'
				},
				right: {
					id: 'no-icon',
					label: 'No',
					openMojiHexcode: '274C'
				}
			},
			{
				id: 'hi',
				left: {
					id: 'hi',
					label: 'Hi'
				},
				right: {
					id: 'wave-icon',
					label: 'Hi',
					openMojiHexcode: '1F44B'
				}
			}
		]
	},
	{
		id: 'en-name-order',
		type: 'wordOrder',
		prompt: 'Put the words in order.',
		potentialXp: 8,
		openMojiHexcode: '1F464',
		tokens: [
			{
				id: 'my',
				label: 'My'
			},
			{
				id: 'name',
				label: 'name'
			},
			{
				id: 'is',
				label: 'is'
			},
			{
				id: 'mia',
				label: 'Mia'
			}
		],
		correctTokenIds: ['my', 'name', 'is', 'mia']
	},
	{
		id: 'en-how-are-you-choice',
		type: 'multipleChoice',
		prompt: 'How are you?',
		potentialXp: 6,
		openMojiHexcode: '1F642',
		options: [
			{
				id: 'fine',
				label: 'I am fine.'
			},
			{
				id: 'bye',
				label: 'Goodbye.'
			},
			{
				id: 'name',
				label: 'My name is.'
			}
		],
		correctOptionId: 'fine'
	},
	{
		id: 'en-goodbye-order',
		type: 'wordOrder',
		prompt: 'Put the words in order.',
		potentialXp: 8,
		openMojiHexcode: '1F44B',
		tokens: [
			{
				id: 'goodbye',
				label: 'Goodbye'
			},
			{
				id: 'mia',
				label: 'Mia'
			}
		],
		correctTokenIds: ['goodbye', 'mia']
	},
	{
		id: 'en-mini-phrase',
		type: 'readingComprehension',
		prompt: 'Read.',
		potentialXp: 10,
		openMojiHexcode: '1F4D6',
		passage: 'Hello! My name is Mia. Thank you. Goodbye!',
		questions: [
			{
				id: 'name',
				prompt: 'What is her name?',
				options: [
					{
						id: 'mia',
						label: 'Mia'
					},
					{
						id: 'hello',
						label: 'Hello'
					}
				],
				correctOptionId: 'mia'
			},
			{
				id: 'thanks',
				prompt: 'Which words say merci?',
				options: [
					{
						id: 'thank-you',
						label: 'Thank you'
					},
					{
						id: 'no',
						label: 'No'
					}
				],
				correctOptionId: 'thank-you'
			}
		]
	}
];

export const englishStarterExerciseAnswers: readonly ExerciseAnswer[] = [
	{
		exerciseId: 'en-hello-image',
		type: 'imageChoice',
		optionId: 'hello'
	},
	{
		exerciseId: 'en-basic-match',
		type: 'matching',
		matches: [
			{
				leftId: 'hello',
				rightId: 'bonjour'
			},
			{
				leftId: 'thanks',
				rightId: 'merci'
			},
			{
				leftId: 'goodbye',
				rightId: 'au-revoir'
			}
		]
	},
	{
		exerciseId: 'en-thanks-image',
		type: 'imageChoice',
		optionId: 'thanks'
	},
	{
		exerciseId: 'en-yes-no-image-match',
		type: 'matching',
		matches: [
			{
				leftId: 'yes',
				rightId: 'yes-icon'
			},
			{
				leftId: 'no',
				rightId: 'no-icon'
			},
			{
				leftId: 'hi',
				rightId: 'wave-icon'
			}
		]
	},
	{
		exerciseId: 'en-name-order',
		type: 'wordOrder',
		tokenIds: ['my', 'name', 'is', 'mia']
	},
	{
		exerciseId: 'en-how-are-you-choice',
		type: 'multipleChoice',
		optionId: 'fine'
	},
	{
		exerciseId: 'en-goodbye-order',
		type: 'wordOrder',
		tokenIds: ['goodbye', 'mia']
	},
	{
		exerciseId: 'en-mini-phrase',
		type: 'readingComprehension',
		answers: [
			{
				questionId: 'name',
				optionId: 'mia'
			},
			{
				questionId: 'thanks',
				optionId: 'thank-you'
			}
		]
	}
];
