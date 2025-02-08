import { FilterService } from './filter.service';

describe(FilterService.name, () => {
  let service: FilterService;

  beforeEach(() => {
    service = new FilterService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current expression', () => {
    service.filter('newValue');
    expect(service.currentFilterExpression).toEqual('newValue');

    service.filter('newValue2');
    expect(service.currentFilterExpression).toEqual('newValue2');
  });

  it('should return correct normal Overpass query', () => {
    service.filter('foo=bar');
    expect(service.asOverpassQuery()).toEqual('["foo"="bar"]');

    service.filter('foo=bar=bar~bar');
    expect(service.asOverpassQuery()).toEqual('["foo"="bar=bar~bar"]');
  });

  it('should return correct regex Overpass query', () => {
    service.filter('foo~bar');
    expect(service.asOverpassQuery()).toEqual('["foo"~"bar"]');

    service.filter('foo~bar=bar~bar');
    expect(service.asOverpassQuery()).toEqual('["foo"~"bar=bar~bar"]');
  });

  it('should detect regex correctly', () => {
    expect(FilterService.isRegex('foo')).toEqual(false);
    expect(FilterService.isRegex('foo=bar')).toEqual(false);
    expect(FilterService.isRegex('foo~bar')).toEqual(true);
    expect(FilterService.isRegex('foo~bar=bar')).toEqual(true);
    expect(FilterService.isRegex('foo~')).toEqual(true);
    expect(FilterService.isRegex('~bar')).toEqual(true);
    expect(FilterService.isRegex('foo~bar~bar')).toEqual(true);
    expect(FilterService.isRegex('foo=bar~bar')).toEqual(false);
  });
});
