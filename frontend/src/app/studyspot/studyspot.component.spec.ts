import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyspotComponent } from './studyspot.component';

describe('StudyspotComponent', () => {
  let component: StudyspotComponent;
  let fixture: ComponentFixture<StudyspotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyspotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyspotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
