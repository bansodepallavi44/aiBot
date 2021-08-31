import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotFlowChartComponent } from './bot-flow-chart.component';

describe('BotFlowChartComponent', () => {
  let component: BotFlowChartComponent;
  let fixture: ComponentFixture<BotFlowChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotFlowChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotFlowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
