import {Component} from '@angular/core';
import {MapService} from "../../map/map.service";

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.scss']
})
export class LoadDataComponent {
  canLoadData: boolean = false;

  constructor(mapService: MapService) {
    mapService.currentZoomLevelChanged.subscribe(newZoomLevel => this.canLoadData = newZoomLevel > 16)
  }
}
