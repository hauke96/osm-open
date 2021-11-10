import { PoiService } from './poi.service';
import { HttpClient } from '@angular/common/http';

describe(PoiService.name, () => {
  let service: PoiService;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = {} as HttpClient;
    service = new PoiService(httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
