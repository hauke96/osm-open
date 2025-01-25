import { MapService } from './map.service';

describe(MapService.name, () => {
  let service: MapService;

  beforeEach(() => {
    service = new MapService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('with subscription', () => {
    let spy: jest.Mock;
    let expectedExtent: number[];
    let expectedZoom: number;

    beforeEach(() => {
      spy = jest.fn();
      service.currentMapViewChanged.subscribe(spy);

      expectedExtent = [1, 2, 3, 4];
      expectedZoom = 12;
      service.mapViewChanged(expectedZoom, expectedExtent);
    });

    it('should call subscription', () => {
      expect(spy).toHaveBeenCalledWith([expectedZoom, expectedExtent]);
    });
  });
});
