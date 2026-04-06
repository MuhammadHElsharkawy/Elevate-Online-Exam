import { Component, inject, input, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { InputFieldComponent } from "../../../../../../shared/components/input-field/input-field.component";
import { DButtonComponent } from "../../../../../../shared/components/d-button/d-button.component";
import { DFormMsgComponent } from "../../../../../../shared/components/d-form-msg/d-form-msg.component";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'auth-lib';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, InputFieldComponent, DButtonComponent, DFormMsgComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _authService = inject(AuthService)
  private readonly _fb = inject(FormBuilder)
  private readonly _router = inject(Router)

  resetToken: WritableSignal<string | null> = signal(null);
  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(param => {
      this.resetToken.set(param.get('token'));
    })
    this.resetPasswordForm.get('token')?.setValue(this.resetToken())
  }

  passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/
  rePasswordValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.get('newPassword')?.value
    const rePassword: string = control.get('confirmPassword')?.value
    return (password == rePassword) ? null : { passwordMatch: true }
  }
  resetPasswordForm: FormGroup = this._fb.group({
    token: [null, [Validators.required]],
    newPassword: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]]
  }, {
    validators: this.rePasswordValidation
  })

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this._authService.ResetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this._router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

}
