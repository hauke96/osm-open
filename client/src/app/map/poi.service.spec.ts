import { PoiService } from './poi.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { FilterService } from '../common/filter.service';

describe(PoiService.name, () => {
  let service: PoiService;
  let filterService: FilterService;
  let httpClient: HttpClient;

  beforeEach(() => {
    filterService = {} as FilterService;
    httpClient = {} as HttpClient;

    service = new PoiService(httpClient, filterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('with call to overpass', () => {
    let response: any;
    let extent: number[];
    let dataChangedSpy: jest.Mock;
    let loadDataSpy: jest.Mock;
    let expectedWebsite1: string;
    let expectedWebsite2: string;

    beforeEach(() => {
      filterService.asOverpassQuery = jest.fn().mockReturnValue('');

      expectedWebsite1 = 'https://foo.com';
      expectedWebsite2 = 'bar.com';

      response = {
        version: 0.6,
        generator: 'Overpass API 0.7.57.1 74a55df1',
        osm3s: {
          timestamp_osm_base: '2021-11-13T22:53:45Z',
          copyright:
            'The data included in this document is from www.openstreetmap.org. The data is made available under ODbL.',
        },
        elements: [
          {
            type: 'node',
            id: 123,
            lat: 12.34,
            lon: 1.23,
            tags: {
              name: 'Foo',
              opening_hours: 'PH,Mo-Su 09:30-20:00',
              website: expectedWebsite1,
            },
          },
          {
            type: 'way',
            id: 234,
            center: {
              lat: 23.34,
              lon: 2.34,
            },
            tags: {
              name: 'Bar',
              opening_hours: 'Mo-Fr 11:00-19:00; PH,Sa,Su off',
              'contact:website': expectedWebsite2,
            },
          },
          {
            type: 'node',
            id: 345,
            lat: 34.5,
            lon: 4.56,
            tags: {
              name: 'Bar',
              opening_hours: 'Mo-Fr 11:00-19:00; PH,Sa,Su off',
            },
          },
        ],
      };
      extent = [1, 2, 3, 4];

      httpClient.get = jest.fn().mockReturnValue(of(response));

      dataChangedSpy = jest.fn();
      service.dataChanged.subscribe(dataChangedSpy);

      loadDataSpy = jest.fn();
      service.loadData(extent).subscribe(loadDataSpy);
    });

    it('should fire data changed event', () => {
      expect(dataChangedSpy).toHaveBeenCalledTimes(1);
    });

    it('should convert "contact:website" to "website"', () => {
      const website1 = dataChangedSpy.mock.calls[0][0][0].get('website');
      const website2 = dataChangedSpy.mock.calls[0][0][1].get('website');
      const website3 = dataChangedSpy.mock.calls[0][0][2].get('website');

      expect(website1).toEqual(expectedWebsite1);
      expect(website2).toEqual('https://' + expectedWebsite2);
      expect(website3).toBeUndefined();
    });

    it('should fix URL without https prefix', () => {
      const website = dataChangedSpy.mock.calls[0][0][1].get('contact:website');

      expect(website).toBeUndefined();
    });

    it('should call returned observable', () => {
      expect(loadDataSpy).toHaveBeenCalled();
    });
  });

  describe('with selected feature', () => {
    let poiSelectedSpy: jest.Mock;
    let feature: Feature<Point>;

    beforeEach(() => {
      poiSelectedSpy = jest.fn();
      service.poiSelected.subscribe(poiSelectedSpy);

      feature = new Feature<Point>(new Point([1, 2]));

      service.selectPoi(feature);
    });

    it('should fire selection event', () => {
      expect(poiSelectedSpy).toHaveBeenCalledWith(feature);
    });
  });
});
