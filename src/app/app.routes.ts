import { Routes } from '@angular/router';
import { Start } from './components/start/start';
import { Datenschutz } from './components/datenschutz/datenschutz';
import { Impressum } from './components/impressum/impressum';
import { Component } from '@angular/core';


@Component({
  selector: 'app-test',
  imports: [
  ],
  template: `

    <div class="anker-el"></div>
    <div class="tooltip"></div>

  `,
  styles: `

    @position-try --drunter-r {
      top: anchor(bottom);
      right: auto;
      bottom: auto;
      left: anchor(center);
    }

    @position-try --drueber-r {
      top: auto;
      right: auto;
      bottom: anchor(top);
      left: anchor(center);
    }

    @position-try --drueber-l {
      top: auto;
      right: anchor(center);
      bottom: anchor(top);
      left: auto;
    }

    @position-try --drunter-l {
      top: anchor(bottom);
      right: anchor(center);
      bottom: auto;
      left: auto;
    }

    :host {

      .anker-el {

        position: fixed;
        top: 300px;
        left: 250px;

        width: 120px;
        height: 80px;
        background-color: red;
        anchor-name: --test-anchor;
      }
      .tooltip {
        width: 300px;
        height: 200px;
        background-color: blue;

        position: absolute;

        position-anchor: --test-anchor;
        position-visibility: always;
        top: anchor(bottom);
        left: anchor(center);

        position-try-fallbacks: --drunter-r, --drueber-r, --drunter-l, --drueber-l;

      }
    }
  `,
})
export class TestComponent {}


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    component: Start,
    path: 'start',
    data: {
      routeName: 'Startseite'
    }
  },
  {
    component: Datenschutz,
    path: 'datenschutz',
    data: {
      routeName: 'Datenschutz'
    }
  },
  {
    component: Impressum,
    path: 'impressum',
    data: {
      routeName: 'Impressum'
    }
  },
  {
    component: TestComponent,
    path: 'test',
    data: {
      routeName: 'test'
    }
  },
  {
    path: '**',
    redirectTo: '/'
  },
];
