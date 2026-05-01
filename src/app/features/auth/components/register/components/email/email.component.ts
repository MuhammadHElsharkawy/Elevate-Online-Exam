import { Component, inject, input, output, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from "../../../../../../shared/components/input-field/input-field.component";
import { DButtonComponent } from "../../../../../../shared/components/d-button/d-button.component";
import { DFormMsgComponent } from "../../../../../../shared/components/d-form-msg/d-form-msg.component";
import { ErrorMsgComponent } from "../../../../../../shared/components/error-msg/error-msg.component";

@Component({
  selector: 'app-email',
  imports: [ReactiveFormsModule, InputFieldComponent, DButtonComponent, DFormMsgComponent, ErrorMsgComponent],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css',
})
export class EmailComponent {

  control = input<AbstractControl>();

  get formControl(): FormControl {
    return this.control() as FormControl;
  }

  sendEmail = output<void>();
  handleClick(): void {
    this.sendEmail.emit();
  }
  
  isLooding = input<boolean>(false);
}
