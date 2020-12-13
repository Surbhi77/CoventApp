import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsUsersComponent } from './hospitals-users.component';

describe('HospitalsUsersComponent', () => {
  let component: HospitalsUsersComponent;
  let fixture: ComponentFixture<HospitalsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalsUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
