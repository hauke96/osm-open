import { DateTimeSelectionComponent } from './date-time-selection.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';

describe('DateTimeSelectionComponent', () => {
  let component: DateTimeSelectionComponent;
  let fixture: MockedComponentFixture<DateTimeSelectionComponent>;

  beforeEach(() => {
    return MockBuilder(DateTimeSelectionComponent, AppModule);
  });

  beforeEach(() => {
    fixture = MockRender(DateTimeSelectionComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
