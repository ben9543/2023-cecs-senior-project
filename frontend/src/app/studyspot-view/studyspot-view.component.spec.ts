import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyspotViewComponent } from './studyspot-view.component';

describe('StudyspotViewComponent', () => {
  let component: StudyspotViewComponent;
  let fixture: ComponentFixture<StudyspotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyspotViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyspotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
