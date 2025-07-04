import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para ngIf, ngFor
import { FormsModule } from '@angular/forms'; // Para ngModel no seletor

import { ApiService } from '../../services/api.service'; // <--- MUITO IMPORTANTE: APONTA PARA O SERVIÇO

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importe CommonModule e FormsModule aqui
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: any[] = [];
  selectedVehicleModel: string | undefined;
  selectedVehicleDetails: any;
  vehicleData: any[] = [];
  vinSearchTerm: string = '';

  constructor(private apiService: ApiService) { } // Injeta o serviço

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.apiService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        if (this.vehicles.length > 0) {
          this.selectedVehicleModel = this.vehicles[0].model;
          this.onVehicleSelect();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar veículos:', err);
      }
    });
  }

  onVehicleSelect(): void {
    if (this.selectedVehicleModel) {
      this.apiService.getVehicleDetailsByModel(this.selectedVehicleModel).subscribe({
        next: (details) => {
          this.selectedVehicleDetails = Array.isArray(details) ? details[0] : details;

          if (this.selectedVehicleDetails && this.selectedVehicleDetails.vinCode) {
            this.loadVehicleData(this.selectedVehicleDetails.vinCode);
          } else {
            this.vehicleData = [];
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

  filterTableData(): any[] {
    if (!this.vinSearchTerm || this.vinSearchTerm.trim() === '') {
      return this.vehicleData;
    }
    return this.vehicleData.filter(item =>
      item.codigoVin.toLowerCase().includes(this.vinSearchTerm.toLowerCase())
    );
  }
}