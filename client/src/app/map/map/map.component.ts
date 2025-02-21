import { AfterViewInit, Component, forwardRef } from '@angular/core';
import { Map, MapEvent, View } from 'ol';
import { Attribution } from 'ol/control';
import OSM from 'ol/source/OSM';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
import BaseLayer from 'ol/layer/Base';
import { Interaction } from 'ol/interaction';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [{ provide: LayerService, useExisting: forwardRef(() => MapComponent) }],
})
export class MapComponent implements AfterViewInit, LayerService {
  map: Map;

  constructor(private mapService: MapService) {
    this.map = new Map({
      controls: [
        new Attribution({
          collapsed: false,
          collapsible: false,
        }),
      ],
      layers: [
        new TileLayer({
          className: 'ol-grayscale-layer',
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([9.9800664, 53.5476275]),
        projection: 'EPSG:3857',
        zoom: 14,
        minZoom: 0,
        maxZoom: 19,
      }),
    });

    // Restore map center & zoom
    const center = localStorage.getItem('map_center');
    if (center) {
      this.map.getView().setCenter(JSON.parse(center));
    }
    const zoom = localStorage.getItem('map_zoom');
    if (zoom) {
      this.map.getView().setZoom(+zoom);
    }
  }

  ngAfterViewInit(): void {
    this.map.setTarget('map');

    this.map.on('moveend', (e: MapEvent) => {
      this.mapService.mapViewChanged(e.map.getView().getZoom() ?? 0, e.map.getView().calculateExtent());
      localStorage.setItem('map_center', JSON.stringify(e.map.getView().getCenter()));
      localStorage.setItem('map_zoom', '' + e.map.getView().getZoom());
    });
  }

  addLayer(layer: BaseLayer): void {
    this.map.addLayer(layer);
  }

  addInteraction(interaction: Interaction): void {
    this.map.addInteraction(interaction);
  }
}
