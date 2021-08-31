import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewBotPopupComponent } from './create-new-bot-popup.component';

describe('CreateNewBotPopupComponent', () => {
  let component: CreateNewBotPopupComponent;
  let fixture: ComponentFixture<CreateNewBotPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewBotPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewBotPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
