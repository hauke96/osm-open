import { TestBed } from '@angular/core/testing';

import { OpeningHoursService } from './opening-hours.service';

describe('OpeningHoursService', () => {
  let service: OpeningHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
