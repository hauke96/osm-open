import { LoadingSpinnerComponent } from './loading-spinner.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppConfig } from '../../app.config';

describe(LoadingSpinnerComponent.name, () => {
  let component: LoadingSpinnerComponent;
  let fixture: MockedComponentFixture<LoadingSpinnerComponent>;

  beforeEach(() => {
    return MockBuilder(LoadingSpinnerComponent, AppConfig);
  });

  beforeEach(() => {
    fixture = MockRender(LoadingSpinnerComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
