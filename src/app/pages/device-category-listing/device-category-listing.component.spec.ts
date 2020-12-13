import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCategoryListingComponent } from './device-category-listing.component';

describe('DeviceCategoryListingComponent', () => {
  let component: DeviceCategoryListingComponent;
  let fixture: ComponentFixture<DeviceCategoryListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceCategoryListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCategoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
