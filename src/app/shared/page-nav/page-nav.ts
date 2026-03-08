import { Component, inject } from '@angular/core';
import { SvgIcon } from '../../shared/svg-icon/svg-icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { PageService } from '../page-service';

@Component({
  selector: 'nav.page-nav',
  imports: [
    SvgIcon,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    NgTemplateOutlet
  ],
  templateUrl: './page-nav.html',
  styleUrl: './page-nav.scss',
})
export class PageNav {

  pageService = inject(PageService);

}
