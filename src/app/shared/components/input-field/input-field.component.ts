import { ChangeDetectorRef, Component, inject, input, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
})
export class InputFieldComponent {
  private cd = inject(ChangeDetectorRef);

  inputId = input.required<string>();
  isReadOnly = input<boolean>(false);
  // isDisabled = input<boolean>(false);
  inputType = input<string>();
  inputLabel = input<string>();
  inputPlaceholder = input<string>();
  control = input.required<AbstractControl>();

  get formControl(): FormControl {
    return this.control() as FormControl;
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  get isInValid(): boolean {
    const ctrl = this.control();
    return (ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty))!
  }

  redStar = input<boolean>(false);

  type: WritableSignal<'text' | 'password'> = signal('password');
  isPasswordShown: WritableSignal<boolean> = signal(false);
  toggleShowPassword(): void {
    this.isPasswordShown.set(!this.isPasswordShown())
    if (this.type() == 'password') {
      this.type.set('text')
    } else {
      this.type.set('password')
    }
  }
}
