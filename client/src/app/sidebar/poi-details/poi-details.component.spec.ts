import { PoiDetailsComponent } from './poi-details.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';

describe('PoiDetailsComponent', () => {
  let component: PoiDetailsComponent;
  let fixture: MockedComponentFixture<PoiDetailsComponent>;

  beforeEach(() => {
    return MockBuilder(PoiDetailsComponent, AppModule);
  });

  beforeEach(() => {
    fixture = MockRender(PoiDetailsComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
