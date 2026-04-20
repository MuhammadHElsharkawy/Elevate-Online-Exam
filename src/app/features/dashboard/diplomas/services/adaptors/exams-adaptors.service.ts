import { Injectable } from '@angular/core';
import { BExam, BExams } from '../../modules/back-modules/b-exams.interface';
import { IExams } from '../../modules/exams/exams.interface';

@Injectable({
  providedIn: 'root',
})
export class ExamsAdapt {
  getAllExamsAdaptor(data: BExams): IExams[] {
    return data.payload.data.map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        immutable: item.immutable,
        duration: item.duration,
        questionsCount: item.questionsCount,
        diploma: item.diploma
      }
    })
  }
  getExamByIdAdaptor(data: BExam): IExams {
    return {
      id: data.payload.exam.id,
      title: data.payload.exam.title,
      description: data.payload.exam.description,
      image: data.payload.exam.image,
      immutable: data.payload.exam.immutable,
      duration: data.payload.exam.duration,
      questionsCount: data.payload.exam.questionsCount,
      diploma: data.payload.exam.diploma
    }
  }
}
