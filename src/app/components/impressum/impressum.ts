import { Component, inject } from '@angular/core';
import { PageService } from '../../shared/page-service';

@Component({
  selector: 'app-impressum',
  imports: [],
  templateUrl: './impressum.html',
  styleUrl: './impressum.scss',
})
export class Impressum {

  pageService = inject(PageService);

  constructor() {
    this.pageService.name$.next('Impressum');
  }

}
