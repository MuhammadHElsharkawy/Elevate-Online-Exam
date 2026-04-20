import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-d-button',
  imports: [],
  templateUrl: './d-button.component.html',
  styleUrl: './d-button.component.css',
})
export class DButtonComponent {
  private _sanitizer = inject(DomSanitizer);

  btnText = input<string>('');
  btnBgColor = input<string>('bg-blue-600')
  btnColor = input<string>('text-white')
  btnBorderColor = input<string | null>(null);
  btnType = input<'reset' | 'button' | 'submit'>('button');

  icon = input<string | null>(null);
  iconLocation = input<'left' | 'right'>();

  isDisabled = input<boolean>(false);
  isLooding = input<boolean>(false);

  @Output() btnClick = new EventEmitter<void>();
  onBtnClick() {
    this.btnClick.emit();
  }

  svgIcon?: SafeHtml;

  @Input() set svgContent(value: string) {
    if (value) {
      this.svgIcon = this._sanitizer.bypassSecurityTrustHtml(value);
    }
  }
}
