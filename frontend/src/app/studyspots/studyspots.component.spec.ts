import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyspotsComponent } from './studyspots.component';

describe('StudyspotsComponent', () => {
  let component: StudyspotsComponent;
  let fixture: ComponentFixture<StudyspotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyspotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyspotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
