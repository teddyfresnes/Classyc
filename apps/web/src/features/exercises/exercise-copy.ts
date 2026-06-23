import type { ExerciseFeedbackState, ExerciseType, SupportedLanguageCode } from '@classyc/shared';

export interface ExerciseDeckCopy {
	backToMap: string;
	continue: string;
	finish: string;
	lessonComplete: string;
	levelProgress: string;
	noXpAwarded: string;
	progressLabel: string;
	retryCount: (count: number) => string;
	scoreLabel: (score: number, maxScore: number) => string;
	typeInstructions: Record<ExerciseType, string>;
	validate: string;
	xpAwarded: (xp: number) => string;
	feedback: Record<ExerciseFeedbackState, string>;
	trueFalse: {
		false: string;
		true: string;
	};
	reading: {
		nameQuestion: string;
		thanksQuestion: string;
		helloQuestion: string;
	};
	translation: {
		choiceTitle: string;
		matchTitle: string;
		wordLabel: string;
	};
	imageMatchTitle: string;
	wordOrderAnswer: string;
	wordOrderPlaceholder: string;
}

export const exerciseCopies: Record<SupportedLanguageCode, ExerciseDeckCopy> = {
	fr: {
		backToMap: 'Carte',
		continue: 'Continuer',
		feedback: {
			correct: 'Bien joué. Continue.',
			incorrect: 'Pas grave, on le remet à la fin.',
			partial: 'Presque. On le reverra à la fin.'
		},
		finish: 'Terminer',
		lessonComplete: 'Leçon terminée',
		levelProgress: 'Palier',
		noXpAwarded: 'Déjà récompensé',
		progressLabel: 'Progression de la leçon',
		reading: {
			helloQuestion: 'Quel mot salue ?',
			nameQuestion: 'Comment elle s’appelle ?',
			thanksQuestion: 'Quel mot veut dire merci ?'
		},
		translation: {
			choiceTitle: 'Quel mot veut dire',
			matchTitle: 'Relie les traductions.',
			wordLabel: 'Mot a traduire'
		},
		imageMatchTitle: "Associe chaque mot a l'image.",
		retryCount: (count) => `${count} à revoir`,
		scoreLabel: (score, maxScore) => `${score}/${maxScore}`,
		trueFalse: {
			false: 'Faux',
			true: 'Vrai'
		},
		typeInstructions: {
			fillBlank: 'Complète la phrase.',
			imageChoice: 'Choisis la bonne réponse.',
			matching: 'Relie les paires.',
			multipleChoice: 'Choisis la bonne réponse.',
			readingComprehension: 'Lis puis réponds.',
			trueFalse: 'Vrai ou faux ?',
			wordOrder: 'Remets les mots dans l’ordre.'
		},
		validate: 'Valider',
		wordOrderAnswer: 'Réponse',
		wordOrderPlaceholder: 'Construis la phrase',
		xpAwarded: (xp) => `+${xp} XP`
	},
	en: {
		backToMap: 'Map',
		continue: 'Continue',
		feedback: {
			correct: 'Nice. Keep going.',
			incorrect: 'No worries, it goes to the end.',
			partial: 'Almost. You will see it again.'
		},
		finish: 'Finish',
		lessonComplete: 'Lesson complete',
		levelProgress: 'Step',
		noXpAwarded: 'Already rewarded',
		progressLabel: 'Lesson progress',
		reading: {
			helloQuestion: 'Which word says hello?',
			nameQuestion: 'What is her name?',
			thanksQuestion: 'Which word means thank you?'
		},
		translation: {
			choiceTitle: 'Which word means',
			matchTitle: 'Match the translations.',
			wordLabel: 'Word to translate'
		},
		imageMatchTitle: 'Match each word to an image.',
		retryCount: (count) => `${count} to review`,
		scoreLabel: (score, maxScore) => `${score}/${maxScore}`,
		trueFalse: {
			false: 'False',
			true: 'True'
		},
		typeInstructions: {
			fillBlank: 'Complete the sentence.',
			imageChoice: 'Choose the right answer.',
			matching: 'Match the pairs.',
			multipleChoice: 'Choose the right answer.',
			readingComprehension: 'Read, then answer.',
			trueFalse: 'True or false?',
			wordOrder: 'Put the words in order.'
		},
		validate: 'Check',
		wordOrderAnswer: 'Answer',
		wordOrderPlaceholder: 'Build the sentence',
		xpAwarded: (xp) => `+${xp} XP`
	},
	zh: {
		backToMap: '地图',
		continue: '继续',
		feedback: {
			correct: '很好，继续。',
			incorrect: '没关系，放到最后再练。',
			partial: '快对了，稍后再练。'
		},
		finish: '完成',
		lessonComplete: '课程完成',
		levelProgress: '进度',
		noXpAwarded: '已奖励',
		progressLabel: '课程进度',
		reading: {
			helloQuestion: '哪个词表示问候？',
			nameQuestion: '她叫什么名字？',
			thanksQuestion: '哪个词表示谢谢？'
		},
		translation: {
			choiceTitle: '\u54ea\u4e2a\u8bcd\u8868\u793a',
			matchTitle: '\u8fde\u63a5\u7ffb\u8bd1\u3002',
			wordLabel: '\u8981\u7ffb\u8bd1\u7684\u8bcd'
		},
		imageMatchTitle: '\u628a\u8bcd\u548c\u56fe\u7247\u8fde\u8d77\u6765\u3002',
		retryCount: (count) => `${count} 个待复习`,
		scoreLabel: (score, maxScore) => `${score}/${maxScore}`,
		trueFalse: {
			false: '错',
			true: '对'
		},
		typeInstructions: {
			fillBlank: '补全句子。',
			imageChoice: '选择正确答案。',
			matching: '连接配对。',
			multipleChoice: '选择正确答案。',
			readingComprehension: '阅读后回答。',
			trueFalse: '对还是错？',
			wordOrder: '把词语排好顺序。'
		},
		validate: '检查',
		wordOrderAnswer: '答案',
		wordOrderPlaceholder: '组成句子',
		xpAwarded: (xp) => `+${xp} XP`
	}
};

export function getExerciseCopy(language: SupportedLanguageCode | null | undefined) {
	return exerciseCopies[language ?? 'fr'];
}
