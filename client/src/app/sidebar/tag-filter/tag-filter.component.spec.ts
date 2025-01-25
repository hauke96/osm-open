import { TagFilterComponent } from './tag-filter.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';
import { FilterService } from '../../common/filter.service';

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
      component.filterExpression = key + '=' + value;

      filterService.filter = jest.fn();

      component.onTagFieldChanged();
    });

    it('should call service', () => {
      expect(filterService.filter).toHaveBeenCalledWith(component.filterExpression);
    });

    describe('with reset button clicked', () => {
      beforeEach(() => {
        component.reset();
      });

      it('should reset input', () => {
        expect(component.filterExpression).toEqual('');
      });
    });
  });
});
