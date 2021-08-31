import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamUserPopupComponent } from './add-team-user-popup.component';

describe('AddTeamUserPopupComponent', () => {
  let component: AddTeamUserPopupComponent;
  let fixture: ComponentFixture<AddTeamUserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeamUserPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
