import {Component, OnInit} from '@angular/core';
import {Vehicle} from "../model/vehicle";
import {VehicleService} from "./services/vehicle.service";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicles: Array<Vehicle> = null;
  vehicle: Vehicle;
  id: string;

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    this.getVehicles();
    console.log('id', this.id);
  }

  getVehicles() {
    this.vehicleService.getVehicles().subscribe(
      vehicle => {
        this.vehicles = vehicle;
        console.log()
      });
  }

  getVehicleById(id: number) {
    this.vehicleService.getVehicleById(id).subscribe(
      vehicle => {
        this.vehicle = vehicle;
        console.log()
      });
  }

  addVehicle(vehicle: Object) {
    this.vehicleService.addVehicle(vehicle).subscribe();
  }

  updateVehicle(id: number, value: any) {
    this.vehicleService.updateVehicle(id, value);
  }

  updateVehicleByColor(id: number, color: string) {
    this.vehicleService.updateVehicleByColor(id, color)
  }

  deleteVehicle(id: number) {
    this.vehicleService.deleteVehicle(id);
  }
}
