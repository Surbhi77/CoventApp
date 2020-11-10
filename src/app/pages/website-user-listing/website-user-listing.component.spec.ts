import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteUserListingComponent } from './website-user-listing.component';

describe('WebsiteUserListingComponent', () => {
  let component: WebsiteUserListingComponent;
  let fixture: ComponentFixture<WebsiteUserListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteUserListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteUserListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
