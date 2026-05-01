import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { InputFieldComponent } from "../../../../shared/components/input-field/input-field.component";
import { DButtonComponent } from "../../../../shared/components/d-button/d-button.component";
import { DFormMsgComponent } from "../../../../shared/components/d-form-msg/d-form-msg.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'auth-lib';
import { ErrorMsgComponent } from "../../../../shared/components/error-msg/error-msg.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputFieldComponent, DButtonComponent, DFormMsgComponent, RouterLink, ErrorMsgComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly _fb = inject(FormBuilder)
  private readonly _router = inject(Router)
  private readonly _authService = inject(AuthService)

  ngOnInit(): void {
    this.formInit()
  }

  loginForm!: FormGroup;

  formInit(): void {
    this.loginForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  errMsg: WritableSignal<string | null> = signal(null);

  isLooding: WritableSignal<boolean> = signal(false);
  login(): void {
    if (this.loginForm.valid) {
      this.errMsg.set(null);
      this.isLooding.set(true);
      this._authService.Login(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLooding.set(false);
          if (typeof res != 'string' && res.token) {
            localStorage.setItem('ExamAppToken', res.token);
          }
          this._router.navigate(['/main/diplomas-section']);
        },
        error: (err) => {
          this.errMsg.set(err.error.message);
          this.isLooding.set(false);
        }
      })
    }
  }
}
