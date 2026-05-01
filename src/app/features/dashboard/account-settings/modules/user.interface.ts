export interface IUser {
    id: string;
    username: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    profilePhoto: string | null;
    emailVerified: boolean;
    phoneVerified: boolean;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}