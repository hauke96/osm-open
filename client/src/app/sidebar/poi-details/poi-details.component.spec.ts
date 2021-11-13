import { PoiDetailsComponent } from './poi-details.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';
import { OpeningHoursService } from '../../common/opening-hours.service';
import { DateTimeSelectionService } from '../../common/date-time-selection.service';
import { Subject } from 'rxjs';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { PoiService } from '../../map/poi.service';

describe('PoiDetailsComponent', () => {
  let component: PoiDetailsComponent;
  let fixture: MockedComponentFixture<PoiDetailsComponent>;
  let poiService: PoiService;
  let openingHoursService: OpeningHoursService;
  let dateTimeSelectionService: DateTimeSelectionService;

  let poiSelectedSubject: Subject<Feature<Point> | undefined>;
  let dateTimeSelectedSubject: Subject<Date | undefined>;

  beforeEach(() => {
    poiSelectedSubject = new Subject<Feature<Point> | undefined>();
    dateTimeSelectedSubject = new Subject<Date | undefined>();

    poiService = {
      poiSelected: poiSelectedSubject.asObservable(),
    } as unknown as PoiService;
    openingHoursService = {} as OpeningHoursService;
    dateTimeSelectionService = {
      dateTimeSelected: dateTimeSelectedSubject.asObservable(),
    } as unknown as DateTimeSelectionService;

    return MockBuilder(PoiDetailsComponent, AppModule)
      .provide({ provide: PoiService, useFactory: () => poiService })
      .provide({ provide: OpeningHoursService, useFactory: () => openingHoursService })
      .provide({ provide: DateTimeSelectionService, useFactory: () => dateTimeSelectionService });
  });

  beforeEach(() => {
    fixture = MockRender(PoiDetailsComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [
    ['website', 'foo.com'],
    ['contact:website', 'foo.com'],
  ].forEach(([websiteKey, websiteValue]: string[]) => {
    describe('with selected feature', () => {
      let feature: Feature<Point>;
      let featureName: string;
      let featureType: string;
      let featureId: string;
      let featureOpeningHours: string;
      let expectedIsOpen: boolean;

      beforeEach(() => {
        featureName = 'Foo Store';
        featureType = 'node';
        featureId = '192837465';
        featureOpeningHours = 'Mo-Fr 10:00-18:00';
        expectedIsOpen = true;

        feature = new Feature<Point>(new Point([1, 2]));
        feature.set('name', featureName);
        feature.set('@type', featureType);
        feature.set('@id', featureId);
        feature.set('opening_hours', featureOpeningHours);
        feature.set(websiteKey, websiteValue);

        openingHoursService.getOpeningHoursString = jest.fn().mockReturnValue(featureOpeningHours);
        openingHoursService.isOpen = jest.fn().mockReturnValue(expectedIsOpen);

        component.selectedDateTime = new Date('2021-11-15T15:00:00');

        poiSelectedSubject.next(feature);
      });

      it('should store selected feature', () => {
        expect(component.selectedFeature).toEqual(feature);
      });

      it('should load details', () => {
        expect(component.name).toEqual(featureName);
        expect(component.osmWebsite).toEqual('https://openstreetmap.org/' + featureType + '/' + featureId);
        expect(component.website).toEqual(websiteValue);
        expect(component.openingHoursString).toEqual(featureOpeningHours);
        expect(component.isNowOpen).toEqual(expectedIsOpen);
      });

      it('should calls isOpen correctly', () => {
        expect(openingHoursService.isOpen).toHaveBeenCalledWith(feature, component.selectedDateTime);
      });

      describe('with reset', () => {
        beforeEach(() => {
          poiSelectedSubject.next(undefined);
        });

        it('should reset selected feature', () => {
          expect(component.selectedFeature).toBeUndefined();
        });

        it('should reset details', () => {
          expect(component.name).toEqual('');
          expect(component.osmWebsite).toEqual('');
          expect(component.website).toEqual('');
          expect(component.openingHoursString).toEqual('');
          expect(component.isNowOpen).toEqual(false);
        });
      });

      describe('with new selected date', () => {
        let newDate: Date;

        beforeEach(() => {
          newDate = new Date('2021-11-16T08:15:00');

          expectedIsOpen = false;
          openingHoursService.isOpen = jest.fn().mockReturnValue(expectedIsOpen);

          dateTimeSelectedSubject.next(newDate);
        });

        it('should set selected date', () => {
          expect(component.selectedDateTime).toEqual(newDate);
        });

        it('should load details', () => {
          expect(component.name).toEqual(featureName);
          expect(component.osmWebsite).toEqual('https://openstreetmap.org/' + featureType + '/' + featureId);
          expect(component.website).toEqual(websiteValue);
          expect(component.openingHoursString).toEqual(featureOpeningHours);
          expect(component.isNowOpen).toEqual(expectedIsOpen);
        });
      });
    });
  });
});
