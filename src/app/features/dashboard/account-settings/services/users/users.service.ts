import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UsersEndPoints } from '../EndPoints/UsersEndPoints';
import { UserAdapt } from '../adaptors/user-adaptors.service';
import { bUser } from '../../modules/back-modules/buser.interface';
import { IUser } from '../../modules/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _userAdapt = inject(UserAdapt);

  getUserData(): Observable<IUser> {
    return this._httpClient.get<bUser>(UsersEndPoints.GetCurrentUser)
      .pipe(map((res: bUser) => this._userAdapt.GetUserDataAdaptor(res)), catchError(err => of(err)));
  }
  updateProfile(data: any): Observable<any> {
    return this._httpClient.patch(UsersEndPoints.UpdateProfile, data);
  }
  changePassword(data: any): Observable<any> {
    return this._httpClient.post(UsersEndPoints.ChangePassword, data);
  }
  deleteAccount(): Observable<any> {
    return this._httpClient.delete(UsersEndPoints.DeleteAccount);
  }
  requestCode(data: any): Observable<any> {
    return this._httpClient.post(UsersEndPoints.RequestCode, data);
  }
  confirmEmail(data: any): Observable<any> {
    return this._httpClient.post(UsersEndPoints.ConfirmEmail, data);
  }
}
