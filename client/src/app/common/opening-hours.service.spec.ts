import { OpeningHoursService } from './opening-hours.service';

describe(OpeningHoursService.name, () => {
  let service: OpeningHoursService;

  beforeEach(() => {
    service = new OpeningHoursService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
