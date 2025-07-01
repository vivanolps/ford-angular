import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necessário para *ngIf
import { FormsModule } from '@angular/forms'; // Necessário para [(ngModel)]

@Component({
  selector: 'app-login', // Mantenha este seletor
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Se seu projeto usa standalone components. Se não souber, pode remover por enquanto.
  imports: [CommonModule, FormsModule] // Se standalone, adicione aqui. Se não for, remova e importe no LoginModule.
})
export class LoginComponent { // O nome da classe deve ser LoginComponent
  usuario = '';
  senha = '';
  lembrar = false;
  erroLogin = false;

  constructor(private router: Router) {}

  onLogin() {
    if (this.usuario === 'admin' && this.senha === '123456') {
      this.erroLogin = false;
      this.router.navigate(['/dashboard']); // Vamos criar /dashboard depois
    } else {
      this.erroLogin = true;
    }
  }
}