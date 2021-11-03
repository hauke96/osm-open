import {Component} from '@angular/core';
import {MapService} from "../../map/map.service";
import {Unsubscriber} from "../../common/ubsunscriber";
import {PoiService} from "../../map/poi.service";

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.scss']
})
export class LoadDataComponent extends Unsubscriber {
  canLoadData: boolean = false;

  constructor(private poiService: PoiService, mapService: MapService) {
    super();

    this.unsubscribeLater(mapService.currentZoomLevelChanged.subscribe(newZoomLevel => this.canLoadData = newZoomLevel > 16));
  }

  onLoadDataClicked() {
    this.poiService.loadData();
  }
}
