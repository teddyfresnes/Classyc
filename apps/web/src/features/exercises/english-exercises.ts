import type { ExerciseAnswer, LearningExercise } from '@classyc/shared';

export const englishStarterExercises: readonly LearningExercise[] = [
	{
		id: 'en-house-vocab',
		type: 'multipleChoice',
		prompt: 'Choose the English word for maison.',
		instruction: 'Pick the common word.',
		potentialXp: 8,
		openMojiHexcode: '1F3E0',
		options: [
			{
				id: 'house',
				label: 'House'
			},
			{
				id: 'water',
				label: 'Water'
			},
			{
				id: 'book',
				label: 'Book'
			}
		],
		correctOptionId: 'house'
	},
	{
		id: 'en-has-fill',
		type: 'fillBlank',
		prompt: 'She ___ a blue bag.',
		instruction: 'Complete the sentence with the correct verb.',
		potentialXp: 10,
		openMojiHexcode: '270D',
		placeholder: 'has',
		acceptedAnswers: ['has']
	},
	{
		id: 'en-to-be-true-false',
		type: 'trueFalse',
		prompt: 'Read the sentence.',
		statement: '`I am ready` is correct.',
		potentialXp: 6,
		openMojiHexcode: '2705',
		correctAnswer: true
	},
	{
		id: 'en-are-conjugation',
		type: 'fillBlank',
		prompt: 'They ___ at school.',
		instruction: 'Use the verb `to be` in the present.',
		potentialXp: 10,
		openMojiHexcode: '1F4DD',
		placeholder: 'are',
		acceptedAnswers: ['are']
	},
	{
		id: 'en-reading-short',
		type: 'readingComprehension',
		prompt: 'Read the short text.',
		instruction: 'Answer the questions.',
		potentialXp: 12,
		openMojiHexcode: '1F4D6',
		passageTitle: 'Mia and the book',
		passage: 'Mia has a small book. She reads it in the park.',
		questions: [
			{
				id: 'object',
				prompt: 'What does Mia have?',
				options: [
					{
						id: 'book',
						label: 'A book'
					},
					{
						id: 'bike',
						label: 'A bike'
					}
				],
				correctOptionId: 'book'
			},
			{
				id: 'place',
				prompt: 'Where does Mia read?',
				options: [
					{
						id: 'park',
						label: 'In the park'
					},
					{
						id: 'shop',
						label: 'In a shop'
					}
				],
				correctOptionId: 'park'
			}
		]
	}
];

export const englishStarterExerciseAnswers: readonly ExerciseAnswer[] = [
	{
		exerciseId: 'en-house-vocab',
		type: 'multipleChoice',
		optionId: 'house'
	},
	{
		exerciseId: 'en-has-fill',
		type: 'fillBlank',
		value: 'has'
	},
	{
		exerciseId: 'en-to-be-true-false',
		type: 'trueFalse',
		value: true
	},
	{
		exerciseId: 'en-are-conjugation',
		type: 'fillBlank',
		value: 'are'
	},
	{
		exerciseId: 'en-reading-short',
		type: 'readingComprehension',
		answers: [
			{
				questionId: 'object',
				optionId: 'book'
			},
			{
				questionId: 'place',
				optionId: 'park'
			}
		]
	}
];
