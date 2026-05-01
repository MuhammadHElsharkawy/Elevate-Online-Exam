import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { UsersService } from '../account-settings/services/users/users.service';
import { IUser } from '../account-settings/modules/user.interface';

@Component({
  selector: 'app-main-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  private readonly _platformid = inject(PLATFORM_ID);
  private readonly _router = inject(Router);
  private readonly _usersServices = inject(UsersService);

  ngOnInit(): void {
    this.getUserData();
  }

  popupListOpen: WritableSignal<boolean> = signal(false);
  openPopupList(): void {
    this.popupListOpen.set(true);
  }
  closePopupList(): void {
    this.popupListOpen.set(false);
  }
  togglePopupList(event: Event): void {
    this.popupListOpen.set(!this.popupListOpen());
    event.stopPropagation();
  }
  @HostListener('document:click')
  closeUserList(): void {
    this.popupListOpen.set(false);
  }

  UserData: WritableSignal<IUser | null> = signal(null);
  getUserData(): void {
    this._usersServices.getUserData().subscribe({
      next: (res) => {
        this.UserData.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  logout(): void {
    if (isPlatformBrowser(this._platformid)) {
      localStorage.removeItem('ExamAppToken');
      this._router.navigate(['/login']);
    }
  }
}
