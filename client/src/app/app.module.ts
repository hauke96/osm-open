import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MapComponent } from './map/map/map.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { LoadDataComponent } from './sidebar/load-data/load-data.component';
import { PoiLayerComponent } from './map/poi-layer/poi-layer.component';
import { PoiComponent } from './sidebar/poi/poi.component';
import { DateTimeSelectionComponent } from './sidebar/date-time-selection/date-time-selection.component';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './common/loading-spinner/loading-spinner.component';
import { NotificationComponent } from './common/notification/notification.component';
import { TagFilterComponent } from './sidebar/tag-filter/tag-filter.component';
import { PoiDetailsComponent } from './sidebar/poi-details/poi-details.component';
import { provideRouter, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: AppComponent }];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    LoadDataComponent,
    PoiLayerComponent,
    PoiComponent,
    DateTimeSelectionComponent,
    LoadingSpinnerComponent,
    NotificationComponent,
    TagFilterComponent,
    PoiDetailsComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpClient: HttpClient) => new TranslateHttpLoader(httpClient, './assets/i18n/'),
        deps: [HttpClient],
      },
    }),
    FormsModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ],
})
export class AppModule {}
