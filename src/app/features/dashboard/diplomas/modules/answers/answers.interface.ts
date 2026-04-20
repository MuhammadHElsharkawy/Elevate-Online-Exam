export interface AnswersREQ {
    examId: string,
    answers: Answer[];
}

interface Answer {
    questionId: string;
    answerId: string;
}
