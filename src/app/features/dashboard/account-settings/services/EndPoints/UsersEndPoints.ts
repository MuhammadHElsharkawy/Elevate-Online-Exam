import { environment } from "../../../../../../environment/environment.development";

export class UsersEndPoints {
    static readonly GetCurrentUser = `${environment.baseUrl}/api/users/profile`;
    static readonly UpdateProfile = `${environment.baseUrl}/api/users/profile`;
    static readonly ChangePassword = `${environment.baseUrl}/api/users/change-password`;
    static readonly RequestCode = `${environment.baseUrl}/api/users/email/request`;
    static readonly ConfirmEmail = `${environment.baseUrl}/api/users/email/confirm`;
    static readonly DeleteAccount = `${environment.baseUrl}/api/users/account`;
}