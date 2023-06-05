import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NoteService} from "../services/note.service";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './note-add-edit.component.html',
  styleUrls: ['./note-add-edit.component.css']
})
export class NoteAddEditComponent implements OnInit {
  noteForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private _noteService: NoteService,
              private _dialogRef: MatDialogRef<NoteAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.noteForm = this._fb.group({
      id: '',
      title: '',
      input: '',
    })
  }

  ngOnInit() {
    this.noteForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.noteForm.valid) {
      if (this.data) {
        console.log('onFormSubmit: ' + this.noteForm.value);
        this._noteService.updateNote(this.data.id, this.noteForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Note updated successfully!')
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            }
          })
      } else {
        console.log('onFormSubmit: ' + this.noteForm.value);
        console.log(this.noteForm.value)
        this._noteService.addNote(this.noteForm.value).subscribe({
          next: (val: any) => {
            alert('Note added successfully!')
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
