import { PoiLayerComponent } from './poi-layer.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';
import { LayerService } from '../layer.service';
import { PoiService } from '../poi.service';
import { OpeningHoursService } from '../../common/opening-hours.service';
import { DateTimeSelectionService } from '../../common/date-time-selection.service';
import { Subject } from 'rxjs';
import { Feature, MapBrowserEvent } from 'ol';
import { Geometry, Point } from 'ol/geom';
import { SelectEvent } from 'ol/interaction/Select';
import { FilterService } from '../../common/filter.service';

describe(PoiLayerComponent.name, () => {
  let component: PoiLayerComponent;
  let fixture: MockedComponentFixture<PoiLayerComponent>;
  let layerService: LayerService;
  let poiService: PoiService;
  let openingHoursService: OpeningHoursService;
  let dateTimeSelectionService: DateTimeSelectionService;
  let filterService: FilterService;

  let poiDataChangedSubject: Subject<Feature<Point>[]>;
  let dateTimeSelectedSubject: Subject<Date | undefined>;
  let filterSubject: Subject<(feature: Feature<Geometry>) => boolean>;

  beforeEach(() => {
    poiDataChangedSubject = new Subject();
    dateTimeSelectedSubject = new Subject();
    filterSubject = new Subject();

    layerService = {
      addLayer: jest.fn(),
      addInteraction: jest.fn(),
    } as LayerService;
    poiService = {
      dataChanged: poiDataChangedSubject.asObservable(),
    } as unknown as PoiService;
    openingHoursService = {} as OpeningHoursService;
    dateTimeSelectionService = {
      dateTimeSelected: dateTimeSelectedSubject.asObservable(),
    } as unknown as DateTimeSelectionService;
    filterService = {
      filtered: filterSubject.asObservable(),
    } as FilterService;

    return MockBuilder(PoiLayerComponent, AppModule)
      .provide({ provide: LayerService, useFactory: () => layerService })
      .provide({ provide: PoiService, useFactory: () => poiService })
      .provide({ provide: OpeningHoursService, useFactory: () => openingHoursService })
      .provide({ provide: DateTimeSelectionService, useFactory: () => dateTimeSelectionService })
      .provide({ provide: FilterService, useFactory: () => filterService });
  });

  beforeEach(() => {
    fixture = MockRender(PoiLayerComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add layer on init', () => {
    expect(layerService.addLayer).toHaveBeenCalledWith(component.layer);
  });

  describe('with data change on poi layer', () => {
    let newFeatures: Feature<Point>[];
    let featureWithGeometry: Feature<Point>;

    beforeEach(() => {
      component.source.addFeatures([new Feature(), new Feature()]);

      featureWithGeometry = new Feature(new Point([11, 21]));
      newFeatures = [new Feature(), featureWithGeometry];
    });

    describe('with function showing positiv matches', () => {
      beforeEach(() => {
        component.showOnlyFilteredFeatures = true;
        component.filterFunction = (f: Feature<Geometry>) => f.getGeometry() != null;
        poiDataChangedSubject.next(newFeatures);
      });

      it('should clear and set features', () => {
        expect(component.source.getFeatures().length).toEqual(1);
        expect(component.source.getFeatures()[0].getGeometry()!.getCoordinates()[0]).toEqual(11);
        expect(component.source.getFeatures()[0].getGeometry()!.getCoordinates()[1]).toEqual(21);
      });
    });

    describe('with function showing negative matches', () => {
      beforeEach(() => {
        component.showOnlyFilteredFeatures = false;
        component.filterFunction = (f: Feature<Geometry>) => f.getGeometry() != null;
        poiDataChangedSubject.next(newFeatures);
      });

      it('should clear and set features', () => {
        expect(component.source.getFeatures().length).toEqual(1);
        expect(component.source.getFeatures()[0].getGeometry()).toBeUndefined();
      });
    });

    describe('with no filter function', () => {
      beforeEach(() => {
        component.showOnlyFilteredFeatures = true;
        poiDataChangedSubject.next(newFeatures);
      });

      it('should clear and set features', () => {
        expect(component.source.getFeatures().length).toEqual(2);
      });
    });
  });

  describe('with selected date changed', () => {
    let newDate: Date;

    beforeEach(() => {
      poiService.selectPoi = jest.fn();
      component.layer.changed = jest.fn();

      newDate = new Date();
      dateTimeSelectedSubject.next(newDate);
    });

    it('should mark layer changed', () => {
      expect(component.layer.changed).toHaveBeenCalled();
    });

    it('should set new date', () => {
      expect(component.selectedDateTime).toEqual(newDate);
    });

    it('should NOT select feature on poi service', () => {
      expect(poiService.selectPoi).not.toHaveBeenCalled();
    });

    describe('with selected feature and changed date', () => {
      let selectedFeature: Feature<Point>;

      beforeEach(() => {
        selectedFeature = new Feature(new Point([1, 2]));
        component.selectedFeature = selectedFeature;

        dateTimeSelectedSubject.next(new Date());
      });

      it('should call poi service', () => {
        expect(poiService.selectPoi).toHaveBeenCalledWith(component.selectedFeature);
      });
    });
  });

  describe('with selected feature', () => {
    let selectedFeature: Feature<Point>;

    beforeEach(() => {
      poiService.selectPoi = jest.fn();
      selectedFeature = new Feature<Point>(new Point([1, 2]));
      component.select.dispatchEvent(new SelectEvent('select', [selectedFeature], [], {} as MapBrowserEvent<never>));
    });

    it('should set selected feature', () => {
      expect(component.selectedFeature).toEqual(selectedFeature);
    });

    it('should call poi service', () => {
      expect(poiService.selectPoi).toHaveBeenCalledWith(component.selectedFeature);
    });
  });

  describe('with changed filter', () => {
    let filterFunction: jest.Mock;

    beforeEach(() => {
      filterFunction = jest.fn().mockReturnValue(true);

      component.features = [];
      component.layer.changed = jest.fn();

      filterSubject.next(filterFunction);
    });

    it('should set filter function', () => {
      expect(component.filterFunction).toEqual(filterFunction);
    });

    it('should mark layer changed', () => {
      expect(component.layer.changed).toHaveBeenCalled();
    });
  });

  [
    [true, true, true],
    [true, true, false],
    [true, false, true],
    [true, false, false],
    [false, true, true],
    [false, true, false],
    [false, false, true],
    [false, false, false],
  ].forEach(([filtered, open, selected]: boolean[]) => {
    describe('with called style function: filtered=' + filtered + ', open=' + open + ', selected=' + selected, () => {
      let filterFunction: jest.Mock;
      let feature: Feature<Point>;

      beforeEach(() => {
        filterFunction = jest.fn().mockReturnValue(filtered);
        component.filterFunction = filterFunction;

        openingHoursService.isOpen = jest.fn().mockReturnValue(open);

        feature = new Feature(new Point([1, 2]));
        component.getStyle(feature, selected);
      });

      it('should use filter function', () => {
        expect(filterFunction).toHaveBeenCalledWith(feature);
      });

      if (filtered) {
        it('should check open state', () => {
          expect(openingHoursService.isOpen).toHaveBeenCalledWith(feature, component.selectedDateTime);
        });
      } else {
        it('should NOT check open state', () => {
          expect(openingHoursService.isOpen).not.toHaveBeenCalled();
        });
      }
    });
  });
});
