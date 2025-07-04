import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-home',
  standalone: true, // <-- Mantenha como standalone
  imports: [CommonModule], // Adicione CommonModule aqui
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // onLogout() removido daqui, irá para AuthLayoutComponent
}