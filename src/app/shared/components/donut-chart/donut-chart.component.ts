import { Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { output } from '@angular/core';

@Component({
  selector: 'app-donut-chart',
  imports: [],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.css',
})
export class DonutChartComponent implements OnInit {
  ngOnInit(): void {
    this.Percent = this.totalCount() > 0 ? this.mainCount() / this.totalCount() * 100 : 0;

    if (this.withTimer()) {
      this.timeLeft.set(this.totalTime());
      this.updateDisplay();
      this.startTimer();
    }
  }

  mainColor = input<string>('#155DFC');
  secondColor = input<string>('#DBEAFE');

  size = input<number>(45)


  mainCount = input.required<number>()
  totalCount = input.required<number>()
  Percent: number = 0;

  closeTimer = input<boolean>(false);
  withTimer = input<boolean>(false);
  totalTime = input<number>(125);
  timeLeft: WritableSignal<number> = signal(0);
  minutes: WritableSignal<number> = signal(0);
  seconds: WritableSignal<number> = signal(0);

  interval: any;
  startTime!: number;

  startTimer(): void {
    this.startTime = Date.now();

    this.interval = setInterval(() => {
      if (this.closeTimer()) {
        clearInterval(this.interval);
        return;
      }

      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const remaining = this.totalTime() - elapsed;

      if (remaining <= 0) {
        this.timeFinished.emit();
        this.timeLeft.set(0);
        this.Percent = 0;
        clearInterval(this.interval);
      } else {
        this.timeLeft.set(remaining);
        this.Percent = (remaining / this.totalTime()) * 100;
      }

      this.updateDisplay();
    }, 200);
  }

  timeFinished = output<void>();
  updateDisplay() {
    this.minutes.set(Math.floor(this.timeLeft() / 60));
    this.seconds.set(this.timeLeft() % 60);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
