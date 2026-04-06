import { Component, input, model, output, signal } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-verify-email',
  imports: [NgOtpInputModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
})
export class VerifyEmailComponent {
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



  isLooding = input<boolean>(false);

  emailControl = input.required<AbstractControl>();
  codeControl = input.required<AbstractControl>();

  sendCode = output<void>();
  handleSendCode(): void {
    this.sendCode.emit();
  }

  onOtpChange(otpValue: string) {
    this.codeControl().setValue(otpValue);    
  }

  resendCode = output<void>();
  handleResendCode(): void {
    if(this.timeLeft() == 0) {
      this.resendCode.emit();
      this.startTimer();
    }
  }

  step = model.required<'email' | 'code' | 'info' | 'password'>();
  goBack(): void {
    this.step.set('email');
    this.codeControl().reset();
  }
}
