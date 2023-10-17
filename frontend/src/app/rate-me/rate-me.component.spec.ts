import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateMeComponent } from './rate-me.component';

describe('RateMeComponent', () => {
  let component: RateMeComponent;
  let fixture: ComponentFixture<RateMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateMeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
