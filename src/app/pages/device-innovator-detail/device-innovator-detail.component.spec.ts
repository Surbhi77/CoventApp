import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInnovatorDetailComponent } from './device-innovator-detail.component';

describe('DeviceInnovatorDetailComponent', () => {
  let component: DeviceInnovatorDetailComponent;
  let fixture: ComponentFixture<DeviceInnovatorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceInnovatorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInnovatorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
