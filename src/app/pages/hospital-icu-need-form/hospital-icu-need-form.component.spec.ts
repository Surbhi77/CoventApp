import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalIcuNeedFormComponent } from './hospital-icu-need-form.component';

describe('HospitalIcuNeedFormComponent', () => {
  let component: HospitalIcuNeedFormComponent;
  let fixture: ComponentFixture<HospitalIcuNeedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalIcuNeedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalIcuNeedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
