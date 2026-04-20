import { Component, DestroyRef, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { DiplomasService } from '../../services/diplomas/diplomas.service';
import { IDiploma } from '../../modules/diplomas/diplomas.interface';
import { DBreadcrumbComponent } from "../../../../../shared/components/d-breadcrumb/d-breadcrumb.component";
import { DPageHeadingComponent } from "../../../../../shared/components/d-page-heading/d-page-heading.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-diplomas',
  imports: [DBreadcrumbComponent, DPageHeadingComponent, RouterLink],
  templateUrl: './diplomas.component.html',
  styleUrl: './diplomas.component.css',
})
export class DiplomasComponent implements OnDestroy {
  private readonly _diplomasService = inject(DiplomasService);

  ngOnInit(): void {
    this.getAllDiplomas();
  }

  graduationIcon = `
   <svg xmlns="http://www.w3.org/2000/svg"
   width="24" height="24" viewBox="0 0 24 24"
   fill="none" stroke="currentColor" stroke-width="2"
   stroke-linecap="round" stroke-linejoin="round"
   class="lucide lucide-book-open-check-icon lucide-book-open-check">
   <path d="M12 21V7"/><path d="m16 12 2 2 4-4"/>
   <path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"/></svg>
  `;

  allDiplomas: WritableSignal<IDiploma[]> = signal([]);
  getAllDiplomas(): void {
    this._diplomasService.getAllDiplomas().subscribe({
        next: (res) => {
          this.allDiplomas.set(res)
          console.log(this.allDiplomas());
          
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  limit: WritableSignal<number> = signal(6);


  ngOnDestroy(): void {
    
  }
}
