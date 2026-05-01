import { Component, input, output, signal } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { NgOtpInputComponent } from "ng-otp-input";

@Component({
  selector: 'app-virify-email',
  imports: [NgOtpInputComponent],
  templateUrl: './virify-email.component.html',
  styleUrl: './virify-email.component.css',
})
export class VirifyEmailComponent {
  ngOnInit() {
    this.startTimer();
  }
  timeLeft = signal(60);
  timerInterval: any;
  startTimer() {
    this.stopTimer();
    this.timeLeft.set(60);
    this.timerInterval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update(value => value - 1);
      } else {
        this.stopTimer();
      }
    }, 1000);
  }
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
  ngOnDestroy() {
    this.stopTimer();
  }

  resendCode = output<void>();
  handleResendCode(): void {
    if(this.timeLeft() == 0) {
      this.resendCode.emit();
      this.startTimer();
    }
  }
  codeControl = input.required<AbstractControl>();

  get formControl(): FormControl {
    return this.codeControl() as FormControl;
  }

  onOtpChange(otpValue: string) {
    this.codeControl().setValue(otpValue);
  }
}
