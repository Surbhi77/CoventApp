import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalIcuneedEditComponent } from './hospital-icuneed-edit.component';

describe('HospitalIcuneedEditComponent', () => {
  let component: HospitalIcuneedEditComponent;
  let fixture: ComponentFixture<HospitalIcuneedEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalIcuneedEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalIcuneedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
