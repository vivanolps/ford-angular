import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // O caminho corrigido!

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  }
  // Suas outras rotas virão aqui
];