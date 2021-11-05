import {LoadingSpinnerComponent} from './loading-spinner.component';
import {MockBuilder, MockedComponentFixture, MockRender} from "ng-mocks";
import {AppModule} from "../../app.module";

describe(LoadingSpinnerComponent.name, () => {
  let component: LoadingSpinnerComponent;
  let fixture: MockedComponentFixture<LoadingSpinnerComponent>;

  beforeEach(() => {
    return MockBuilder(LoadingSpinnerComponent, AppModule)
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
