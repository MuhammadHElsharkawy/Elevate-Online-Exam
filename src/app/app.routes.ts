import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { AuthLayoutComponent } from './features/auth/components/auth-layout/auth-layout.component';
import { ForgotPasswordComponent } from './features/auth/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/components/forgot-password/components/reset-password/reset-password.component';
import { MainLayoutComponent } from './features/dashboard/main-layout/main-layout.component';
import { DiplomasComponent } from './features/dashboard/diplomas/components/diplomas/diplomas.component';
import { ExamsComponent } from './features/dashboard/diplomas/components/exams/exams.component';
import { QuestionsComponent } from './features/dashboard/diplomas/components/questions/questions.component';
import { ResultsComponent } from './features/dashboard/diplomas/components/results/results.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '', component: AuthLayoutComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
        ]
    },
    { path: 'reset-password', component: ResetPasswordComponent },
    {
        path: 'main', component: MainLayoutComponent, children: [
            { path: '', redirectTo: 'diplomas', pathMatch: 'full' },
            { path: 'diplomas', component: DiplomasComponent },
            { path: 'exams', component: ExamsComponent },
            { path: 'questions', component: QuestionsComponent },
            { path: 'results', component: ResultsComponent }
        ]
    }
];
