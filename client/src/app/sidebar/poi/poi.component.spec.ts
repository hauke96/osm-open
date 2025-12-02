import { PoiComponent } from './poi.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { OpeningHoursService } from '../../common/opening-hours.service';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

describe(PoiComponent.name, () => {
  let component: PoiComponent;
  let fixture: MockedComponentFixture<PoiComponent>;
  let openingHoursService: OpeningHoursService;

  beforeEach(() => {
    openingHoursService = {} as OpeningHoursService;

    return MockBuilder(PoiComponent).provide({
      provide: OpeningHoursService,
      useFactory: () => openingHoursService,
    });
  });

  beforeEach(() => {
    fixture = MockRender(PoiComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with selected feature', () => {
    let feature: Feature<Point>;
    let featureName: string;
    let featureType: string;
    let featureId: string;
    let featureOpeningHours: string;
    let featureWebsite: string;
    let expectedIsOpen: boolean;

    beforeEach(() => {
      featureName = 'Foo Store';
      featureType = 'node';
      featureId = '192837465';
      featureOpeningHours = 'Mo-Fr 10:00-18:00';
      featureWebsite = 'foo.com';
      expectedIsOpen = true;

      feature = new Feature<Point>(new Point([1, 2]));
      feature.set('name', featureName);
      feature.set('@type', featureType);
      feature.set('@id', featureId);
      feature.set('opening_hours', featureOpeningHours);
      feature.set('website', featureWebsite);

      openingHoursService.getOpeningHoursString = jest.fn().mockReturnValue(featureOpeningHours);
      openingHoursService.isOpen = jest.fn().mockReturnValue(expectedIsOpen);

      component.selectedDateTime = new Date('2021-11-15T15:00:00');
      component.selectedFeature = feature;
    });

    it('should store selected feature', () => {
      expect(component.selectedFeature).toEqual(feature);
    });

    it('should load details', () => {
      expect(component.name).toEqual(featureName);
      expect(component.osmWebsite).toEqual('https://openstreetmap.org/' + featureType + '/' + featureId);
      expect(component.website).toEqual(featureWebsite);
      expect(component.openingHoursString).toEqual(featureOpeningHours);
      expect(component.isOpen).toEqual(expectedIsOpen);
    });

    it('should calls isOpen correctly', () => {
      expect(openingHoursService.isOpen).toHaveBeenCalledWith(feature, component.selectedDateTime);
    });

    describe('with reset', () => {
      beforeEach(() => {
        component.selectedFeature = undefined;
      });

      it('should reset selected feature', () => {
        expect(component.selectedFeature).toBeUndefined();
      });

      it('should reset details', () => {
        expect(component.name).toEqual('');
        expect(component.osmWebsite).toEqual('');
        expect(component.website).toEqual('');
        expect(component.openingHoursString).toEqual('');
        expect(component.isOpen).toEqual(false);
      });
    });

    describe('with new selected date', () => {
      let newDate: Date;

      beforeEach(() => {
        newDate = new Date('2021-11-16T08:15:00');

        expectedIsOpen = false;
        openingHoursService.isOpen = jest.fn().mockReturnValue(expectedIsOpen);

        component.selectedDateTime = newDate;
      });

      it('should set selected date', () => {
        expect(component.selectedDateTime).toEqual(newDate);
      });

      it('should load details', () => {
        expect(component.name).toEqual(featureName);
        expect(component.osmWebsite).toEqual('https://openstreetmap.org/' + featureType + '/' + featureId);
        expect(component.website).toEqual(featureWebsite);
        expect(component.openingHoursString).toEqual(featureOpeningHours);
        expect(component.isOpen).toEqual(expectedIsOpen);
      });
    });
  });
});
