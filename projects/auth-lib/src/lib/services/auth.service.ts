import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthEndPoints } from '../enums/AuthEndPoints';
import { AuthAdapt } from './adaptor/auth-adapt.service';
import { ConfirmOtpREQ, ConfirmOtpRES, RegisterREQ, RegisterRES, SendOtpToEmailREQ, SendOtpToEmailRES } from '../interfaces/register';
import { AuthAPI } from '../base/AuthAPI';
import { BRegisterStep1_2, BRegisterStep3 } from '../interfaces/back-interfaces/b-register';
import { LoginREQ, LoginRES } from '../interfaces/login';
import { BLogin } from '../interfaces/back-interfaces/b-login';
import { RequestPasswordResetREQ, ForgotPasswordRES, ResetPasswordREQ } from '../interfaces/forgotpass';
import { BForgotpass } from '../interfaces/back-interfaces/b-forgotpass';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthAPI {
  private readonly _httpClient = inject(HttpClient)
  private readonly _authAdapt = inject(AuthAdapt)

  SendOtpToEmail(data: SendOtpToEmailREQ): Observable<SendOtpToEmailRES | string> {
    return this._httpClient.post<BRegisterStep1_2>(AuthEndPoints.SendOtpToEmail, data)
      .pipe(map((res: BRegisterStep1_2) => this._authAdapt.OtpStepsAdapt(res)), catchError(err => of(err)));
  }
  ConfirmOtp(data: ConfirmOtpREQ): Observable<ConfirmOtpRES | string> {
    return this._httpClient.post<BRegisterStep1_2>(AuthEndPoints.ConfirmOtp, data)
      .pipe(map((res: BRegisterStep1_2) => this._authAdapt.OtpStepsAdapt(res)), catchError(err => of(err)));
  }
  Register(data: RegisterREQ): Observable<RegisterRES | string> {
    return this._httpClient.post<BRegisterStep3>(AuthEndPoints.Register, data)
      .pipe(map((res: BRegisterStep3) => this._authAdapt.RegisterAdapt(res)), catchError(err => of(err)));
  }

  Login(data: LoginREQ): Observable<LoginRES | string> {
    return this._httpClient.post<BLogin>(AuthEndPoints.Login, data)
      .pipe(map((res: BLogin) => this._authAdapt.LoginAdapt(res)), catchError(err => of(err)));
  }

  RequestPasswordReset(data: RequestPasswordResetREQ): Observable<ForgotPasswordRES | string> {
    return this._httpClient.post<BForgotpass>(AuthEndPoints.RequestPasswordReset, data)
      .pipe(map((res) => this._authAdapt.ForgotPassAdapt(res)), catchError(err => of(err)));
  }
  ResetPassword(data: ResetPasswordREQ): Observable<ForgotPasswordRES | string> {
    return this._httpClient.post<BForgotpass>(AuthEndPoints.ResetPassword, data)
      .pipe(map((res) => this._authAdapt.ForgotPassAdapt(res)), catchError(err => of(err)));
  }
}
