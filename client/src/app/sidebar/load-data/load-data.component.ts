import {Component} from '@angular/core';
import {MapService} from "../../map/map.service";
import {Unsubscriber} from "../../common/ubsunscriber";
import {PoiService} from "../../map/poi.service";
import {Extent} from "ol/extent";
import {NotificationService} from "../../common/notification.service";

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.scss']
})
export class LoadDataComponent extends Unsubscriber {
  canLoadData: boolean = false;
  isLoading: boolean = false;

  private extent: Extent;

  constructor(private poiService: PoiService, private notificationService: NotificationService, mapService: MapService) {
    super();

    this.unsubscribeLater(mapService.currentMapViewChanged.subscribe(([zoomLevel, extent]: [number, Extent]) => {
      this.canLoadData = zoomLevel > 14;
      this.extent = extent;
    }));
  }

  onLoadDataClicked() {
    this.isLoading = true;
    this.poiService
      .loadData(this.extent)
      .subscribe(
        () => this.isLoading = false,
        err => {
          this.notificationService.addError(err.message)
          this.isLoading = false
          throw err;
        }
      );
  }
}
