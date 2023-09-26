import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserratingComponent } from './userrating.component';

describe('UserratingComponent', () => {
  let component: UserratingComponent;
  let fixture: ComponentFixture<UserratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserratingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
