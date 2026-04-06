import { Component, input, output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from "../../../../../../shared/components/input-field/input-field.component";
import { DButtonComponent } from "../../../../../../shared/components/d-button/d-button.component";
import { PhoneInputComponent } from "../../../../../../shared/components/phone-input/phone-input.component";

@Component({
  selector: 'app-user-info',
  imports: [ReactiveFormsModule, InputFieldComponent, DButtonComponent, PhoneInputComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  parentForm = input.required<FormGroup>();

  control = input<AbstractControl>();

  isLooding = input<boolean>(false);

  isDisabled(): boolean {
    if (
      this.parentForm().get('firstName')?.valid &&
      this.parentForm().get('lastName')?.valid &&
      this.parentForm().get('phone')?.valid &&
      this.parentForm().get('username')?.valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }

  get phoneControl(): FormControl {
    return this.parentForm().get('phone') as FormControl;
  }

  get isInValid(): boolean {
    const ctrl = this.parentForm().get('phone')
    return (ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty))!
  }


  gotopassword = output<void>();
  handleClick(): void {
    this.gotopassword.emit();
  }
}
