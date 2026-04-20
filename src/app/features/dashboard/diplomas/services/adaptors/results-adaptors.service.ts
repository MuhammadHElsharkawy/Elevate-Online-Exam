import { Injectable } from '@angular/core';
import { BResult } from '../../modules/back-modules/b-results.interface';
import { IResults } from '../../modules/results/results.interface';

@Injectable({
  providedIn: 'root',
})
export class ResultsAdapt {
  SubmitExam(data: BResult): IResults {
    return {
      examId: data.payload.submission.id,
      examTitle: data.payload.submission.examTitle,
      score: data.payload.submission.score,
      totalQuestions: data.payload.submission.totalQuestions,
      correctAnswers: data.payload.submission.correctAnswers,
      wrongAnswers: data.payload.submission.wrongAnswers,
      submittedAt: data.payload.submission.submittedAt,
      analytics: data.payload.analytics
    }
  }
}
