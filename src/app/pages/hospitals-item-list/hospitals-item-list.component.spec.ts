import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsItemListComponent } from './hospitals-item-list.component';

describe('HospitalsItemListComponent', () => {
  let component: HospitalsItemListComponent;
  let fixture: ComponentFixture<HospitalsItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalsItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
