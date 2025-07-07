import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { AuthLayoutComponent } from'./layouts/auth-layout/auth-layout.component'; 
import { HomeComponent } from './home/home/home.component'; 
import { DashboardComponent } from './dashboard/dashboard/dashboard.component'; 

export const routes: Routes = [
  // 1. Rota padrão que redireciona para a página de login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // 2. Rota para o componente de login
  { path: 'login', component: LoginComponent },

  // 3. Rotas autenticadas (Home e Dashboard) dentro do AuthLayoutComponent
  //    No Angular 15+, para rotas aninhadas com layouts, a estrutura é a mesma.
  //    Você pode adicionar um 'canActivate' aqui futuramente para proteção.
  {
    path: '', // Este path vazio permite que as rotas filhas usem o mesmo URL base (ex: /home, /dashboard)
    component: AuthLayoutComponent, // Componente de layout para as páginas autenticadas
    children: [
      { path: 'home', component: HomeComponent }, // Rota para a página Home
      { path: 'dashboard', component: DashboardComponent } // Rota para a página Dashboard
    ]
  },

  // 4. Rota wildcard para qualquer outra URL não encontrada (redireciona para login ou uma 404 page)
  { path: '**', redirectTo: '/login' }
];