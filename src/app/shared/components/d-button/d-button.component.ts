import { Component, input } from '@angular/core';

@Component({
  selector: 'app-d-button',
  imports: [],
  templateUrl: './d-button.component.html',
  styleUrl: './d-button.component.css',
})
export class DButtonComponent {
  btnText = input<string>('');
  btnBgColor = input<string>('bg-blue-600')
  btnColor = input<string>('text-white')
  btnBorderColor = input<string | null>(null);

  icon = input<string | null>(null);
  iconLocation = input<'left' | 'right' | 'top' | 'bottom'>();

  isDisabled = input<boolean>(false);
  isLooding = input<boolean>(false);
}
