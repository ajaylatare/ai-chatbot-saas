import { Routes } from '@angular/router';
import { authGuard } from './shared/interceptors/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register').then(m => m.Register)
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat-window/chat-window').then(m => m.ChatWindow),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard]
  },
  {
    path: 'plans',
    loadComponent: () =>
      import('./subscription/plans/plans').then(m => m.Plans),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];