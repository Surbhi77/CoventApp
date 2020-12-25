import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyreviewEditComponent } from './myreview-edit.component';

describe('MyreviewEditComponent', () => {
  let component: MyreviewEditComponent;
  let fixture: ComponentFixture<MyreviewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyreviewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyreviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
