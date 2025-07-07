import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  usuario = '';
  senha = '';
  lembrar = false;
  erroLogin = false;

  constructor(private router: Router) {}

  onLogin(): void {
    // Validação simples de login
    if (this.usuario === 'admin' && this.senha === '123456') {
      this.erroLogin = false;

      if (this.lembrar) {
        localStorage.setItem('usuario', this.usuario);
      }

      this.router.navigate(['/home']);
    } else {
      this.erroLogin = true;
    }
  }

  mostrarSenha = false;

  toggleSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }
}