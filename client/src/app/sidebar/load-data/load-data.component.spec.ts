import {LoadDataComponent} from './load-data.component';
import {MockBuilder, MockedComponentFixture, MockRender} from "ng-mocks";
import {AppModule} from "../../app.module";

describe(LoadDataComponent.name, () => {
  let component: LoadDataComponent;
  let fixture: MockedComponentFixture<LoadDataComponent>;

  beforeEach(() => {
    return MockBuilder(LoadDataComponent, AppModule);
  });

  beforeEach(() => {
    fixture = MockRender(LoadDataComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
