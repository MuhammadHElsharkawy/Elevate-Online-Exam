import { Component, input, output } from '@angular/core';
import { InputFieldComponent } from "../../../../../../shared/components/input-field/input-field.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DButtonComponent } from "../../../../../../shared/components/d-button/d-button.component";

@Component({
  selector: 'app-password',
  imports: [ReactiveFormsModule, InputFieldComponent, DButtonComponent],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css',
})
export class PasswordComponent {
  parentForm = input.required<FormGroup>();

  isLooding = input<boolean>(false);
  isDisabled(): boolean {
    if (
      this.parentForm().get('password')?.valid &&
      this.parentForm().get('confirmPassword')?.valid
    ) {
      return false;
    }
    else {
      return true;
    }
  }

  createAccount = output<void>();
  handleClick(): void {
    this.createAccount.emit();
  }

  
}
