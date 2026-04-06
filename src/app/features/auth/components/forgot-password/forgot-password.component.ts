import { Component, inject, input, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { InputFieldComponent } from "../../../../shared/components/input-field/input-field.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DButtonComponent } from "../../../../shared/components/d-button/d-button.component";
import { DFormMsgComponent } from "../../../../shared/components/d-form-msg/d-form-msg.component";
import { AuthService } from 'auth-lib';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, InputFieldComponent, DButtonComponent, DFormMsgComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  private readonly _fb = inject(FormBuilder)
  private readonly _authService = inject(AuthService)
  private readonly _router = inject(Router)
  private readonly _platformId = inject(PLATFORM_ID)

  step: WritableSignal<'email' | 'verify' | 'password'> = signal('email');

  forgotForm: FormGroup = this._fb.group({
    email: [null, [Validators.required, Validators.email]]
  })

  backToEmail(): void {
    this.step.set('email')
  }

  isLooding: WritableSignal<boolean> = signal(false);

  RequestPasswordReset(): void {
    if (this.forgotForm.get('email')?.valid) {
      this.isLooding.set(true);
      // const data = {
      //   email: this.forgotForm.get('email')?.value
      // }
      this._authService.RequestPasswordReset(this.forgotForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (isPlatformBrowser(this._platformId)) {
            localStorage.setItem('userEmail', this.forgotForm.get('email')?.value)
          }
          this.step.set('verify');
          this.isLooding.set(false);
        },
        error: (err) => {
          console.log(err);
          this.isLooding.set(false);
        }
      })
      // console.log(this.forgotForm.get('email')?.value);
    }
  }

  // ResetPassword(): void {
  //   if (this.forgotForm.valid) {
  //     this.isLooding.set(true);
  //     this._authService.ResetPassword(this.forgotForm.value).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this._router.navigate(['/login'])
  //         this.isLooding.set(false);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         this.isLooding.set(false);
  //       }
  //     })
  //   }
  // }
}
