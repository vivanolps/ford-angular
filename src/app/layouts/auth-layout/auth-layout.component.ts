import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router'; // Importe Router para o logout

@Component({
  selector: 'app-auth-layout',
  standalone: true, 
  imports: [RouterOutlet, RouterLink, RouterLinkActive], 
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {
  isSidebarOpen: boolean = false; // Estado inicial da sidebar (fechada em mobile)

  constructor(private router: Router) { } // Injeta o Router para o logout

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    
    console.log('Usuário deslogado!');
    
    this.router.navigate(['/login']);
  }
}