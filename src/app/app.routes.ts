import { Routes } from '@angular/router';
import { Page } from './components/page/page';

export const routes: Routes = [
  {
    component: Page,
    path: '',
    providers: []
  },
  {
    path: '**',
    redirectTo: '/'
  },
];
