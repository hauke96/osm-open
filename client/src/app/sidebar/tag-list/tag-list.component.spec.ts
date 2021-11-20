import { TagListComponent } from './tag-list.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';

describe(TagListComponent.name, () => {
  let component: TagListComponent;
  let fixture: MockedComponentFixture<TagListComponent>;

  beforeEach(() => {
    return MockBuilder(TagListComponent, AppModule);
  });

  beforeEach(() => {
    fixture = MockRender(TagListComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
