import { Routes } from '@angular/router';
import { Start } from './components/start/start';
import { Datenschutz } from './components/datenschutz/datenschutz';
import { Impressum } from './components/impressum/impressum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    component: Start,
    path: 'start',
  },
  {
    component: Datenschutz,
    path: 'datenschutz',
  },
  {
    component: Impressum,
    path: 'impressum',
  },
  {
    path: '**',
    redirectTo: '/'
  },
];
