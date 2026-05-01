import { Injectable } from '@angular/core';
import { bUser } from '../../modules/back-modules/buser.interface';
import { IUser } from '../../modules/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserAdapt {
  GetUserDataAdaptor(data: bUser): IUser {
    return {
      id: data.payload.user.id,
      username: data.payload.user.username,
      email: data.payload.user.email,
      phone: data.payload.user.phone,
      firstName: data.payload.user.firstName,
      lastName: data.payload.user.lastName,
      profilePhoto: data.payload.user.profilePhoto,
      emailVerified: data.payload.user.emailVerified,
      phoneVerified: data.payload.user.phoneVerified,
      role: data.payload.user.role,
      createdAt: data.payload.user.createdAt,
      updatedAt: data.payload.user.updatedAt,
    }
  }
}
