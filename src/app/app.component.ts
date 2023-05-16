import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {VehAddEditComponent} from "./vehicle/veh-add-edit/veh-add-edit.component";
import {VehicleService} from "./vehicle/services/vehicle.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Vehicle} from "./model/vehicle";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'mark',
    'model',
    'color',
    'productionDate'
  ];

  dataSource: MatTableDataSource<Vehicle>;

  vehicles: Array<Vehicle> = null;
  vehicle: Vehicle;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _vehService: VehicleService) {
  }

  ngOnInit(): void {
    this.getVehicles();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEmitEmpForm() {
    const dialogRef = this._dialog.open(VehAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVehicles();
        }
      },
    });
  }

  getVehicles() {
    this._vehService.getVehicles().subscribe({
      next: (res) => {
        console.log('getVehicles : ' +res);
        this.vehicles = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.log(err)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addVehicle(vehicle: Object) {
    this._vehService.addVehicle(vehicle).subscribe();
  }

  updateVehicle(id: number, value: any) {
    this._vehService.updateVehicle(id, value);
  }

  updateVehicleByColor(id: number, color: string) {
    this._vehService.updateVehicleByColor(id, color)
  }

  deleteVehicle(id: number) {
    this._vehService.deleteVehicle(id).subscribe({
      next: (res)=> {
        console.log(this.vehicles)
      this.getVehicles();
    alert('Vehicle deleted!')
    },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(VehAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVehicles();
        }
      },
    });
  }

}
