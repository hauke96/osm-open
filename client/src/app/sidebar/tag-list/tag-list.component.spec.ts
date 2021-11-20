import { TagListComponent } from './tag-list.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';
import { Feature } from 'ol';

describe(TagListComponent.name, () => {
  let component: TagListComponent;
  let fixture: MockedComponentFixture<TagListComponent>;

  beforeEach(() => {
    return MockBuilder(TagListComponent, AppModule);
  });

  beforeEach(() => {
    fixture = MockRender(TagListComponent);
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
      ];
      expectedTags = [tags[2]];
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
