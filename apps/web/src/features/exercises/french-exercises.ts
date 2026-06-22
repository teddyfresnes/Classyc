import type { ExerciseAnswer, LearningExercise } from '@classyc/shared';

export const frenchStarterExercises: readonly LearningExercise[] = [
	{
		id: 'fr-et-est-choice',
		type: 'multipleChoice',
		prompt: 'Choisis la phrase correcte.',
		instruction: '`est` vient du verbe être. `et` relie deux éléments.',
		potentialXp: 8,
		openMojiHexcode: '2705',
		options: [
			{
				id: 'et',
				label: 'Il et content.'
			},
			{
				id: 'est',
				label: 'Il est content.'
			},
			{
				id: 'es',
				label: 'Il es content.'
			}
		],
		correctOptionId: 'est'
	},
	{
		id: 'fr-connaitre-fill',
		type: 'fillBlank',
		prompt: 'Je ___ cette ville.',
		instruction: 'On utilise `connaître` pour une personne, un lieu ou une chose connue.',
		potentialXp: 10,
		openMojiHexcode: '1F4DD',
		placeholder: 'connais',
		acceptedAnswers: ['connais']
	},
	{
		id: 'fr-savoir-true-false',
		type: 'trueFalse',
		prompt: 'Observe la phrase.',
		statement: '`Je sais nager` est correct pour parler d une capacité.',
		potentialXp: 6,
		openMojiHexcode: '1F3AF',
		correctAnswer: true
	},
	{
		id: 'fr-etre-conjugation',
		type: 'fillBlank',
		prompt: 'Nous ___ prêts.',
		instruction: 'Complète avec le verbe être au présent.',
		potentialXp: 10,
		openMojiHexcode: '270D',
		placeholder: 'sommes',
		acceptedAnswers: ['sommes']
	},
	{
		id: 'fr-reading-oui-non',
		type: 'readingComprehension',
		prompt: 'Lis le texte puis reponds.',
		instruction: 'Choisis oui ou non.',
		potentialXp: 12,
		openMojiHexcode: '1F4D6',
		passageTitle: 'Le sac de Lina',
		passage: 'Le matin, Lina prépare son sac. Elle prend un livre et sort à huit heures.',
		questions: [
			{
				id: 'book',
				prompt: 'Lina prend-elle un livre ?',
				options: [
					{
						id: 'yes',
						label: 'Oui'
					},
					{
						id: 'no',
						label: 'Non'
					}
				],
				correctOptionId: 'yes'
			},
			{
				id: 'noon',
				prompt: 'Lina sort-elle à midi ?',
				options: [
					{
						id: 'yes',
						label: 'Oui'
					},
					{
						id: 'no',
						label: 'Non'
					}
				],
				correctOptionId: 'no'
			}
		]
	}
];

export const frenchStarterExerciseAnswers: readonly ExerciseAnswer[] = [
	{
		exerciseId: 'fr-et-est-choice',
		type: 'multipleChoice',
		optionId: 'est'
	},
	{
		exerciseId: 'fr-connaitre-fill',
		type: 'fillBlank',
		value: 'connais'
	},
	{
		exerciseId: 'fr-savoir-true-false',
		type: 'trueFalse',
		value: true
	},
	{
		exerciseId: 'fr-etre-conjugation',
		type: 'fillBlank',
		value: 'sommes'
	},
	{
		exerciseId: 'fr-reading-oui-non',
		type: 'readingComprehension',
		answers: [
			{
				questionId: 'book',
				optionId: 'yes'
			},
			{
				questionId: 'noon',
				optionId: 'no'
			}
		]
	}
];
