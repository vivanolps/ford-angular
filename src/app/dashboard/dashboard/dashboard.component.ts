import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../services/api.service'; 
@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: any[] = []; // Para armazenar a lista de veículos para o seletor
  selectedVehicleModel: string | undefined; // Para o modelo selecionado no dropdown
  selectedVehicleDetails: any; // Para os detalhes do veículo selecionado (totalSales, connected, etc.)
  vehicleData: any[] = []; // Para os dados da tabela (odometro, nivelCombustivel, etc.)
  vinSearchTerm: string = ''; // Para o campo de busca da tabela (Passo 11)

  constructor(private apiService: ApiService) { } 

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
          this.selectedVehicleDetails = Array.isArray(details) ? details[0] : details; // Adicionando verificação para array

          if (this.selectedVehicleDetails && this.selectedVehicleDetails.vinCode) {
            // Busca os dados da tabela com base no VIN do veículo selecionado
            this.loadVehicleData(this.selectedVehicleDetails.vinCode);
          } else {
            this.vehicleData = []; // Limpa a tabela se não houver VIN ou detalhes
          }
        },
        error: (err) => {
          console.error('Erro ao carregar detalhes do veículo:', err);
        }
      });
    }
  }

  loadVehicleData(vinCode: string): void {
    this.apiService.getVehicleData(vinCode).subscribe({
      next: (data) => {
        this.vehicleData = data;
      },
      error: (err) => {
        console.error('Erro ao carregar dados da tabela do veículo:', err);
      }
    });
  }

  // Função para filtrar os dados da tabela (Passo 11)
  filterTableData(): any[] {
    if (!this.vinSearchTerm || this.vinSearchTerm.trim() === '') {
      return this.vehicleData;
    }
    // Supondo que 'codigoVin' é a propriedade para busca
    return this.vehicleData.filter(item =>
      item.codigoVin.toLowerCase().includes(this.vinSearchTerm.toLowerCase())
    );
  }
}