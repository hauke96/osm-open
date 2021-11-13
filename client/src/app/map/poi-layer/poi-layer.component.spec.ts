import { PoiLayerComponent } from './poi-layer.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';
import { LayerService } from '../layer.service';
import { PoiService } from '../poi.service';
import { OpeningHoursService } from '../../common/opening-hours.service';
import { DateTimeSelectionService } from '../../common/date-time-selection.service';
import { Subject } from 'rxjs';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { SelectEvent } from 'ol/interaction/Select';

describe(PoiLayerComponent.name, () => {
  let component: PoiLayerComponent;
  let fixture: MockedComponentFixture<PoiLayerComponent>;
  let layerService: LayerService;
  let poiService: PoiService;
  let openingHoursService: OpeningHoursService;
  let dateTimeSelectionService: DateTimeSelectionService;

  let poiDataChangedSubject: Subject<Feature<Point>[]>;
  let dateTimeSelectedSubject: Subject<Date | undefined>;

  beforeEach(() => {
    poiDataChangedSubject = new Subject<Feature<Point>[]>();
    dateTimeSelectedSubject = new Subject<Date | undefined>();

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

    return MockBuilder(PoiLayerComponent, AppModule)
      .provide({ provide: LayerService, useFactory: () => layerService })
      .provide({ provide: PoiService, useFactory: () => poiService })
      .provide({ provide: OpeningHoursService, useFactory: () => openingHoursService })
      .provide({ provide: DateTimeSelectionService, useFactory: () => dateTimeSelectionService });
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

    beforeEach(() => {
      component.source.addFeatures([new Feature(), new Feature()]);

      newFeatures = [new Feature(new Point([1, 2]))];
      poiDataChangedSubject.next(newFeatures);
    });

    it('should clear and set features', () => {
      expect(component.source.getFeatures()).toEqual(newFeatures);
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
      selectedFeature = new Feature(new Point([1, 2]));
      component.select.dispatchEvent({ type: 'select', selected: [selectedFeature] } as SelectEvent);
    });

    it('should set selected feature', () => {
      expect(component.selectedFeature).toEqual(selectedFeature);
    });

    it('should call poi service', () => {
      expect(poiService.selectPoi).toHaveBeenCalledWith(component.selectedFeature);
    });
  });
});
