import { environment } from "../../../../../../environment/environment.development";

export class ExamsEndPoints {
    static readonly GetAllExams = `${environment.baseUrl}/api/exams`;
    static readonly CreateNewExam = `${environment.baseUrl}/api/exams`;
    static readonly GetExamById = (examId: string) => `${environment.baseUrl}/api/exams/${examId}`;
    static readonly UpdateExam = (examId: string) => `${environment.baseUrl}/api/exams/${examId}`;
    static readonly DeleteExam = (examId: string) => `${environment.baseUrl}/api/exams/${examId}`;
}