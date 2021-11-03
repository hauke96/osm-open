import {Component} from '@angular/core';
import {MapService} from "../../map/map.service";
import {Unsubscriber} from "../../common/ubsunscriber";
import {PoiService} from "../../map/poi.service";
import {Extent} from "ol/extent";

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.scss']
})
export class LoadDataComponent extends Unsubscriber {
  canLoadData: boolean = false;

  private extent: Extent;

  constructor(private poiService: PoiService, mapService: MapService) {
    super();

    this.unsubscribeLater(mapService.currentMapViewChanged.subscribe(([zoomLevel, extent]: [number, Extent]) => {
      this.canLoadData = zoomLevel > 14;
      this.extent = extent;
    }));
  }

  onLoadDataClicked() {
    this.poiService.loadData(this.extent);
  }
}
