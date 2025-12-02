import { Component } from '@angular/core';
import { MapService } from '../../map/map.service';
import { Unsubscriber } from '../../common/unsubscriber';
import { PoiService } from '../../map/poi.service';
import { Extent } from 'ol/extent';
import { NotificationService } from '../../common/notification.service';
import {TranslatePipe} from "@ngx-translate/core";
import {LoadingSpinnerComponent} from "../../common/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.scss'],
  imports: [
    TranslatePipe,
    LoadingSpinnerComponent
  ]
})
export class LoadDataComponent extends Unsubscriber {
  canLoadData: boolean = false;
  isLoading: boolean = false;
  extent: Extent;

  constructor(
    private poiService: PoiService,
    private notificationService: NotificationService,
    mapService: MapService
  ) {
    super();

    this.unsubscribeLater(
      mapService.currentMapViewChanged.subscribe(([zoomLevel, extent]: [number, Extent]) => {
        this.canLoadData = zoomLevel > 14;
        this.extent = extent;
      })
    );
  }

  onLoadDataClicked(): void {
    this.isLoading = true;
    this.poiService.loadData(this.extent).subscribe({
      next: () => (this.isLoading = false),
      error: err => {
        this.notificationService.addError(err.message);
        this.isLoading = false;
        throw err;
      },
    });
  }
}
