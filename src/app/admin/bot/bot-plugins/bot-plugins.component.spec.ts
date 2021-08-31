import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotPluginsComponent } from './bot-plugins.component';

describe('BotPluginsComponent', () => {
  let component: BotPluginsComponent;
  let fixture: ComponentFixture<BotPluginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotPluginsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotPluginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
