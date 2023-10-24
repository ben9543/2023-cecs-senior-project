import { TestBed } from '@angular/core/testing';

import { StudyspotService } from './studyspot.service';

describe('StudyspotService', () => {
  let service: StudyspotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyspotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
