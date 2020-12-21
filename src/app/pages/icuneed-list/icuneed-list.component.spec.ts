import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcuneedListComponent } from './icuneed-list.component';

describe('IcuneedListComponent', () => {
  let component: IcuneedListComponent;
  let fixture: ComponentFixture<IcuneedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcuneedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcuneedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
