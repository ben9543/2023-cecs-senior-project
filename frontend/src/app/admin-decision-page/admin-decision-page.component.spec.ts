import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDecisionPageComponent } from './admin-decision-page.component';

describe('AdminDecisionPageComponent', () => {
  let component: AdminDecisionPageComponent;
  let fixture: ComponentFixture<AdminDecisionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDecisionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDecisionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
