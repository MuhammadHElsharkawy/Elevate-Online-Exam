import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { DiplomasEndPoints } from '../endpoints/DiplomasEndPoints';
import { IDiploma } from '../../modules/diplomas/diplomas.interface';
import { BDiploma, BDiplomas } from '../../modules/back-modules/b-diplomas.interface';
import { DiplomasAdapt } from '../adaptors/diplomas-adaptors.service';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _diplomasAdapt = inject(DiplomasAdapt);

  getAllDiplomas(): Observable<IDiploma[]> {
    return this._httpClient.get<BDiplomas>(DiplomasEndPoints.GetAllDiplomas)
      .pipe(map((res: BDiplomas) => this._diplomasAdapt.getAllDiplomasAdaptor(res)), catchError(err => of(err)));
  }
  getDiplomaById(diplomaId: string): Observable<IDiploma> {
    return this._httpClient.get<BDiploma>(DiplomasEndPoints.GetUpdateDeleteDiplomaById(diplomaId))
    .pipe(map((res: BDiploma) => this._diplomasAdapt.getDiplomaByIdAdaptor(res)), catchError(err => of(err)));
  }
}
