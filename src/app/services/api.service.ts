import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService { // <--- MUITO IMPORTANTE: COMEÇA COM 'export class ApiService'
  private vehicleApiUrl = 'http://localhost:3002/vehicle'; // Verifique se a porta é 3002
  private vehicleDataApiUrl = 'http://localhost:3002/vehicleData'; // Verifique se a porta é 3002

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.vehicleApiUrl);
  }

  getVehicleData(vinCode: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.vehicleDataApiUrl}?codigoVin=${vinCode}`);
  }

  getVehicleDetailsByModel(modelName: string): Observable<any> {
    return this.http.get<any[]>(`${this.vehicleApiUrl}?model=${modelName}`);
  }
}