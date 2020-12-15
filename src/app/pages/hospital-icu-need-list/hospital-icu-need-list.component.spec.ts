import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalIcuNeedListComponent } from './hospital-icu-need-list.component';

describe('HospitalIcuNeedListComponent', () => {
  let component: HospitalIcuNeedListComponent;
  let fixture: ComponentFixture<HospitalIcuNeedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalIcuNeedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalIcuNeedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
