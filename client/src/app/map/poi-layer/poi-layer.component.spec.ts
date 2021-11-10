import { PoiLayerComponent } from './poi-layer.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';
import { LayerService } from '../layer.service';

describe(PoiLayerComponent.name, () => {
  let component: PoiLayerComponent;
  let fixture: MockedComponentFixture<PoiLayerComponent>;
  let layerService: LayerService;

  beforeEach(() => {
    layerService = {} as LayerService;
    return MockBuilder(PoiLayerComponent, AppModule).provide({ provide: LayerService, useFactory: () => layerService });
  });

  beforeEach(() => {
    fixture = MockRender(PoiLayerComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
