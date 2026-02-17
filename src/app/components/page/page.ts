import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SvgIcon } from '../../shared/svg-icon/svg-icon';

@Component({
  selector: 'app-page',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SvgIcon
  ],
  templateUrl: './page.html',
  styleUrl: './page.scss',
})
export class Page {

}
