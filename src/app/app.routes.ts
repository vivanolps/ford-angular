import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AuthLayoutComponent, // AuthLayoutComponent é o pai de home e dashboard
    children: [
      { path: 'home', loadComponent: () => import('./home/home/home.component').then(m => m.HomeComponent) },
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];