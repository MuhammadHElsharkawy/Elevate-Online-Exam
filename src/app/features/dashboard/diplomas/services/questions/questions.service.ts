import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { IQuestions } from '../../modules/questions/questions.interface';
import { QuestionsEndPoints } from '../endpoints/QuestionsEndPoints';
import { BQuestions } from '../../modules/back-modules/b-questions.interface';
import { QuestionsAdapt } from '../adaptors/questions-adaptors.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _questionsAdapt = inject(QuestionsAdapt);

  GetAllQuestionsForExams(examId: string): Observable<IQuestions[]> {
    return this._httpClient.get<BQuestions>(QuestionsEndPoints.GetAllQuestionsForExams(examId))
      .pipe(map((res: BQuestions) => this._questionsAdapt.getAllQuestionsForExam(res), catchError(err => of(err))))
  }
}
