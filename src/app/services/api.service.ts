import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Altere as portas aqui para a que você usou no JSON Server (ex: 3002)
  private vehicleApiUrl = 'http://localhost:3002/vehicle';
  private vehicleDataApiUrl = 'http://localhost:3002/vehicleData';

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