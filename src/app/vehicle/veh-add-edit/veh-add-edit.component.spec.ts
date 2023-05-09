import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehAddEditComponent } from './veh-add-edit.component';

describe('EmpAddEditComponent', () => {
  let component: VehAddEditComponent;
  let fixture: ComponentFixture<VehAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehAddEditComponent]
    });
    fixture = TestBed.createComponent(VehAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
