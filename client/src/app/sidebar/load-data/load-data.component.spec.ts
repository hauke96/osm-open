import { LoadDataComponent } from './load-data.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppConfig } from '../../app.config';
import { PoiService } from '../../map/poi.service';
import { MapService } from '../../map/map.service';
import { NotificationService } from '../../common/notification.service';
import { Subject, throwError } from 'rxjs';
import { Extent } from 'ol/extent';

describe(LoadDataComponent.name, () => {
  let component: LoadDataComponent;
  let fixture: MockedComponentFixture<LoadDataComponent>;
  let poiService: PoiService;
  let mapService: MapService;
  let notificationService: NotificationService;

  let mapViewChangedSubject: Subject<[number, Extent]>;

  beforeEach(() => {
    mapViewChangedSubject = new Subject<[number, Extent]>();

    poiService = {} as PoiService;
    mapService = {
      currentMapViewChanged: mapViewChangedSubject.asObservable(),
    } as MapService;
    notificationService = {} as NotificationService;

    return MockBuilder(LoadDataComponent, AppConfig)
      .provide({ provide: PoiService, useFactory: () => poiService })
      .provide({ provide: MapService, useFactory: () => mapService })
      .provide({ provide: NotificationService, useFactory: () => notificationService });
  });

  beforeEach(() => {
    fixture = MockRender(LoadDataComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be able to initially load data', () => {
    expect(component.canLoadData).toBe(false);
  });

  it('should is initially not loading', () => {
    expect(component.isLoading).toBe(false);
  });

  describe('with changed map view', () => {
    let zoomLevel: number;
    let extent: number[];

    beforeEach(() => {
      zoomLevel = 18;
      extent = [1, 2, 3, 4];

      mapViewChangedSubject.next([zoomLevel, extent]);
    });

    it('should be able to load data', () => {
      expect(component.canLoadData).toBe(true);
    });

    it('should set extent correctly', () => {
      expect(component.extent).toEqual(extent);
    });

    describe('with click on load button', () => {
      let loadDataFn: jest.Mock;
      let loadDataSubject: Subject<void>;

      beforeEach(() => {
        loadDataFn = jest.fn();
        loadDataSubject = new Subject<void>();

        poiService.loadData = loadDataFn.mockReturnValue(loadDataSubject.asObservable());

        component.onLoadDataClicked();
      });

      it('should start loading', () => {
        expect(component.isLoading).toBe(true);
      });

      describe('with successful result', () => {
        beforeEach(() => {
          loadDataSubject.next();
        });

        it('should stop loading', () => {
          expect(component.isLoading).toBe(false);
        });
      });

      describe('with error', () => {
        let error: Error;

        beforeEach(() => {
          error = new Error('BOOM!!!');
          loadDataFn.mockReturnValue(throwError(error));

          notificationService.addError = jest.fn();

          loadDataSubject.error(error);
        });

        it('should stop loading', () => {
          expect(component.isLoading).toBe(false);
        });

        it('should add error', () => {
          expect(notificationService.addError).toHaveBeenCalledWith(error.message);
        });
      });
    });
  });
});
