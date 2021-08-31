import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUsersPopupComponent } from './select-users-popup.component';

describe('SelectUsersPopupComponent', () => {
  let component: SelectUsersPopupComponent;
  let fixture: ComponentFixture<SelectUsersPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectUsersPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUsersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
