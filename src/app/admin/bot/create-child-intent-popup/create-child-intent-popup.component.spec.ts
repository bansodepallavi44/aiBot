import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChildIntentPopupComponent } from './create-child-intent-popup.component';

describe('CreateChildIntentPopupComponent', () => {
  let component: CreateChildIntentPopupComponent;
  let fixture: ComponentFixture<CreateChildIntentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChildIntentPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChildIntentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
