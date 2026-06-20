import { PoiDetailsComponent } from './poi-details.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { Feature } from 'ol';

describe(PoiDetailsComponent.name, () => {
  let component: PoiDetailsComponent;
  let fixture: MockedComponentFixture<PoiDetailsComponent>;

  beforeEach(() => {
    return MockBuilder(PoiDetailsComponent);
  });

  beforeEach(() => {
    fixture = MockRender(PoiDetailsComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with selected feature', () => {
    let tags: [string, string][];
    let expectedTags: [string, string][];

    beforeEach(() => {
      tags = [
        ['foo', 'bar'],
        ['', ''],
        ['website', 'osm.org'],
        ['@id', '123'],
        ['@type', 'node'],
        ['@timestamp', 'yesterday or so'],
      ];
      expectedTags = [tags[0], tags[1], tags[2]];
      const feature = new Feature();
      tags.forEach(t => feature.set(t[0], t[1]));

      component.selectedFeature = feature;
    });

    it('should determine relevant tags', () => {
      expect(component.relevantTags).toEqual(expectedTags);
    });
  });

  it('should return no relevant tags without selected feature', () => {
    expect(component.relevantTags).toEqual([]);
  });

  it('should detect url correctly', () => {
    expect(component.isUrl('https://osm.org')).toEqual(true);
    expect(component.isUrl('http://osm.org')).toEqual(true);
    expect(component.isUrl('https://osm')).toEqual(true);

    expect(component.isUrl('osm.org')).toEqual(false);
    expect(component.isUrl('')).toEqual(false);
    expect(component.isUrl('foobar')).toEqual(false);
  });
});
