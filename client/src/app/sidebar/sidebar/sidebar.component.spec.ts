import { SidebarComponent } from './sidebar.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';
import { PoiService } from '../../map/poi.service';
import { Subject } from 'rxjs';
import { Point } from 'ol/geom';
import { Feature } from 'ol';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: MockedComponentFixture<SidebarComponent>;
  let poiService: PoiService;
  let poiSelectionSubject: Subject<Feature<Point>>;

  beforeEach(() => {
    poiSelectionSubject = new Subject<Feature<Point>>();
    poiService = {
      poiSelected: poiSelectionSubject.asObservable(),
    } as PoiService;

    return MockBuilder(SidebarComponent, AppModule).provide({ provide: PoiService, useFactory: () => poiService });
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
      expectedFeature = new Feature(new Point([1, 2]));

      poiSelectionSubject.next(expectedFeature);
    });

    it('should store selected feature', () => {
      expect(component.selectedFeature).toEqual(expectedFeature);
    });
  });
});
