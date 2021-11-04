import {Component, OnInit} from '@angular/core';
import {LayerService} from "../layer.service";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Geometry, Point} from "ol/geom";
import {PoiService} from "../poi.service";
import {Select} from "ol/interaction";
import {SelectEvent} from "ol/interaction/Select";
import {Feature} from "ol";
import {Circle, Fill, Stroke, Style} from "ol/style";
import RenderFeature from "ol/render/Feature";

@Component({
  selector: 'app-poi-layer',
  templateUrl: './poi-layer.component.html',
  styleUrls: ['./poi-layer.component.scss']
})
export class PoiLayerComponent implements OnInit {
  private layer: VectorLayer<VectorSource<Point>>;
  private source: VectorSource<Point>;

  private red = 'rgba(244,67,54,0.65)';

  constructor(private layerService: LayerService, private poiService: PoiService) {
    this.source = new VectorSource<Point>();
    this.layer = new VectorLayer<VectorSource<Point>>({
      source: this.source,
      style: (feature) => this.getStyle(feature)
    })

    this.poiService.dataChanged.subscribe(newFeatures => {
      this.source.clear();
      this.source.addFeatures(newFeatures);
    });

    let select = new Select();
    select.on('select', (event: SelectEvent) => {
      this.poiService.selectPoi(event.selected[0]);
    });
    this.layerService.addInteraction(select);
  }

  ngOnInit(): void {
    this.layerService.addLayer(this.layer);
  }

  private getStyle(feature: RenderFeature | Feature<Geometry>) {
    var fill = new Fill({
      color: this.red
    });
    var stroke = new Stroke({
      color: '#e0e0e0',
      width: 1
    });
    return new Style({
      image: new Circle({
        fill: fill,
        stroke: stroke,
        radius: 6
      }),
      fill: fill,
      stroke: stroke
    });
  }
}
