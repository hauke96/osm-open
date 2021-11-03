import { Component, OnInit } from '@angular/core';
import {LayerService} from "../layer.service";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Point} from "ol/geom";
import {Feature} from "ol";
import {PoiService} from "../poi.service";

@Component({
  selector: 'app-poi-layer',
  templateUrl: './poi-layer.component.html',
  styleUrls: ['./poi-layer.component.scss']
})
export class PoiLayerComponent implements OnInit {
  private layer: VectorLayer<VectorSource<Point>>;
  private source: VectorSource<Point>;

  constructor(private layerService: LayerService, private poiService: PoiService) {
    this.source = new VectorSource<Point>();
    this.layer = new VectorLayer<VectorSource<Point>>({
      source: this.source
    })

    this.poiService.dataChanged.subscribe(newFeatures => {
      this.source.clear();
      this.source.addFeatures(newFeatures);
    });
  }

  ngOnInit(): void {
    this.layerService.addLayer(this.layer);
  }
}