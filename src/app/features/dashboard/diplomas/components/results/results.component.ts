import { Component, inject, input, PLATFORM_ID } from '@angular/core';
import { DonutChartComponent } from "../../../../../shared/components/donut-chart/donut-chart.component";
import { IResults } from '../../modules/results/results.interface';
import { DButtonComponent } from "../../../../../shared/components/d-button/d-button.component";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { IExams } from '../../modules/exams/exams.interface';

@Component({
  selector: 'app-results',
  imports: [DonutChartComponent, DButtonComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent {
  private readonly router = inject(Router)
  private readonly platformid = inject(PLATFORM_ID)

  resultsRes = input<IResults | null>(null);
  currentExam = input<IExams | null>(null);

  foldersearchicon = `
    <svg xmlns="http://www.w3.org/2000/svg"
    width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round"
    class="lucide lucide-folder-search-icon lucide-folder-search">
    <path d="M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1"/>
    <path d="m21 21-1.9-1.9"/><circle cx="17" cy="17" r="3"/></svg>
  `
  restarticon = `
    <svg xmlns="http://www.w3.org/2000/svg"
    width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round"
    class="lucide lucide-rotate-ccw-icon lucide-rotate-ccw">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/></svg>
  `

  tryAgain(): void {
    this.router.navigateByUrl(this.router.url, { onSameUrlNavigation: 'reload' })
      .then(() => {
        window.location.reload();
      });
      if (isPlatformBrowser(this.platformid)) {
        localStorage.removeItem(`exam_ans_${this.currentExam()?.id}`);
      localStorage.removeItem('last_index');
      }
  }
}
