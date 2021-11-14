import { TagFilterComponent } from './tag-filter.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';

describe(TagFilterComponent.name, () => {
  let component: TagFilterComponent;
  let fixture: MockedComponentFixture<TagFilterComponent>;

  beforeEach(() => {
    return MockBuilder(TagFilterComponent, AppModule);
  });

  beforeEach(() => {
    fixture = MockRender(TagFilterComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
