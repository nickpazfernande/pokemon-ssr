import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-pages.component')
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-pages.component')
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-pages.component')
  },
  {
    path: 'pokemons',
    pathMatch: 'full',
    redirectTo: 'pokemons/1'
  },
  {
    path: 'pokemons/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component')
  },
  {
    path: 'pokemon/:idOrName',
    loadComponent: () => import('./pages/pokemon-page.component/pokemon-page.component')
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];
