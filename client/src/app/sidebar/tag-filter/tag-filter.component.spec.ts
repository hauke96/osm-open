import { TagFilterComponent } from './tag-filter.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';
import { FilterService } from '../../common/filter.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe(TagFilterComponent.name, () => {
  let component: TagFilterComponent;
  let fixture: MockedComponentFixture<TagFilterComponent>;
  let filterService: FilterService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const queryParamSubject = new BehaviorSubject<ParamMap | null>(null);

  beforeEach(() => {
    filterService = {} as FilterService;
    router = {
      navigate: jest.fn(),
    } as unknown as Router;
    activatedRoute = {
      queryParams: queryParamSubject.asObservable(),
    } as unknown as ActivatedRoute;

    return MockBuilder(TagFilterComponent, AppModule)
      .provide({
        provide: FilterService,
        useFactory: () => filterService,
      })
      .provide({
        provide: Router,
        useFactory: () => router,
      })
      .provide({
        provide: ActivatedRoute,
        useFactory: () => activatedRoute,
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
      expect(router.navigate).toHaveBeenCalledWith([], {
        relativeTo: activatedRoute,
        queryParams: { filter: component.filterExpression },
        queryParamsHandling: 'merge',
      });
    });

    it('should update filter on route change', () => {
      component.filterExpression = 'bar';

      queryParamSubject.next(null);
      expect(component.filterExpression).toEqual('');

      queryParamSubject.next({ filter: 'foo' } as unknown as ParamMap);
      expect(component.filterExpression).toEqual('foo');

      queryParamSubject.next({ filter: '' } as unknown as ParamMap);
      expect(component.filterExpression).toEqual('');
    });

    describe('with reset button clicked', () => {
      beforeEach(() => {
        component.reset();
      });

      it('should reset input', () => {
        expect(router.navigate).toHaveBeenCalledWith([], {
          relativeTo: activatedRoute,
          queryParams: { filter: '' },
          queryParamsHandling: 'merge',
        });
      });
    });
  });
});
