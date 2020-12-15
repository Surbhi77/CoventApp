import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalItemEditComponent } from './hospital-item-edit.component';

describe('HospitalItemEditComponent', () => {
  let component: HospitalItemEditComponent;
  let fixture: ComponentFixture<HospitalItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalItemEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
