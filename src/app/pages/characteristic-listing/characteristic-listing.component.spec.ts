import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicListingComponent } from './characteristic-listing.component';

describe('CharacteristicListingComponent', () => {
  let component: CharacteristicListingComponent;
  let fixture: ComponentFixture<CharacteristicListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacteristicListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacteristicListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
