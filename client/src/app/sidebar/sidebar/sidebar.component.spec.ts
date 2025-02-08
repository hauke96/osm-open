import { SidebarComponent } from './sidebar.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';
import { PoiService } from '../../map/poi.service';
import { Subject } from 'rxjs';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { DateTimeSelectionService } from '../../common/date-time-selection.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: MockedComponentFixture<SidebarComponent>;
  let poiService: PoiService;
  let dateTimeSelectionService: DateTimeSelectionService;

  let poiSelectionSubject: Subject<Feature<Point>>;
  let dateTimeSelectedSubject: Subject<Date | undefined>;

  beforeEach(() => {
    poiSelectionSubject = new Subject<Feature<Point>>();
    dateTimeSelectedSubject = new Subject<Date | undefined>();

    poiService = {
      poiSelected: poiSelectionSubject.asObservable(),
    } as PoiService;
    dateTimeSelectionService = {
      dateTimeSelected: dateTimeSelectedSubject.asObservable(),
    } as unknown as DateTimeSelectionService;

    return MockBuilder(SidebarComponent, AppModule)
      .provide({ provide: PoiService, useFactory: () => poiService })
      .provide({ provide: DateTimeSelectionService, useFactory: () => dateTimeSelectionService });
  });

  beforeEach(() => {
    fixture = MockRender(SidebarComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with selected feature', () => {
    let expectedFeature: Feature<Point>;

    beforeEach(() => {
      expectedFeature = new Feature<Point>(new Point([1, 2]));

      poiSelectionSubject.next(expectedFeature);
    });

    it('should store selected feature', () => {
      expect(component.selectedFeature).toEqual(expectedFeature);
    });
  });

  describe('with selected date', () => {
    let expectedDate: Date;

    beforeEach(() => {
      expectedDate = new Date();

      dateTimeSelectedSubject.next(expectedDate);
    });

    it('should store selected date', () => {
      expect(component.selectedDateTime).toEqual(expectedDate);
    });
  });
});
