import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotTrainingComponent } from './bot-training.component';

describe('BotTrainingComponent', () => {
  let component: BotTrainingComponent;
  let fixture: ComponentFixture<BotTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
