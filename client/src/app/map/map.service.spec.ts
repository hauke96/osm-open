import { MapService } from './map.service';

describe(MapService.name, () => {
  let service: MapService;

  beforeEach(() => {
    service = new MapService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
