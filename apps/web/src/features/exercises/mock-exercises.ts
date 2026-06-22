import type { ExerciseAnswer, LearningExercise } from '@classyc/shared';

export const mockExercises: readonly LearningExercise[] = [
	{
		id: 'mock-multiple-choice',
		type: 'multipleChoice',
		prompt: 'Choisis la reponse exemple.',
		instruction: 'Selectionne une option.',
		potentialXp: 8,
		openMojiHexcode: '1F3AF',
		options: [
			{
				id: 'short',
				label: 'Option courte'
			},
			{
				id: 'long',
				label: 'Option longue'
			},
			{
				id: 'other',
				label: 'Autre option'
			}
		],
		correctOptionId: 'short'
	},
	{
		id: 'mock-fill-blank',
		type: 'fillBlank',
		prompt: 'Complete le mot de test.',
		instruction: 'Cette entree sert seulement a verifier le moteur.',
		potentialXp: 10,
		openMojiHexcode: '270D',
		placeholder: 'Classyc',
		acceptedAnswers: ['Classyc']
	},
	{
		id: 'mock-true-false',
		type: 'trueFalse',
		prompt: 'Indique si la phrase exemple est vraie.',
		statement: 'Cette carte sert a tester un rendu vrai/faux.',
		potentialXp: 6,
		openMojiHexcode: '2705',
		correctAnswer: true
	},
	{
		id: 'mock-reading',
		type: 'readingComprehension',
		prompt: 'Lis le court texte exemple.',
		instruction: 'Reponds aux questions mockees.',
		potentialXp: 12,
		openMojiHexcode: '1F4D6',
		passageTitle: 'Texte de validation',
		passage: "Ce court texte sert a verifier l'interface de lecture sans fournir de contenu pedagogique final.",
		questions: [
			{
				id: 'purpose',
				prompt: 'Que valide ce texte ?',
				options: [
					{
						id: 'interface',
						label: "L'interface"
					},
					{
						id: 'league',
						label: 'Le classement'
					}
				],
				correctOptionId: 'interface'
			},
			{
				id: 'content',
				prompt: 'Ce contenu est-il final ?',
				options: [
					{
						id: 'no',
						label: 'Non'
					},
					{
						id: 'yes',
						label: 'Oui'
					}
				],
				correctOptionId: 'no'
			}
		]
	}
];

export const mockExerciseAnswers: readonly ExerciseAnswer[] = [
	{
		exerciseId: 'mock-multiple-choice',
		type: 'multipleChoice',
		optionId: 'short'
	},
	{
		exerciseId: 'mock-fill-blank',
		type: 'fillBlank',
		value: 'classyc'
	},
	{
		exerciseId: 'mock-true-false',
		type: 'trueFalse',
		value: true
	},
	{
		exerciseId: 'mock-reading',
		type: 'readingComprehension',
		answers: [
			{
				questionId: 'purpose',
				optionId: 'interface'
			},
			{
				questionId: 'content',
				optionId: 'no'
			}
		]
	}
];
