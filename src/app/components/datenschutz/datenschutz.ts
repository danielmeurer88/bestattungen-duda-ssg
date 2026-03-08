import { Component, inject } from '@angular/core';
import { PageService } from '../../shared/page-service';

@Component({
  selector: 'app-datenschutz',
  imports: [
  ],
  templateUrl: './datenschutz.html',
  styleUrl: './datenschutz.scss',
})
export class Datenschutz {

  pageService = inject(PageService);

  constructor() {
    this.pageService.name$.next('Datenschutz');
  }

}
