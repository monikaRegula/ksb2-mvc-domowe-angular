import {Injectable} from '@angular/core';
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

  constructor(private http: HttpClient) {
  }

  getVehicles(): Observable<Array<Vehicle>> {
    return this.http.get<Array<Vehicle>>(`${this.baseUrl}`, httpOptions);
  }

  deleteVehicle(id: number): Observable<Vehicle> {
    console.log(`${this.baseUrl}/${id}`)
    return this.http.delete(`${this.baseUrl}/${id}`, httpOptions);
  }

  addVehicle(data: Object): Observable<Vehicle> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateVehicle(id: number, data: any): Observable<Vehicle> {
    return this.http.put(`${this.baseUrl}`, data);
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/${id}}`, httpOptions);
  }

  updateVehicleByColor(id: number, color: string): Observable<Vehicle> {
    return this.http.patch(`${this.baseUrl}/id/${id}/color/${color}`, httpOptions);
  }

  getVehiclesByProductionYearRange(start: number, end: number){
    return this.http.get<Array<Vehicle>>(`${this.baseUrl}/start/${start}/end/${end}`, httpOptions);
  }

}
