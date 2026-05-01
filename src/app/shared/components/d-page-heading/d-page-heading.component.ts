import { Location } from '@angular/common';
import { Component, inject, Input, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-d-page-heading',
  imports: [],
  templateUrl: './d-page-heading.component.html',
  styleUrl: './d-page-heading.component.css',
})
export class DPageHeadingComponent {
  private _sanitizer = inject(DomSanitizer);
  private _location = inject(Location);

  svgIcon?: SafeHtml;

  @Input() set svgContent(value: string) {
    if (value) {
      this.svgIcon = this._sanitizer.bypassSecurityTrustHtml(value);
    }
  }

  withBack = input<boolean>(false);
  title = input<string>();

  goBack(): void {
    this._location.back();
  }

}
