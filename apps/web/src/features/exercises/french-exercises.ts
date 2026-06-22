import type { ExerciseAnswer, LearningExercise } from '@classyc/shared';

export const frenchStarterExercises: readonly LearningExercise[] = [
	{
		id: 'fr-hello-image',
		type: 'imageChoice',
		prompt: 'Que dit-on ici ?',
		potentialXp: 6,
		openMojiHexcode: '1F44B',
		imageOpenMojiHexcode: '1F44B',
		imageAlt: 'Main qui salue',
		options: [
			{
				id: 'bonjour',
				label: 'Bonjour'
			},
			{
				id: 'merci',
				label: 'Merci'
			},
			{
				id: 'non',
				label: 'Non'
			}
		],
		correctOptionId: 'bonjour'
	},
	{
		id: 'fr-basic-match',
		type: 'matching',
		prompt: 'Relie chaque mot.',
		potentialXp: 10,
		openMojiHexcode: '1F4AC',
		pairs: [
			{
				id: 'bonjour',
				left: {
					id: 'bonjour',
					label: 'Bonjour'
				},
				right: {
					id: 'hello',
					label: 'Hello'
				}
			},
			{
				id: 'merci',
				left: {
					id: 'merci',
					label: 'Merci'
				},
				right: {
					id: 'thanks',
					label: 'Thank you'
				}
			},
			{
				id: 'au-revoir',
				left: {
					id: 'au-revoir',
					label: 'Au revoir'
				},
				right: {
					id: 'goodbye',
					label: 'Goodbye'
				}
			}
		]
	},
	{
		id: 'fr-thanks-image',
		type: 'imageChoice',
		prompt: 'Choisis le mot.',
		potentialXp: 6,
		openMojiHexcode: '1F64F',
		imageOpenMojiHexcode: '1F64F',
		imageAlt: 'Geste de remerciement',
		options: [
			{
				id: 'salut',
				label: 'Salut'
			},
			{
				id: 'merci',
				label: 'Merci'
			},
			{
				id: 'au-revoir',
				label: 'Au revoir'
			}
		],
		correctOptionId: 'merci'
	},
	{
		id: 'fr-yes-no-image-match',
		type: 'matching',
		prompt: 'Associe le mot et l’image.',
		potentialXp: 10,
		openMojiHexcode: '2705',
		pairs: [
			{
				id: 'oui',
				left: {
					id: 'oui',
					label: 'Oui'
				},
				right: {
					id: 'yes-icon',
					label: 'Oui',
					openMojiHexcode: '2705'
				}
			},
			{
				id: 'non',
				left: {
					id: 'non',
					label: 'Non'
				},
				right: {
					id: 'no-icon',
					label: 'Non',
					openMojiHexcode: '274C'
				}
			},
			{
				id: 'salut',
				left: {
					id: 'salut',
					label: 'Salut'
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
		id: 'fr-name-order',
		type: 'wordOrder',
		prompt: 'Remets les mots.',
		potentialXp: 8,
		openMojiHexcode: '1F464',
		tokens: [
			{
				id: 'je',
				label: 'Je'
			},
			{
				id: 'mappelle',
				label: 'm’appelle'
			},
			{
				id: 'lina',
				label: 'Lina'
			}
		],
		correctTokenIds: ['je', 'mappelle', 'lina']
	},
	{
		id: 'fr-ca-va-choice',
		type: 'multipleChoice',
		prompt: 'Ça va ?',
		potentialXp: 6,
		openMojiHexcode: '1F642',
		options: [
			{
				id: 'yes',
				label: 'Oui, ça va.'
			},
			{
				id: 'bye',
				label: 'Au revoir.'
			},
			{
				id: 'name',
				label: 'Je m’appelle.'
			}
		],
		correctOptionId: 'yes'
	},
	{
		id: 'fr-goodbye-order',
		type: 'wordOrder',
		prompt: 'Remets les mots.',
		potentialXp: 8,
		openMojiHexcode: '1F44B',
		tokens: [
			{
				id: 'au',
				label: 'Au'
			},
			{
				id: 'revoir',
				label: 'revoir'
			},
			{
				id: 'lina',
				label: 'Lina'
			}
		],
		correctTokenIds: ['au', 'revoir', 'lina']
	},
	{
		id: 'fr-mini-phrase',
		type: 'readingComprehension',
		prompt: 'Lis.',
		potentialXp: 10,
		openMojiHexcode: '1F4D6',
		passage: 'Bonjour ! Je m’appelle Lina. Ça va ?',
		questions: [
			{
				id: 'name',
				prompt: 'Comment elle s’appelle ?',
				options: [
					{
						id: 'lina',
						label: 'Lina'
					},
					{
						id: 'merci',
						label: 'Merci'
					}
				],
				correctOptionId: 'lina'
			},
			{
				id: 'hello',
				prompt: 'Quel mot salue ?',
				options: [
					{
						id: 'bonjour',
						label: 'Bonjour'
					},
					{
						id: 'non',
						label: 'Non'
					}
				],
				correctOptionId: 'bonjour'
			}
		]
	}
];

export const frenchStarterExerciseAnswers: readonly ExerciseAnswer[] = [
	{
		exerciseId: 'fr-hello-image',
		type: 'imageChoice',
		optionId: 'bonjour'
	},
	{
		exerciseId: 'fr-basic-match',
		type: 'matching',
		matches: [
			{
				leftId: 'bonjour',
				rightId: 'hello'
			},
			{
				leftId: 'merci',
				rightId: 'thanks'
			},
			{
				leftId: 'au-revoir',
				rightId: 'goodbye'
			}
		]
	},
	{
		exerciseId: 'fr-thanks-image',
		type: 'imageChoice',
		optionId: 'merci'
	},
	{
		exerciseId: 'fr-yes-no-image-match',
		type: 'matching',
		matches: [
			{
				leftId: 'oui',
				rightId: 'yes-icon'
			},
			{
				leftId: 'non',
				rightId: 'no-icon'
			},
			{
				leftId: 'salut',
				rightId: 'wave-icon'
			}
		]
	},
	{
		exerciseId: 'fr-name-order',
		type: 'wordOrder',
		tokenIds: ['je', 'mappelle', 'lina']
	},
	{
		exerciseId: 'fr-ca-va-choice',
		type: 'multipleChoice',
		optionId: 'yes'
	},
	{
		exerciseId: 'fr-goodbye-order',
		type: 'wordOrder',
		tokenIds: ['au', 'revoir', 'lina']
	},
	{
		exerciseId: 'fr-mini-phrase',
		type: 'readingComprehension',
		answers: [
			{
				questionId: 'name',
				optionId: 'lina'
			},
			{
				questionId: 'hello',
				optionId: 'bonjour'
			}
		]
	}
];
