import { Injectable } from '@angular/core';
import { BQuestions } from '../../modules/back-modules/b-questions.interface';
import { IQuestions } from '../../modules/questions/questions.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionsAdapt {
  getAllQuestionsForExam(data: BQuestions): IQuestions[] {
    return data.payload.questions.map((item) => {
      return {
        id: item.id,
        question: item.text,
        examId: item.examId,
        immutable: item.immutable,
        answers: item.answers
      }
    })
  }
}
