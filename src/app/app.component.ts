import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EmpAddEditComponent} from "./vehicle/emp-add-edit/emp-add-edit.component";
import {VehicleService} from "./vehicle/services/vehicle.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Vehicle} from "./model/vehicle";

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
    'action'
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
    // console.log(this.getVehicles());
    // this.dataSource = new MatTableDataSource(this.vehicles);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // openAddEmitEmpForm() {
  //   this._dialog.open(EmpAddEditComponent);
  // }

  openAddEmitEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
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
        console.log(res);
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

  // getVehicleById(id: number) {
  //   this._vehService.getVehicleById(id).subscribe(
  //     vehicle => {
  //       this.vehicle = vehicle;
  //       console.log()
  //     });
  // }

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
        this.getVehicles();
    alert('Vehicle deleted!')
    },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
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
