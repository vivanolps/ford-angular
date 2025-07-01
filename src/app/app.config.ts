import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { LoginModule } from './login/login.module'; // Importa o LoginModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(LoginModule) // Adiciona o LoginModule aqui
  ]
};