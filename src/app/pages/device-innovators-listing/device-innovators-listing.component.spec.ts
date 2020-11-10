import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInnovatorsListingComponent } from './device-innovators-listing.component';

describe('DeviceInnovatorsListingComponent', () => {
  let component: DeviceInnovatorsListingComponent;
  let fixture: ComponentFixture<DeviceInnovatorsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInnovatorsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInnovatorsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
