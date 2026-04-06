export class AuthEndPoints {
    static readonly SendOtpToEmail = 'https://exam-app.elevate-bootcamp.cloud/api/auth/send-email-verification';
    static readonly ConfirmOtp = 'https://exam-app.elevate-bootcamp.cloud/api/auth/confirm-email-verification';
    static readonly Register = 'https://exam-app.elevate-bootcamp.cloud/api/auth/register';
    static readonly Login = 'https://exam-app.elevate-bootcamp.cloud/api/auth/login';
    static readonly RequestPasswordReset = 'https://exam-app.elevate-bootcamp.cloud/api/auth/forgot-password';
    static readonly ResetPassword = 'https://exam-app.elevate-bootcamp.cloud/api/auth/reset-password';
}