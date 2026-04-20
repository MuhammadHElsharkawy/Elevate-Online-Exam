import { Component, HostListener, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
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
  
}
