import { Component, inject, signal, WritableSignal } from '@angular/core';
import { DBreadcrumbComponent } from "../../../../../shared/components/d-breadcrumb/d-breadcrumb.component";
import { DPageHeadingComponent } from "../../../../../shared/components/d-page-heading/d-page-heading.component";
import { ExamsService } from '../../services/exams/exams.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IExams } from '../../modules/exams/exams.interface';
import { DiplomasService } from '../../services/diplomas/diplomas.service';
import { IDiploma } from '../../modules/diplomas/diplomas.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-exams',
  imports: [DBreadcrumbComponent, DPageHeadingComponent, RouterLink],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css',
})
export class ExamsComponent {
  private readonly _examsService = inject(ExamsService);
  private readonly _diplomasService = inject(DiplomasService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      const diplomaId = params['diplomaId']

      if (diplomaId) {
        this.getExamsByDiploma(diplomaId);
        this.getDiplomaById(diplomaId);
      }
      else {
        this.getAllExams();
      }
    })
  }

  bookIcon = `
   <svg xmlns="http://www.w3.org/2000/svg"
   width="45" height="45" viewBox="0 0 24 24"
   fill="none" stroke="currentColor" stroke-width="2"
   stroke-linecap="round" stroke-linejoin="round"
   class="lucide lucide-book-open-check-icon lucide-book-open-check">
   <path d="M12 21V7"/><path d="m16 12 2 2 4-4"/>
   <path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"/></svg>
  `;


  ExamsList: WritableSignal<IExams[]> = signal([]);
  getAllExams(): void {
    this._examsService.getAllExams().subscribe({
      next: (res) => {
        this.ExamsList.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getExamsByDiploma(diplomaId: string): void {
    this._examsService.getExamsByDiploma(diplomaId).subscribe({
      next: (res) => {
        this.ExamsList.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  currentDiploma: WritableSignal<IDiploma | null> = signal(null);
  getDiplomaById(diplomaId: string): void {
    this._diplomasService.getDiplomaById(diplomaId).subscribe({
      next: (res) => {
        this.currentDiploma.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
