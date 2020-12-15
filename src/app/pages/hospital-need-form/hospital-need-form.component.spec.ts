import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalNeedFormComponent } from './hospital-need-form.component';

describe('HospitalNeedFormComponent', () => {
  let component: HospitalNeedFormComponent;
  let fixture: ComponentFixture<HospitalNeedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalNeedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalNeedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
