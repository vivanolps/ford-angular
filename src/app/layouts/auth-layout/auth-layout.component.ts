import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Importar Router para navegação
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,        // Para links de navegação
    RouterLinkActive,  // Para adicionar classe 'active' ao link atual
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {

  constructor(private router: Router) { } // Injetar Router

  logout() {
    // Lógica de logout: limpar token, dados do usuário, e redirecionar para o login
    console.log('Realizando logout...');
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}