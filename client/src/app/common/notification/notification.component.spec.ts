import { NotificationComponent } from './notification.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';
import { NotificationService } from '../notification.service';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: MockedComponentFixture<NotificationComponent>;
  let notificationService: NotificationService;
  let errorString: string;
  let hasError: boolean;

  beforeEach(() => {
    errorString = 'foo bar';
    hasError = true;

    notificationService = {} as NotificationService;
    notificationService.dropError = jest.fn();
    notificationService.getError = jest.fn().mockReturnValue(errorString);
    notificationService.hasError = jest.fn().mockReturnValue(hasError);

    return MockBuilder(NotificationComponent, AppModule).provide({
      provide: NotificationService,
      useValue: notificationService,
    });
  });

  beforeEach(() => {
    fixture = MockRender(NotificationComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct hasError value', () => {
    expect(component.hasError()).toEqual(hasError);
  });

  it('should get correct error', () => {
    expect(component.errorText()).toEqual(errorString);
  });

  it('should drop error on button click', () => {
    component.onOkButtonClicked();
    expect(notificationService.dropError).toHaveBeenCalled();
  });
});
