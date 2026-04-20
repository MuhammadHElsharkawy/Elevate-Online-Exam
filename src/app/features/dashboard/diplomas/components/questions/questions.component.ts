import { Component, computed, inject, OnDestroy, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { DBreadcrumbComponent } from "../../../../../shared/components/d-breadcrumb/d-breadcrumb.component";
import { DPageHeadingComponent } from "../../../../../shared/components/d-page-heading/d-page-heading.component";
import { QuestionsService } from '../../services/questions/questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuestions } from '../../modules/questions/questions.interface';
import { FormBuilder, FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { DButtonComponent } from "../../../../../shared/components/d-button/d-button.component";
import { isPlatformBrowser } from '@angular/common';
import { SubmissionsService } from '../../services/Submissions/submissions.service';
import { AnswersREQ } from '../../modules/answers/answers.interface';
import { ResultsComponent } from "../results/results.component";
import { IResults } from '../../modules/results/results.interface';
import { DonutChartComponent } from "../../../../../shared/components/donut-chart/donut-chart.component";
import { ExamsService } from '../../services/exams/exams.service';
import { IExams } from '../../modules/exams/exams.interface';

@Component({
  selector: 'app-questions',
  imports: [ReactiveFormsModule, DBreadcrumbComponent, DPageHeadingComponent, ɵInternalFormsSharedModule, DButtonComponent, ResultsComponent, DonutChartComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnDestroy {
  private readonly _questionsService = inject(QuestionsService);
  private readonly _submissionsService = inject(SubmissionsService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _fb = inject(FormBuilder);
  private readonly _platformid = inject(PLATFORM_ID);
  private readonly _examsService = inject(ExamsService);

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      this.examId.set(params['examId'])

      if (this.examId()) {
        this.GetExamQuestions(this.examId());
        this.getExamById(this.examId());
      }

      if (isPlatformBrowser(this._platformid)) {
        const x = JSON.parse(localStorage.getItem(`exam_ans_${this.examId()}`)!);
        if (x) {
          this.userAnswers.set(x)
        }
        const y = JSON.parse(localStorage.getItem('last_index')!);
        if (y) {
          this.currentQuestionIndex.set(y);
        }
      }
    })
  }

  questionmarkIcon = `
  <svg xmlns="http://www.w3.org/2000/svg"
  width="45" height="45" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round"
  class="lucide lucide-circle-question-mark-icon lucide-circle-question-mark">
  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
  <path d="M12 17h.01"/></svg>
  `

  examId: WritableSignal<string> = signal('');
  currentExam: WritableSignal<IExams | null> = signal(null);
  examQuestions: WritableSignal<IQuestions[]> = signal([]);
  currentQuestionIndex: WritableSignal<number> = signal(0);
  currentQuestion = computed(() => this.examQuestions()[this.currentQuestionIndex()]);
  answersArr: WritableSignal<string[]> = signal([]);
  answerCtrl: FormControl = this._fb.control([null])
  userAnswers: WritableSignal<Record<string, string>> = signal({})

  isAllQuestionsAnswered(): boolean {
    return Object.keys(this.userAnswers()).length == this.examQuestions().length;
  }

  progressWidth = computed(() => {
    const total = this.examQuestions().length;
    if (total == 0) return 0;
    return ((this.currentQuestionIndex() + 1) / total) * 100;
  });

  handleAnswerSelection(questionId: string, answerId: string) {
    this.userAnswers.update(prev => ({
      ...prev,
      [questionId]: answerId
    }))

    if (isPlatformBrowser(this._platformid)) {
      localStorage.setItem(`exam_ans_${this.examId()}`, JSON.stringify(this.userAnswers()))
    }

    console.log(this.userAnswers());
  }

  nextQuestion(): void {
    this.currentQuestionIndex.update((c) => c + 1);
    if (isPlatformBrowser(this._platformid)) {
      localStorage.setItem('last_index', this.currentQuestionIndex().toString());
    }
  }
  prevQuestion(): void {
    this.currentQuestionIndex.update((c) => c - 1);
    if (isPlatformBrowser(this._platformid)) {
      localStorage.setItem('last_index', this.currentQuestionIndex().toString());
    }
  }

  GetExamQuestions(examId: string): void {
    this._questionsService.GetAllQuestionsForExams(examId).subscribe({
      next: (res) => {
        this.examQuestions.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getExamById(examId: string): void {
    this._examsService.getExamById(examId).subscribe({
      next: (res) => {
        this.currentExam.set(res);
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  showResults: WritableSignal<boolean> = signal(false);
  submitLoading: WritableSignal<boolean> = signal(false);
  submitExam() {
    const formattedAnswers = Object.entries(this.userAnswers()).map(([qId, aId]) => ({
      questionId: qId,
      answerId: aId
    }));

    const body = {
      examId: this.examId(),
      answers: formattedAnswers,
      startedAt: "2026-04-19T19:43:11.215Z"
    };

    this.submitExamQuestions(body);
  }

  results: WritableSignal<IResults | null> = signal(null);
  submitExamQuestions(data: AnswersREQ): void {
    if (this.isAllQuestionsAnswered()) {
      this.submitLoading.set(true);
      this._submissionsService.SubmitExam(data).subscribe({
        next: (res) => {
          console.log(res);
          
          this.results.set(res);
          this.submitLoading.set(false);
          this.showResults.set(true);
        },
        error: (err) => {
          this.submitLoading.set(false);
          console.log(err);
        }
      })
    } else {
      this.showResults.set(true);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this._platformid)) {
      localStorage.removeItem(`exam_ans_${this.examId()}`);
      localStorage.removeItem('last_index');
    }
  }
}
