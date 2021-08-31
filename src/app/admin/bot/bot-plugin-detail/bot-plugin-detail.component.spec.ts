import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotPluginDetailComponent } from './bot-plugin-detail.component';

describe('BotPluginDetailComponent', () => {
  let component: BotPluginDetailComponent;
  let fixture: ComponentFixture<BotPluginDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotPluginDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotPluginDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
