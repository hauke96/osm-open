import { DateTimeSelectionService } from './date-time-selection.service';

describe(DateTimeSelectionService.name, () => {
  let service: DateTimeSelectionService;

  beforeEach(() => {
    service = new DateTimeSelectionService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('with subscription', () => {
    let spy: jest.Mock;

    beforeEach(() => {
      spy = jest.fn();
      service.dateTimeSelected.subscribe(spy);
    });

    it('should publish selected date', () => {
      const expectedDate = new Date('2021-11-13 13:41:55');
      service.selectDateTime(expectedDate);

      expect(spy).toHaveBeenCalledWith(expectedDate);
    });

    it('should publish undefined on reset', () => {
      service.resetSelectedDateTime();

      expect(spy).toHaveBeenCalledWith(undefined);
    });
  });
});
