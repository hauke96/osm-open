import { DateTimeSelectionComponent } from './date-time-selection.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppConfig } from '../../app.config';
import { DateTimeSelectionService } from '../../common/date-time-selection.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('DateTimeSelectionComponent', () => {
  let component: DateTimeSelectionComponent;
  let fixture: MockedComponentFixture<DateTimeSelectionComponent>;
  let dateTimeSelectionService: DateTimeSelectionService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const queryParamSubject = new BehaviorSubject<ParamMap | null>(null);

  beforeEach(() => {
    dateTimeSelectionService = {} as DateTimeSelectionService;
    router = {
      navigate: jest.fn(),
    } as unknown as Router;
    activatedRoute = {
      queryParams: queryParamSubject.asObservable(),
    } as unknown as ActivatedRoute;

    return MockBuilder(DateTimeSelectionComponent, AppConfig)
      .provide({
        provide: DateTimeSelectionService,
        useFactory: () => dateTimeSelectionService,
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
    fixture = MockRender(DateTimeSelectionComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update date on route change', () => {
    component.date = '2024-01-01';
    component.time = '12:34';

    queryParamSubject.next(null);
    expect(component.date).toEqual('');
    expect(component.time).toEqual('');

    queryParamSubject.next({ date: '2025-12-24_18:30' } as unknown as ParamMap);
    expect(component.date).toEqual('2025-12-24');
    expect(component.time).toEqual('18:30');

    queryParamSubject.next({ filter: '' } as unknown as ParamMap);
    expect(component.date).toEqual('');
    expect(component.time).toEqual('');
  });

  describe('with data', () => {
    beforeEach(() => {
      component.time = '12:34';
      component.date = '2021-11-15';

      dateTimeSelectionService.selectDateTime = jest.fn();

      component.onInputChanged();
    });

    it('should set date on service', () => {
      expect(dateTimeSelectionService.selectDateTime).not.toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([], {
        relativeTo: activatedRoute,
        queryParams: { date: '2021-11-15_12:34' },
        queryParamsHandling: 'merge',
      });
    });
  });

  describe('with only time', () => {
    beforeEach(() => {
      component.time = '12:34';

      dateTimeSelectionService.resetSelectedDateTime = jest.fn();

      component.onInputChanged();
    });

    it('should call reset on service', () => {
      expect(dateTimeSelectionService.resetSelectedDateTime).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('with date', () => {
    beforeEach(() => {
      component.date = '2021-11-15';

      dateTimeSelectionService.resetSelectedDateTime = jest.fn();

      component.onInputChanged();
    });

    it('should call reset on service', () => {
      expect(dateTimeSelectionService.resetSelectedDateTime).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
