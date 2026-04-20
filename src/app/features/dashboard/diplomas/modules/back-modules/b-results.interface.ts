export interface BResult {
    status: boolean;
    code: number;
    payload: Payload;
}

export interface Payload {
    submission: Submission;
    analytics: Analytics[];
}

export interface Analytics {
    questionId: string;
    questionText: string;
    selectedAnswer: Answer;
    isCorrect: boolean;
    correctAnswer: Answer;
}

export interface Answer {
    id: string;
    text: string;
}

export interface Submission {
    id: string;
    examId: string;
    examTitle: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    submittedAt: Date;
}
