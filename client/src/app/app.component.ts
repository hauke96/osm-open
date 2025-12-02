import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { NotificationComponent } from './common/notification/notification.component';
import { MapComponent } from './map/map/map.component';
import { PoiLayerComponent } from './map/poi-layer/poi-layer.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NotificationComponent, MapComponent, PoiLayerComponent, SidebarComponent],
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    title: Title
  ) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en/) ? browserLang : 'en');

    translate.onLangChange.subscribe(() => {
      translate.get('title').subscribe((res: string) => {
        title.setTitle(res);
      });
    });
  }
}
