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
import { authGuard } from './core/guards/auth/auth-guard-guard';
import { AccountSettingsComponent } from './features/dashboard/account-settings/components/account-settings/account-settings.component';
import { DiplomasSectionComponent } from './features/dashboard/diplomas/components/diplomas-section/diplomas-section.component';
import { ProfileComponent } from './features/dashboard/account-settings/components/profile/profile.component';
import { ChangePasswordComponent } from './features/dashboard/account-settings/components/change-password/change-password.component';

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
        path: 'main', component: MainLayoutComponent, canActivate: [authGuard], children: [
            {
                path: 'diplomas-section', component: DiplomasSectionComponent, children: [
                    { path: '', redirectTo: 'diplomas', pathMatch: 'full' },
                    { path: 'diplomas', component: DiplomasComponent },
                    { path: 'exams', component: ExamsComponent },
                    { path: 'questions', component: QuestionsComponent },
                ]
            },
            {
                path: 'account-settings', component: AccountSettingsComponent, children: [
                    { path: '', redirectTo: 'profile', pathMatch: 'full' },
                    { path: 'profile', component: ProfileComponent },
                    { path: 'change-password', component: ChangePasswordComponent }
                ]
            }
        ]
    }
];
