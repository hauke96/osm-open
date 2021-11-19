import { SidebarComponent } from './sidebar.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { AppModule } from '../../app.module';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: MockedComponentFixture<SidebarComponent>;

  beforeEach(() => {
    return MockBuilder(SidebarComponent, AppModule);
  });

  beforeEach(() => {
    fixture = MockRender(SidebarComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
