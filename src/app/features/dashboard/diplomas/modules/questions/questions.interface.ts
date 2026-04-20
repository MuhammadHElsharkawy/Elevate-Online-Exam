export interface IQuestions {
    id: string;
    question: string;
    examId: string;
    immutable: boolean;
    answers: Answer[];
}

export interface Answer {
    id:   string;
    text: string;
}
