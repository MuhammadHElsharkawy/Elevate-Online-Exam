import { Component, input } from '@angular/core';

@Component({
  selector: 'app-d-breadcrumb',
  imports: [],
  templateUrl: './d-breadcrumb.component.html',
  styleUrl: './d-breadcrumb.component.css',
})
export class DBreadcrumbComponent {
  bath = input.required<string[]>();
}
