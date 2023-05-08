import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehicle} from "../../model/vehicle";

const httpOptions = {
  headers: new HttpHeaders({
    'Content_Type': 'application/json'
  })

};
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseUrl = "http://localhost:8080/vehicles";

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Array<Vehicle>>{
    return this.http.get<Array<Vehicle>>(`${this.baseUrl}`, httpOptions);
  }

  getVehicleById(id: number): Observable<Vehicle>{
    return this.http.get<Vehicle>(`${this.baseUrl}/${id}}`, httpOptions);
  }

  addVehicle(vehicle: Object): Observable<Vehicle> {
    return this.http.post(`${this.baseUrl}`, vehicle);
  }

  updateVehicle(id: number, value: any): Observable<Vehicle> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  updateVehicleByColor(id: number, color: string): Observable<Vehicle> {
    return this.http.patch(`${this.baseUrl}/id/${id}/color/${color}`, httpOptions);
  }

  deleteVehicle(id: number): Observable<Vehicle> {
    return this.http.delete(`${this.baseUrl}/${id}`, httpOptions);
  }

}
