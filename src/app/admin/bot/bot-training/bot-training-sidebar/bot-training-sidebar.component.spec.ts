import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotTrainingSidebarComponent } from './bot-training-sidebar.component';

describe('BotTrainingSidebarComponent', () => {
  let component: BotTrainingSidebarComponent;
  let fixture: ComponentFixture<BotTrainingSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotTrainingSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotTrainingSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
