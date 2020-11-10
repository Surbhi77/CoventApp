import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerListingComponent } from './reviewer-listing.component';

describe('ReviewerListingComponent', () => {
  let component: ReviewerListingComponent;
  let fixture: ComponentFixture<ReviewerListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewerListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
