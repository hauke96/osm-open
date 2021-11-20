import { MapComponent } from './map.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { MapEvent } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { Interaction, Select } from 'ol/interaction';
import { MapService } from '../map.service';
import { AppModule } from '../../app.module';

import Worker from '../../../../jest/worker-mock';
// @ts-ignore
window.Worker = Worker;

describe(MapComponent.name, () => {
  let component: MapComponent;
  let fixture: MockedComponentFixture<MapComponent>;
  let mapService: MapService;

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockImplementation(key => {
          if (key === 'project_creation_map_center') {
            return '[1, 2]';
          } else if (key === 'project_creation_map_zoom') {
            return '15';
          }
          return undefined;
        }),
        setItem: jest.fn(),
      },
    });

    mapService = {} as MapService;

    return MockBuilder(MapComponent, AppModule).provide({ provide: MapService, useFactory: () => mapService });
  });

  beforeEach(() => {
    fixture = MockRender(MapComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set map center', () => {
    expect(component.map.getView().getCenter()).toEqual([1, 2]);
  });

  it('should set zoom', () => {
    expect(component.map.getView().getZoom()).toEqual(15);
  });

  describe('with moved map', () => {
    let expectedCenter: number[];
    let expectedExtent: number[];
    let expectedZoom: number;

    beforeEach(() => {
      expectedCenter = [2, 3];
      expectedExtent = [1, 2, 3, 4];
      expectedZoom = 17;

      mapService.mapViewChanged = jest.fn();

      component.map.dispatchEvent({
        type: 'moveend',
        map: {
          getView: () => ({
            getCenter: () => expectedCenter,
            getZoom: () => expectedZoom,
            calculateExtent: () => expectedExtent,
          }),
        },
      } as unknown as MapEvent);
    });

    it('should set map center', () => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'project_creation_map_center',
        JSON.stringify(expectedCenter)
      );
    });

    it('should set map zoom', () => {
      expect(window.localStorage.setItem).toHaveBeenCalledWith('project_creation_map_zoom', '' + expectedZoom);
    });

    it('should call map service', () => {
      expect(mapService.mapViewChanged).toHaveBeenCalledWith(expectedZoom, expectedExtent);
    });
  });

  describe('with add layer call', () => {
    let expectedLayer: VectorLayer<VectorSource<Point>>;

    beforeEach(() => {
      expectedLayer = new VectorLayer();

      component.map.addLayer = jest.fn();

      component.addLayer(expectedLayer);
    });

    it('should add layer to map', () => {
      expect(component.map.addLayer).toHaveBeenCalledWith(expectedLayer);
    });
  });

  describe('with add interaction call', () => {
    let expectedInteraction: Interaction;

    beforeEach(() => {
      expectedInteraction = new Select();

      component.map.addInteraction = jest.fn();

      component.addInteraction(expectedInteraction);
    });

    it('should add interaction to map', () => {
      expect(component.map.addInteraction).toHaveBeenCalledWith(expectedInteraction);
    });
  });
});
