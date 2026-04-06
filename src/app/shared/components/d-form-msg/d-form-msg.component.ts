import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-d-form-msg',
  imports: [RouterLink],
  templateUrl: './d-form-msg.component.html',
  styleUrl: './d-form-msg.component.css',
})
export class DFormMsgComponent {
  msg = input<string>('');
  link = input<string>('');
  goTo = input<string>('');
}
