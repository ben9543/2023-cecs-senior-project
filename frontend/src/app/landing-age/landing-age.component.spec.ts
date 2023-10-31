import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingAgeComponent } from './landing-age.component';

describe('LandingAgeComponent', () => {
  let component: LandingAgeComponent;
  let fixture: ComponentFixture<LandingAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingAgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
