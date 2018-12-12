import { TestBed } from '@angular/core/testing';

import { JobapplicationService } from './jobapplication.service';

describe('JobapplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobapplicationService = TestBed.get(JobapplicationService);
    expect(service).toBeTruthy();
  });
});
