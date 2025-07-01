import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import necessário se seu template usar Pipes, etc.

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true, // Garanta que é standalone
  imports: [CommonModule] // Adicione CommonModule para compatibilidade geral se necessário
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear(); // Adiciona a propriedade para o ano atual
}