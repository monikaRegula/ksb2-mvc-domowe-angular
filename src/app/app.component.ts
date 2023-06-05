import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NoteService} from "./note/services/note.service";
import {NoteAddEditComponent} from "./note/note-add-edit/note-add-edit.component";


export class Note {
  id?: number;
  input?: string;
  title?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'input',
    'action'
  ];

  dataSource: MatTableDataSource<Note>;

  Notes: Array<Note> = null;
  Note: Note;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _vehService: NoteService) {
  }

  ngOnInit(): void {
    this.getNotes();
  }


  openAddEmitEmpForm() {
    const dialogRef = this._dialog.open(NoteAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getNotes();
        }
      },
    });
  }

  getNotes() {
    this._vehService.getNotes().subscribe({
      next: (res) => {
        console.log('getNotes : ' + res);
        this.Notes = res;
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => console.log(err)
    });
  }


  openEditForm(data: any) {
    const dialogRef = this._dialog.open(NoteAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getNotes();
        }
      },
    });
  }

}
