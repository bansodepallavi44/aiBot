import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewUserPopupComponent } from './add-new-user-popup.component';

describe('AddNewUserPopupComponent', () => {
  let component: AddNewUserPopupComponent;
  let fixture: ComponentFixture<AddNewUserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewUserPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
