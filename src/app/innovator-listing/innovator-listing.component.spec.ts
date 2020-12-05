import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovatorListingComponent } from './innovator-listing.component';

describe('InnovatorListingComponent', () => {
  let component: InnovatorListingComponent;
  let fixture: ComponentFixture<InnovatorListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnovatorListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovatorListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
