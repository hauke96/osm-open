import {NotificationComponent} from './notification.component';
import {MockBuilder, MockedComponentFixture, MockRender} from "ng-mocks";
import {AppModule} from "../../app.module";

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: MockedComponentFixture<NotificationComponent>;

  beforeEach(() => {
    return MockBuilder(NotificationComponent, AppModule);
  });

  beforeEach(() => {
    fixture = MockRender(NotificationComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
