import { AfterViewInit, Component, forwardRef } from '@angular/core';
import { Map, MapEvent, View } from 'ol';
import { Attribution } from 'ol/control';
import OSM from 'ol/source/OSM';
import { MapService } from '../map.service';
import { LayerService } from '../layer.service';
import BaseLayer from 'ol/layer/Base';
import { Interaction } from 'ol/interaction';
import { fromLonLat } from 'ol/proj';
import ImageLayer from 'ol/layer/Image';
import Raster from 'ol/source/Raster';

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
      controls: [new Attribution()],
      layers: [
        new ImageLayer({
          source: new Raster({
            sources: [new OSM()],
            operation: (pixels: any[], data: any) => {
              const pixel = pixels[0];
              const strength = 0.5;
              // Factors from CCIR 601 specification to create a grayscale image
              const gray = pixel[0] * 0.3 + pixel[1] * 0.59 + pixel[2] * 0.11;

              return [
                pixel[0] - (pixel[0] - gray) * strength,
                pixel[1] - (pixel[1] - gray) * strength,
                pixel[2] - (pixel[2] - gray) * strength,
                pixel[3],
              ];
            },
          }),
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
    const center = localStorage.getItem('project_creation_map_center');
    if (center) {
      this.map.getView().setCenter(JSON.parse(center));
    }
    const zoom = localStorage.getItem('project_creation_map_zoom');
    if (zoom) {
      this.map.getView().setZoom(+zoom);
    }
  }

  ngAfterViewInit(): void {
    this.map.setTarget('map');

    this.map.on('moveend', (e: MapEvent) => {
      this.mapService.mapViewChanged(e.map.getView().getZoom() ?? 0, e.map.getView().calculateExtent());
      localStorage.setItem('project_creation_map_center', JSON.stringify(e.map.getView().getCenter()));
      localStorage.setItem('project_creation_map_zoom', '' + e.map.getView().getZoom());
    });
  }

  addLayer(layer: BaseLayer): void {
    this.map.addLayer(layer);
  }

  addInteraction(interaction: Interaction): void {
    this.map.addInteraction(interaction);
  }
}
