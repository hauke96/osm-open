import { OpeningHoursService } from './opening-hours.service';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';
import OpeningHours from 'opening_hours';

describe(OpeningHoursService.name, () => {
  let service: OpeningHoursService;

  beforeEach(() => {
    service = new OpeningHoursService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('with correct opening hours', () => {
    let feature: Feature<Geometry>;

    beforeEach(() => {
      feature = new Feature<Geometry>();
    });

    describe('with opening hours object', () => {
      let openingHoursString: string;
      let openingHours: OpeningHours | undefined;

      beforeEach(() => {
        openingHoursString = 'Mo 10:00-18:00';
        feature.set('opening_hours', openingHoursString);

        openingHours = service.getOpeningHours(feature);
      });

      it('should get raw opening hours string', () => {
        expect(service.getOpeningHoursString(feature)).toEqual(openingHoursString);
      });

      it('should not return undefined', () => {
        expect(openingHours).not.toBeUndefined();
      });

      it('should get correct opening hours object', () => {
        expect(openingHours?.getState(new Date('2021-11-15T09:59:59'))).toEqual(false);
        expect(openingHours?.getState(new Date('2021-11-15T10:00:00'))).toEqual(true);
        expect(openingHours?.getState(new Date('2021-11-15T17:59:59'))).toEqual(true);
        expect(openingHours?.getState(new Date('2021-11-15T18:59:00'))).toEqual(false);
      });

      it('should get correct isOpen state', () => {
        let date = new Date('2021-11-15T09:59:59');
        expect(openingHours?.getState(date)).toEqual(service.isOpen(feature, date));

        date = new Date('2021-11-15T10:00:00');
        expect(openingHours?.getState(date)).toEqual(service.isOpen(feature, date));

        date = new Date('2021-11-15T17:59:59');
        expect(openingHours?.getState(date)).toEqual(service.isOpen(feature, date));

        date = new Date('2021-11-15T18:59:00');
        expect(openingHours?.getState(date)).toEqual(service.isOpen(feature, date));
      });
    });

    describe('with faulty opening hours object', () => {
      let openingHours: OpeningHours | undefined;

      beforeEach(() => {
        feature.set('opening_hours', 'foo bar');

        openingHours = service.getOpeningHours(feature);
      });

      it('should not create opening hours object', () => {
        expect(openingHours).toBeUndefined();
      });

      it('should always be closed', () => {
        const date = new Date('2021-11-15T00:00:00');

        // Go through the whole week in 5-minute steps
        for (let i = 0; i < ((24 * 60) / 5) * 7; i++) {
          date.setMinutes(date.getMinutes() + 5);
          expect(service.isOpen(feature, date)).toBe(false);
        }
      });
    });
  });
});
