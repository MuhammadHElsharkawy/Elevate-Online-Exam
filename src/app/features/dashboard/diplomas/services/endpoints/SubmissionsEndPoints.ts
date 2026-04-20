import { environment } from "../../../../../../environment/environment.development";

export class SubmissionsEndPoints {
    static readonly SubmitExamAnswers = `${environment.baseUrl}/api/submissions`;
    static readonly GetUserExamSubmissions = `${environment.baseUrl}/api/submissions`;
    static readonly GetSubmissionDetailsWithAnalytics = `${environment.baseUrl}/api/submissions/{id}`;
}
