import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestsViewComponent } from './admin-requests-view.component';

describe('AdminRequestsViewComponent', () => {
  let component: AdminRequestsViewComponent;
  let fixture: ComponentFixture<AdminRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRequestsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
