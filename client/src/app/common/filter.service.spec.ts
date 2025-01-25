import { FilterService } from './filter.service';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

describe(FilterService.name, () => {
  let service: FilterService;

  beforeEach(() => {
    service = new FilterService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('with subscription', () => {
    let spy: jest.Mock;

    beforeEach(() => {
      spy = jest.fn();
      service.filtered.subscribe(spy);
    });

    it('should publish selected date', () => {
      const expectedFunction = (): boolean => true;
      service.filter(expectedFunction);

      expect(spy).toHaveBeenCalledWith(expectedFunction);
    });
  });

  [true, false].forEach((expectedIsRegex: boolean) => {
    describe('with ' + expectedIsRegex ? 'regex' : 'normal' + ' tag', () => {
      let key: string;
      let value: string;
      let isRegex: boolean;

      let expectedKey: string;
      let expectedValue: string;

      beforeEach(() => {
        expectedKey = 'my_very';
        expectedValue = 'great_tag';

        const delimiter = expectedIsRegex ? '~' : '=';

        const tag = expectedKey + delimiter + expectedValue;

        key = service.getKey(tag);
        value = service.getValue(tag);
        isRegex = service.isRegex(tag);
      });

      it('should get key correct', () => {
        expect(key).toEqual(expectedKey);
      });

      it('should get value correct', () => {
        expect(value).toEqual(expectedValue);
      });

      it('should get isRegex correct', () => {
        expect(isRegex).toEqual(expectedIsRegex);
      });
    });
  });
});
