export interface IResults {
    examId: string;
    examTitle: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    submittedAt: Date;
    analytics: Analytics[];
}

interface Analytics {
    questionId: string;
    questionText: string;
    selectedAnswer: Answer;
    isCorrect: boolean;
    correctAnswer: Answer;
}

interface Answer {
    id: string;
    text: string;
}