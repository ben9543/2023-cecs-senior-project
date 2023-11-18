import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedSpotsComponent } from './requested-spots.component';

describe('RequestedSpotsComponent', () => {
  let component: RequestedSpotsComponent;
  let fixture: ComponentFixture<RequestedSpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedSpotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestedSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
