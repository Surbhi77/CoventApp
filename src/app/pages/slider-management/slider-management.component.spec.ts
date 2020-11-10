import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderManagementComponent } from './slider-management.component';

describe('SliderManagementComponent', () => {
  let component: SliderManagementComponent;
  let fixture: ComponentFixture<SliderManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
