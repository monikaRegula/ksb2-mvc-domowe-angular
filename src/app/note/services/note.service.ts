import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Note} from "../../app.component";

const httpOptions = {
  headers: new HttpHeaders({
    'Content_Type': 'application/json'
  })

};

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private baseUrl = "http://localhost:8080/notes";

  constructor(private http: HttpClient) {
  }

  getNotes(): Observable<Array<Note>> {
    return this.http.get<Array<Note>>(`${this.baseUrl}`, httpOptions);
  }

  addNote(data: Object): Observable<Note> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateNote(id: number, data: any): Observable<Note> {
    return this.http.put(`${this.baseUrl}/id/${id}`, data);
  }


}
