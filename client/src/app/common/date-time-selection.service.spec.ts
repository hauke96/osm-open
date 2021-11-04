import { TestBed } from '@angular/core/testing';

import { DateTimeSelectionService } from './date-time-selection.service';

describe('DateTimeSelectionService', () => {
  let service: DateTimeSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateTimeSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
