import {Router, Routes} from '@angular/router';
import { AuthGuard } from "./core/guard/auth.guard";
import { inject } from '@angular/core';
import {DashboardFuncionarioComponent} from "./funcionario/dashboard/dashboard-funcionario.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: 'dashboard-paciente',
    loadComponent: () => import('./paciente/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [() => AuthGuard(inject(Router))]
  },
  {
    path: 'dashboard-funcionario',
    loadComponent: () => import('./funcionario/dashboard/dashboard-funcionario.component').then(m => m.DashboardFuncionarioComponent),
    canActivate:  [() => AuthGuard(inject(Router))]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
