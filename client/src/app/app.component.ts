import {AfterViewInit, Component} from '@angular/core';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Title} from "@angular/platform-browser";
import {Map, View} from 'ol';
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import {Attribution} from "ol/control";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  map: Map;

  constructor(public translate: TranslateService, title: Title) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en/) ? browserLang : 'en');

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      translate.get('title').subscribe((res: string) => {
        title.setTitle(res);
      });
    });
  }

  ngAfterViewInit(): void {
    // TODO extract
    this.map = new Map({
      target: 'map',
      controls: [
        new Attribution()
      ],
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: new View({
        center: [1110161, 7085688],
        projection: 'EPSG:3857',
        zoom: 14,
        minZoom: 0,
        maxZoom: 19
      })
    });
  }
}
