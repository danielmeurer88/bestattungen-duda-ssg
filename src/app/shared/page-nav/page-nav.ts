import { Component } from '@angular/core';
import { SvgIcon } from '../../shared/svg-icon/svg-icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nav.page-nav',
  imports: [
    SvgIcon,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './page-nav.html',
  styleUrl: './page-nav.scss',
})
export class PageNav {

}
