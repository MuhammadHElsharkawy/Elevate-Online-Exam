import { environment } from "../../../../../../environment/environment.development";

export class QuestionsEndPoints {
    static readonly GetAllQuestionsForExams = (examId: string) => `${environment.baseUrl}/api/questions/exam/${examId}`;
    static readonly AddMultipleQuestionsToExam = `${environment.baseUrl}/api/questions/exam/{examId}/bulk`;
    static readonly GetQuestionById = `${environment.baseUrl}/api/questions/{id}`;
    static readonly UpdateQuestion = `${environment.baseUrl}/api/questions/{id}`;
    static readonly DeleteQuestion = `${environment.baseUrl}/api/questions/{id}`;
    static readonly CreateQuestion = `${environment.baseUrl}/api/questions`;
}