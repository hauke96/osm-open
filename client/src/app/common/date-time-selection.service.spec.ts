import { DateTimeSelectionService } from './date-time-selection.service';

describe(DateTimeSelectionService.name, () => {
  let service: DateTimeSelectionService;

  beforeEach(() => {
    service = new DateTimeSelectionService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
