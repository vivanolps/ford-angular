import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para ngIf, ngFor
import { FormsModule } from '@angular/forms'; // Para ngModel no seletor
import { forkJoin } from 'rxjs'; // Importar forkJoin para sincronizar chamadas

import { ApiService } from '../../services/api.service'; // <--- MUITO IMPORTANTE: APONTA PARA O SERVIÇO

// Interfaces para tipagem dos dados (boas práticas!)
interface VehicleDetails {
  id: number;
  model: string;
  totalSales: number;
  connected: number;
  softwareUpdated: number;
  vinCode: string;
  imageUrl: string;
}

interface VehicleTableData {
  id: number;
  codigoVin: string;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: VehicleDetails[] = []; // Lista de detalhes de todos os veículos
  selectedVehicleModel: string | undefined; // Modelo do veículo selecionado no dropdown
  selectedVehicleDetails: VehicleDetails | undefined; // Detalhes completos do veículo selecionado
  allVehicleTableData: VehicleTableData[] = []; // **TODOS** os dados da tabela de veículos do db.json
  displayedVehicleTableData: VehicleTableData[] = []; // Dados da tabela para o veículo selecionado
  vinSearchTerm: string = ''; // Termo de busca para a tabela

  constructor(private apiService: ApiService) { } // Injeta o serviço

  ngOnInit(): void {
    console.log('ngOnInit: Iniciando carregamento de dados...');
    // Usa forkJoin para esperar que ambas as chamadas da API sejam concluídas
    forkJoin([
      this.apiService.getVehicles(), // Observable que retorna os detalhes dos veículos
      this.apiService.getVehicleData() // Observable que retorna todos os dados da tabela
    ]).subscribe({
      next: ([vehiclesData, tableData]) => {
        console.log('forkJoin: Dados de veículos (vehiclesData) recebidos:', vehiclesData);
        console.log('forkJoin: Dados da tabela (allVehicleTableData) recebidos:', tableData);
        console.log('forkJoin: Quantidade de veículos:', vehiclesData.length);
        console.log('forkJoin: Quantidade de dados da tabela (allVehicleTableData):', tableData.length);


        this.vehicles = vehiclesData; // Popula a lista de veículos
        this.allVehicleTableData = tableData; // Popula todos os dados da tabela

        // Agora que AMBOS os dados estão carregados, podemos definir o veículo padrão
        // e atualizar os dados da tabela exibidos com segurança.
        if (this.vehicles.length > 0) {
          this.selectedVehicleModel = this.vehicles[0].model; // Define o primeiro veículo (Mustang) como padrão
          console.log('forkJoin: Definindo veículo padrão como:', this.selectedVehicleModel);
          this.onVehicleSelect(); // Chama para carregar os detalhes e filtrar os dados da tabela
        } else {
          console.warn('forkJoin: Nenhuma lista de veículos carregada. Verifique o endpoint /vehicle no db.json.');
        }
      },
      error: (err) => {
        console.error('forkJoin: Erro ao carregar dados iniciais do dashboard:', err);
        // Trate o erro de forma adequada na UI, se necessário
      }
    });
  }

  onVehicleSelect(): void {
    console.log('onVehicleSelect: Veículo selecionado no dropdown:', this.selectedVehicleModel);
    if (this.selectedVehicleModel) {
      // Encontra os detalhes completos do veículo selecionado na lista 'vehicles'
      this.selectedVehicleDetails = this.vehicles.find(v => v.model === this.selectedVehicleModel);

      if (this.selectedVehicleDetails) {
        console.log('onVehicleSelect: Detalhes do veículo selecionado:', this.selectedVehicleDetails);
        console.log('onVehicleSelect: VIN Code para filtrar:', this.selectedVehicleDetails.vinCode);
        this.updateDisplayedTableData(this.selectedVehicleDetails.vinCode);
      } else {
        console.warn('onVehicleSelect: Detalhes do veículo não encontrados para o modelo:', this.selectedVehicleModel);
        this.displayedVehicleTableData = []; // Limpa se não encontrar detalhes
      }
    } else {
      console.warn('onVehicleSelect: Nenhum modelo de veículo selecionado.');
      this.selectedVehicleDetails = undefined;
      this.displayedVehicleTableData = []; // Limpa se nada estiver selecionado
    }
    this.vinSearchTerm = ''; // Limpa o termo de busca ao trocar de veículo
  }

  updateDisplayedTableData(vinCodeToFilter: string): void {
    console.log('updateDisplayedTableData: Iniciando filtragem para VIN:', vinCodeToFilter);
    console.log('updateDisplayedTableData: allVehicleTableData antes da filtragem (deve ter todos os dados):', this.allVehicleTableData);

    // Garante que allVehicleTableData seja um array antes de tentar filtrar
    const dataToFilter = this.allVehicleTableData || [];

    this.displayedVehicleTableData = dataToFilter.filter(item => {
      // Adicionar logs dentro do filtro para ver cada item sendo comparado
      console.log(`  Comparando item.codigoVin: '${item.codigoVin}' com vinCodeToFilter: '${vinCodeToFilter}'`);
      return item.codigoVin === vinCodeToFilter;
    });
    console.log('updateDisplayedTableData: displayedVehicleTableData após filtragem:', this.displayedVehicleTableData);

    this.filterTableData(); // Chama o filtro de busca se houver um termo
  }

  filterTableData(): VehicleTableData[] {
    console.log('filterTableData: Chamado. Termo de busca:', this.vinSearchTerm);
    console.log('filterTableData: displayedVehicleTableData atual (base para filtro):', this.displayedVehicleTableData);

    // Garante que displayedVehicleTableData seja um array antes de tentar filtrar
    const dataToFilter = this.displayedVehicleTableData || [];

    if (!this.vinSearchTerm || this.vinSearchTerm.trim() === '') {
      return dataToFilter;
    }
    return dataToFilter.filter(item =>
      item.codigoVin.toLowerCase().includes(this.vinSearchTerm.toLowerCase())
    );
  }
}
