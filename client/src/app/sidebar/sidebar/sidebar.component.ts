import { Component } from '@angular/core';
import packageInfo from '../../../../package.json';
import { environment } from '../../../environments/environment';
import { PoiService } from '../../map/poi.service';
import { Unsubscriber } from '../../common/unsubscriber';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends Unsubscriber {
  version = packageInfo.version;
  sourceRepoUrl = environment.sourceRepoUrl;
  selectedFeature: Feature<Point> | undefined;

  constructor(poiService: PoiService) {
    super();

    this.unsubscribeLater(
      poiService.poiSelected.subscribe((feature: Feature<Point> | undefined) => {
        this.selectedFeature = feature;
      })
    );
  }
}
