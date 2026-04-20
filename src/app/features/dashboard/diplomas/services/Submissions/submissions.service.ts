import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { SubmissionsEndPoints } from '../endpoints/SubmissionsEndPoints';
import { AnswersREQ } from '../../modules/answers/answers.interface';
import { BResult } from '../../modules/back-modules/b-results.interface';
import { IResults } from '../../modules/results/results.interface';
import { ResultsAdapt } from '../adaptors/results-adaptors.service';

@Injectable({
  providedIn: 'root',
})
export class SubmissionsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _resultsAdapt = inject(ResultsAdapt);

  SubmitExam(data: AnswersREQ): Observable<IResults> {
    return this._httpClient.post<BResult>(SubmissionsEndPoints.SubmitExamAnswers, data)
      .pipe(map((res) => this._resultsAdapt.SubmitExam(res)), catchError(err => of(err)));
  }
}
