import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteAddEditComponent } from './note-add-edit.component';

describe('EmpAddEditComponent', () => {
  let component: NoteAddEditComponent;
  let fixture: ComponentFixture<NoteAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteAddEditComponent]
    });
    fixture = TestBed.createComponent(NoteAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
