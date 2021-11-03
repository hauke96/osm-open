import {AppComponent} from './app.component';
import {MockBuilder, MockedComponentFixture, MockRender} from "ng-mocks";
import {AppModule} from "./app.module";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: MockedComponentFixture<AppComponent>;

  beforeEach(() => {
    return MockBuilder(AppComponent, AppModule);
  });

  beforeEach(() => {
    fixture = MockRender(AppComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'osm-open'`, () => {
    expect(component.title).toEqual('osm-open');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('osm-open app is running!');
  });
});
