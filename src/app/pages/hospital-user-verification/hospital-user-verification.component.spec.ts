import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalUserVerificationComponent } from './hospital-user-verification.component';

describe('HospitalUserVerificationComponent', () => {
  let component: HospitalUserVerificationComponent;
  let fixture: ComponentFixture<HospitalUserVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalUserVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalUserVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
