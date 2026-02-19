import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageNav } from '../../shared/page-nav/page-nav';


@Component({
  selector: 'app-page',
  imports: [
    RouterOutlet,
    PageNav
  ],
  templateUrl: './page.html',
  styleUrl: './page.scss',
})
export class Page {

}
