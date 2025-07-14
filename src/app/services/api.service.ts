// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3002'; // Certifique-se de que esta URL está correta

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<any[]> {
    // Este endpoint deve retornar a lista de veículos (Mustang, Ranger, etc.)
    return this.http.get<any[]>(`${this.baseUrl}/vehicle`);
  }

  // ESTE MÉTODO DEVE RETORNAR TODOS OS DADOS DA TABELA DO db.json
  getVehicleData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/vehicleData`); // Pega todos os dados da tabela
  }

  // Se você tiver um método para buscar detalhes por modelo, ele pode ser assim:
  getVehicleDetailsByModel(model: string): Observable<any> {
    // O json-server permite filtrar por query parameters
    // Ex: http://localhost:3002/vehicle?model=Mustang
    return this.http.get<any[]>(`${this.baseUrl}/vehicle?model=${model}`);
  }
}