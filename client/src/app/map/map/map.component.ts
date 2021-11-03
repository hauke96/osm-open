import {AfterViewInit, Component, forwardRef} from '@angular/core';
import {Map, View} from "ol";
import {Attribution} from "ol/control";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import {MapService} from "../map.service";
import {LayerService} from "../layer.service";
import BaseLayer from "ol/layer/Base";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [
    {provide: LayerService, useExisting: forwardRef(() => MapComponent)}
  ]
})
export class MapComponent implements AfterViewInit, LayerService {
  map: Map;

  constructor(private mapService: MapService) {
    this.map = new Map({
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
        zoom: 17,
        minZoom: 0,
        maxZoom: 19
      })
    });
  }

  ngAfterViewInit(): void {
    this.map.setTarget("map");

    this.map.on('moveend', () => this.mapService.mapViewChanged(
      this.map.getView().getZoom() ?? 0,
      this.map.getView().calculateExtent()
    ));
  }

  addLayer(layer: BaseLayer): void {
    this.map.addLayer(layer);
  }
}
