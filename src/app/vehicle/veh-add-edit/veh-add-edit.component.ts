import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {VehicleService} from "../services/vehicle.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './veh-add-edit.component.html',
  styleUrls: ['./veh-add-edit.component.css']
})
export class VehAddEditComponent implements OnInit {
  vehForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private _vehService: VehicleService,
              private _dialogRef: MatDialogRef<VehAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.vehForm = this._fb.group({
      id: '',
      mark: '',
      model: '',
      color: '',
      productionDate: ''
    })
  }

  ngOnInit() {
    this.vehForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.vehForm.valid) {
      if (this.data) {
        console.log('onFormSubmit: ' + this.vehForm.value);
        this._vehService.updateVehicle(this.data.id, this.vehForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Vehicle updated successfully!')
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
          })
      } else {
        console.log('onFormSubmit: ' + this.vehForm.value);
        this._vehService.addVehicle(this.vehForm.value).subscribe({
          next: (val: any) => {
            alert('Vehicle added successfully!')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }

    }
  }
}
