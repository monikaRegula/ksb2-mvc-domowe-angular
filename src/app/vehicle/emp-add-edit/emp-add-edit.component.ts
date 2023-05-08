import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {VehicleService} from "../services/vehicle.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent {
  empForm: FormGroup;

  constructor(private _fb: FormBuilder, private _empServic: VehicleService, private _dialogRef: DialogRef<EmpAddEditComponent>) {
    this.empForm = this._fb.group({
      id: '',
      mark: '',
      model: '',
      color: ''
    })
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value);
      this._empServic.addVehicle(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Vehicle added successfully!')
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }
}
