import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedSpotViewComponent } from './requested-spot-view.component';

describe('RequestedSpotViewComponent', () => {
  let component: RequestedSpotViewComponent;
  let fixture: ComponentFixture<RequestedSpotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedSpotViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestedSpotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
