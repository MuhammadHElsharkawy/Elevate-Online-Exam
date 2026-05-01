import { Component, inject, PLATFORM_ID } from '@angular/core';
import { DBreadcrumbComponent } from "../../../../../shared/components/d-breadcrumb/d-breadcrumb.component";
import { DPageHeadingComponent } from "../../../../../shared/components/d-page-heading/d-page-heading.component";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  imports: [DBreadcrumbComponent, DPageHeadingComponent, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css',
})
export class AccountSettingsComponent {
  private readonly _platformid = inject(PLATFORM_ID);
  private readonly _router = inject(Router);

  usericon = `
  <svg xmlns="http://www.w3.org/2000/svg"
  width="45" height="45" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" stroke-width="1.5"
  stroke-linecap="round" stroke-linejoin="round"
  class="lucide lucide-user-round-icon lucide-user-round">
  <circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>
  </svg>`;


  logout(): void {
    if (isPlatformBrowser(this._platformid)) {
      localStorage.removeItem('ExamAppToken');
      this._router.navigate(['/login']);
    }
  }

  
}
