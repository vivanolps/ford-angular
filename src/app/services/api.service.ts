import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Ajuste o caminho se necessário
import { CommonModule } from '@angular/common'; // Para ngIf, ngFor
import { FormsModule } from '@angular/forms'; // Para ngModel no seletor

@Component({
  selector: 'app-dashboard',
  standalone: true, // Se o seu componente for standalone
  imports: [CommonModule, FormsModule], // Adicione aqui
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: any[] = []; // Para armazenar a lista de veículos para o seletor
  selectedVehicleModel: string | undefined; // Para o modelo selecionado no dropdown
  selectedVehicleDetails: any; // Para os detalhes do veículo selecionado (totalSales, connected, etc.)
  vehicleData: any[] = []; // Para os dados da tabela (odometro, nivelCombustivel, etc.)

  constructor(private apiService: ApiService) { } // Injeta o serviço

  ngOnInit(): void {
    this.loadVehicles(); // Carrega a lista de veículos ao iniciar o componente
  }

  loadVehicles(): void {
    this.apiService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        // Opcional: Selecionar o primeiro veículo por padrão
        if (this.vehicles.length > 0) {
          this.selectedVehicleModel = this.vehicles[0].model;
          this.onVehicleSelect(); // Chama a função para carregar os detalhes do primeiro veículo
        }
      },
      error: (err) => {
        console.error('Erro ao carregar veículos:', err);
      }
    });
  }

  onVehicleSelect(): void {
    if (this.selectedVehicleModel) {
      // Busca os detalhes do veículo selecionado
      this.apiService.getVehicleDetailsByModel(this.selectedVehicleModel).subscribe({
        next: (details) => {
          // A API getVehicleDetailsByModel retorna um array, pegamos o primeiro item
          this.selectedVehicleDetails = details[0];
          if (this.selectedVehicleDetails && this.selectedVehicleDetails.vinCode) {
            // Busca os dados da tabela com base no VIN do veículo selecionado
            this.apiService.getVehicleData(this.selectedVehicleDetails.vinCode).subscribe({
              next: (data) => {
                this.vehicleData = data;
              },
              error: (err) => {
                console.error('Erro ao carregar dados do veículo:', err);
              }
            });
          }
        },
        error: (err) => {
          console.error('Erro ao carregar detalhes do veículo:', err);
        }
      });
    }
  }
}