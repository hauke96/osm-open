import { Component, OnInit } from '@angular/core';
import {MapService} from "../../map/map.service";

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.scss']
})
export class LoadDataComponent {
  zoomLevel: number = 0;

  constructor(mapService: MapService) {
    mapService.currentZoomLevelChanged.subscribe(newZoomLevel => this.zoomLevel = newZoomLevel)
  }

  get zoom(): number {
    return this.zoomLevel;
  }
}
