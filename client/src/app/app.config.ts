import { ApplicationConfig } from '@angular/core';
import { AppComponent } from './app.component';
import { provideTranslateService } from '@ngx-translate/core';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideRouter, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: AppComponent }];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideRouter(routes),
    provideTranslateService({
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
    }),
  ],
};
