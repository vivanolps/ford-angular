import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Certifique-se que o caminho está correto
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component'; // Importe o AuthLayoutComponent

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', // Rota vazia para o layout autenticado
    component: AuthLayoutComponent,
    children: [
      { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
      // Iremos criar o DashboardComponent em breve
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: '', redirectTo: 'home', pathMatch: 'full' } // Redireciona a rota base para home
    ]
  },
  { path: '**', redirectTo: 'login' } // Redireciona rotas inválidas para o login
];