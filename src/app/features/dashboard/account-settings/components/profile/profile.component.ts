import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { InputFieldComponent } from "../../../../../shared/components/input-field/input-field.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhoneInputComponent } from "../../../../../shared/components/phone-input/phone-input.component";
import { DButtonComponent } from "../../../../../shared/components/d-button/d-button.component";
import { UsersService } from '../../services/users/users.service';
import { IUser } from '../../modules/user.interface';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { VirifyEmailComponent } from "../../../../../shared/components/virify-email/virify-email.component";

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, InputFieldComponent, PhoneInputComponent, DButtonComponent, VirifyEmailComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _usersServices = inject(UsersService);
  private readonly _platformid = inject(PLATFORM_ID);
  private readonly _router = inject(Router);

  ngOnInit(): void {
    this.getUserData();
  }
  UserData: WritableSignal<IUser | null> = signal(null);

  userForm: FormGroup = this._fb.group({
    firstName: [''],
    lastName: [''],
    username: [''],
    email: [''],
    phone: [''],
  })

  userFormInit(): void {
    this.userForm = this._fb.group({
      firstName: [this.UserData()?.firstName],
      lastName: [this.UserData()?.lastName],
      username: [{ value: this.UserData()?.username, disabled: true }],
      email: [this.UserData()?.email],
      phone: [this.UserData()?.phone],
    })
  }

  isModalOpen: WritableSignal<boolean> = signal(false);
  modalMode: WritableSignal<'email' | 'code' | 'delete'> = signal('email');

  closeModal(): void {
    this.isModalOpen.set(false);
  }


  getUserData(): void {
    this._usersServices.getUserData().subscribe({
      next: (res) => {
        this.UserData.set(res);
        this.userFormInit();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateProfile(): void {
    const data = {
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      phone: this.userForm.get('phone')?.value,
    }

    this._usersServices.updateProfile(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteBtnClick(): void {
    this.modalMode.set('delete');
    this.isModalOpen.set(true);
  }
  removeToken(): void {
    if (isPlatformBrowser(this._platformid)) {
      localStorage.removeItem('ExamAppToken');
    }
  }
  deleteAccount(): void {
    this._usersServices.deleteAccount().subscribe({
      next: (res) => {
        console.log(res);
        this.closeModal();
        this.removeToken();
        this._router.navigate(['/login'])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }




  changeEmailForm: FormGroup = this._fb.group({
    newEmail: [null, [Validators.required, Validators.email]],
    code: [null, [Validators.required]]
  })
  onOtpChange(otpValue: string) {
    this.changeEmailForm.get('code')?.setValue(otpValue);
  }
  changeBtnClick(): void {
    this.modalMode.set('email');
    this.isModalOpen.set(true);
  }
  changeEmailLoading: WritableSignal<boolean> = signal(false);
  requestCode(): void {
    this.changeEmailLoading.set(true);
    const email = {
      newEmail: this.changeEmailForm.get('newEmail')?.value
    }

    this._usersServices.requestCode(email).subscribe({
      next: (res) => {
        console.log(res);
        this.modalMode.set('code');
        this.changeEmailLoading.set(false);
      },
      error: (err) => {
        this.changeEmailLoading.set(false);
        console.log(err);
      }
    })
  }
  confirmEmail(): void {
    this.changeEmailLoading.set(true);
    const code = {
      code: this.changeEmailForm.get('code')?.value
    }

    this._usersServices.confirmEmail(code).subscribe({
      next: (res) => {
        console.log(res);
        this.closeModal();
        this.changeEmailLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.changeEmailLoading.set(false);
      }
    })
  }
}
