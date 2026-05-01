import { Component, inject } from '@angular/core';
import { InputFieldComponent } from "../../../../../shared/components/input-field/input-field.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DButtonComponent } from "../../../../../shared/components/d-button/d-button.component";
import { UsersService } from '../../services/users/users.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';


@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, InputFieldComponent, DButtonComponent, MatSlideToggle],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _usersService = inject(UsersService);

  changePasswordForm: FormGroup = this._fb.group({
    currentPassword: [''],
    newPassword: [''],
    confirmPassword: ['']
  })

  changePassword(): void {
    this._usersService.changePassword(this.changePasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
