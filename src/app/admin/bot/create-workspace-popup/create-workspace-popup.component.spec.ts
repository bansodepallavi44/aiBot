import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkspacePopupComponent } from './create-workspace-popup.component';

describe('CreateWorkspacePopupComponent', () => {
  let component: CreateWorkspacePopupComponent;
  let fixture: ComponentFixture<CreateWorkspacePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkspacePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkspacePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
