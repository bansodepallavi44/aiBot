import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotSidebarComponent } from './bot-sidebar.component';

describe('BotSidebarComponent', () => {
  let component: BotSidebarComponent;
  let fixture: ComponentFixture<BotSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
