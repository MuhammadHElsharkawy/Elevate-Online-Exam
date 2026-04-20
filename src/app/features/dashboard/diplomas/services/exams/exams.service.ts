import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IExams } from '../../modules/exams/exams.interface';
import { ExamsEndPoints } from '../endpoints/ExamsEndPoints';
import { catchError, map, Observable, of } from 'rxjs';
import { BExam, BExams } from '../../modules/back-modules/b-exams.interface';
import { ExamsAdapt } from '../adaptors/exams-adaptors.service';

@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _examsAdapt = inject(ExamsAdapt);

  getAllExams(): Observable<IExams[]> {
    return this._httpClient.get<BExams>(ExamsEndPoints.GetAllExams)
      .pipe(map((res: BExams) => this._examsAdapt.getAllExamsAdaptor(res)), catchError(err => of(err)));
  }
  getExamsByDiploma(diplomaId: string): Observable<IExams[]> {
    return this._httpClient.get<BExams>(ExamsEndPoints.GetAllExams + `?diplomaId=${diplomaId}`)
      .pipe(map((res: BExams) => this._examsAdapt.getAllExamsAdaptor(res)), catchError(err => of(err)));
  }
  getExamById(examId: string): Observable<IExams> {
    return this._httpClient.get<BExam>(ExamsEndPoints.GetExamById(examId))
      .pipe(map((res: BExam) => this._examsAdapt.getExamByIdAdaptor(res)), catchError(err => of(err)));
  }
}
