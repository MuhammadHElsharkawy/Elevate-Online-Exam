import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { EmailComponent } from './components/email/email.component';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { VerifyEmailComponent } from "./components/verify-email/verify-email.component";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { PasswordComponent } from "./components/password/password.component";
import { Router } from '@angular/router';
import { AuthService } from 'auth-lib';
import { ErrorMsgComponent } from "../../../../shared/components/error-msg/error-msg.component";

@Component({
  selector: 'app-register',
  imports: [EmailComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, VerifyEmailComponent, UserInfoComponent, PasswordComponent, ErrorMsgComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly _fb = inject(FormBuilder)
  private readonly _router = inject(Router)
  private readonly _authService = inject(AuthService)

  step: WritableSignal<'email' | 'code' | 'info' | 'password'> = signal('email');

  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/
  rePasswordValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.get('password')?.value
    const rePassword: string = control.get('confirmPassword')?.value
    return (password == rePassword) ? null : { passwordMatch: true }
  }

  registerForm: FormGroup = this._fb.group({
    email: [null, [Validators.required, Validators.email]],
    code: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    username: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
    confirmPassword: [null, [Validators.required]],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    phone: [null, [Validators.required]],
  }, {
    validators: this.rePasswordValidation
  })

  isLooding: WritableSignal<boolean> = signal(false);

  errMsg: WritableSignal<string | null> = signal(null);
  sendEmail(): void {
    if (this.registerForm.get('email')?.valid) {
      this.isLooding.set(true);
      const data = {
        email: this.registerForm.get('email')?.value
      }

      this.errMsg.set(null);
      this._authService.SendOtpToEmail(data).subscribe({
        next: (res) => {
          console.log(res)
          this.step.set('code');
          this.isLooding.set(false);
        },
        error: (err) => {
          this.errMsg.set(err.error.message);          
          this.isLooding.set(false);
        }
      })
    }
  }
  sendCode(): void {
    if (this.registerForm.get('code')?.valid) {
      this.isLooding.set(true);
      const data = {
        email: this.registerForm.get('email')?.value,
        code: this.registerForm.get('code')?.value,
      }
      console.log(data);

      this._authService.ConfirmOtp(data).subscribe({
        next: (res) => {
          console.log(res);
          this.step.set('info')
          this.isLooding.set(false);
        },
        error: (err) => {
          console.log(err);
          this.isLooding.set(false);
        }
      })

    }
  }
  nextToPassword(): void {
    if (
      this.registerForm.get('firstName')?.valid &&
      this.registerForm.get('lastName')?.valid &&
      this.registerForm.get('phone')?.valid &&
      this.registerForm.get('username')?.valid
    ) {
      console.log(this.registerForm.value);
      this.step.set('password')
    }
  }
  createAccount(): void {
    console.log('CREATE ACCOUNT');
    
    if (this.registerForm.valid) {
      this.isLooding.set(true);
      const data = {
        email: this.registerForm.get('email')?.value,
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value,
        confirmPassword: this.registerForm.get('confirmPassword')?.value,
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        phone: this.registerForm.get('phone')?.value,
      }

      this._authService.Register(data).subscribe({
        next: (res) => {
          console.log(res);
          this._router.navigate(['/login']);
          this.isLooding.set(false);
        },
        error: (err) => {
          console.log(err)
          this.isLooding.set(false);
        }
      })
      console.log(this.registerForm.value);
    }
  }
}
