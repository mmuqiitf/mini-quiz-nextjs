export interface Answer {
	id: number;
	answer: string;
	isCorrect: boolean;
	questionId: number;
}

export interface Question {
	id: number;
	question: string;
	order: number;
	quizId: number;
	answers: Answer[];
}

export interface Quiz {
	id: number;
	title: string;
	description: string;
	questions: Question[];
}
