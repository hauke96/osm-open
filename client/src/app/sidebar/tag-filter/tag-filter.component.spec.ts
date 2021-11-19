import { TagFilterComponent } from './tag-filter.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';
import { FilterService } from '../../common/filter.service';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';

describe(TagFilterComponent.name, () => {
  let component: TagFilterComponent;
  let fixture: MockedComponentFixture<TagFilterComponent>;
  let filterService: FilterService;

  beforeEach(() => {
    filterService = {} as FilterService;

    return MockBuilder(TagFilterComponent, AppModule).provide({
      provide: FilterService,
      useFactory: () => filterService,
    });
  });

  beforeEach(() => {
    fixture = MockRender(TagFilterComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with normal tag', () => {
    let key: string;
    let value: string;

    beforeEach(() => {
      key = 'my_great';
      value = '(.*tag.*)';
      component.selectedTag = key + '=' + value;

      filterService.getKey = jest.fn().mockReturnValue(key);
      filterService.getValue = jest.fn().mockReturnValue(value);
      filterService.isRegex = jest.fn().mockReturnValue(false);
      filterService.filterFeatures = jest.fn();

      component.onTagFieldChanged();
    });

    it('should match', () => {
      const filterFunction = (filterService.filterFeatures as jest.Mock).mock.calls[0][0] as (
        feature: Feature<Geometry>
      ) => boolean;

      const feature = new Feature();
      feature.set(key, value);

      expect(filterFunction(feature)).toEqual(true);
    });

    it('should NOT match', () => {
      const filterFunction = (filterService.filterFeatures as jest.Mock).mock.calls[0][0] as (
        feature: Feature<Geometry>
      ) => boolean;

      const feature = new Feature();
      feature.set(key, 'foo-tag bar');

      expect(filterFunction(feature)).toEqual(false);
    });
  });

  describe('with regex tag', () => {
    let key: string;
    let value: string;

    beforeEach(() => {
      key = 'my_great';
      value = '(.*tag.*|bar)';
      component.selectedTag = key + '=' + value;

      filterService.getKey = jest.fn().mockReturnValue(key);
      filterService.getValue = jest.fn().mockReturnValue(value);
      filterService.isRegex = jest.fn().mockReturnValue(true);
      filterService.filterFeatures = jest.fn();

      component.onTagFieldChanged();
    });

    it('should match on exact value', () => {
      const filterFunction = (filterService.filterFeatures as jest.Mock).mock.calls[0][0] as (
        feature: Feature<Geometry>
      ) => boolean;

      const feature = new Feature();
      feature.set(key, 'bar');

      expect(filterFunction(feature)).toEqual(true);
    });

    it('should match on different value', () => {
      const filterFunction = (filterService.filterFeatures as jest.Mock).mock.calls[0][0] as (
        feature: Feature<Geometry>
      ) => boolean;

      const feature = new Feature();
      feature.set(key, 'foo-tag 42');

      expect(filterFunction(feature)).toEqual(true);
    });
  });
});
