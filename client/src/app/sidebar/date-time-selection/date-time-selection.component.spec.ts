import { DateTimeSelectionComponent } from './date-time-selection.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';
import { DateTimeSelectionService } from '../../common/date-time-selection.service';

describe('DateTimeSelectionComponent', () => {
  let component: DateTimeSelectionComponent;
  let fixture: MockedComponentFixture<DateTimeSelectionComponent>;
  let dateTimeSelectionService: DateTimeSelectionService;

  beforeEach(() => {
    dateTimeSelectionService = {} as DateTimeSelectionService;

    return MockBuilder(DateTimeSelectionComponent, AppModule).provide({
      provide: DateTimeSelectionService,
      useFactory: () => dateTimeSelectionService,
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

  describe('with data', () => {
    let expectedDate: Date;

    beforeEach(() => {
      component.time = '12:34';
      component.date = '2021-11-15';
      expectedDate = new Date('2021-11-15T12:34:00');

      dateTimeSelectionService.selectDateTime = jest.fn();

      component.onInputChanged();
    });

    it('should set date on service', () => {
      expect(dateTimeSelectionService.selectDateTime).toHaveBeenCalledWith(expectedDate);
    });
  });

  describe('with only time', () => {
    beforeEach(() => {
      component.time = '12:34';

      dateTimeSelectionService.resetSelectedDateTime = jest.fn();

      component.onInputChanged();
    });

    it('should call reset on service', () => {
      expect(dateTimeSelectionService.resetSelectedDateTime).toHaveBeenCalled();
    });
  });

  describe('with date', () => {
    beforeEach(() => {
      component.date = '2021-11-15';

      dateTimeSelectionService.resetSelectedDateTime = jest.fn();

      component.onInputChanged();
    });

    it('should call reset on service', () => {
      expect(dateTimeSelectionService.resetSelectedDateTime).toHaveBeenCalled();
    });
  });
});
