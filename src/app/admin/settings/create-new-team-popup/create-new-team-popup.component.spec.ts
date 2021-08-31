import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTeamPopupComponent } from './create-new-team-popup.component';

describe('CreateNewTeamPopupComponent', () => {
  let component: CreateNewTeamPopupComponent;
  let fixture: ComponentFixture<CreateNewTeamPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewTeamPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewTeamPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
