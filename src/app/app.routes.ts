import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'detail/:name', // Parámetro dinámico a través de la ruta [Módulo C-3]
    loadComponent: () => import('./pages/detail/detail.page').then( m => m.DetailPage)
  },
];