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
import {OpeningHoursService} from "../../common/opening-hours.service";

@Component({
  selector: 'app-poi-layer',
  templateUrl: './poi-layer.component.html',
  styleUrls: ['./poi-layer.component.scss']
})
export class PoiLayerComponent implements OnInit {
  private layer: VectorLayer<VectorSource<Point>>;
  private source: VectorSource<Point>;

  private selectedFeature: Feature<Geometry>;
  private redTransparent = 'rgba(244,67,54,0.25)';
  private redSemiTransparent = 'rgba(244,67,54,0.85)';
  private red = 'rgb(244,67,54)';
  private greenTransparent = 'rgba(76,175,80,0.25)';
  private greenSemiTransparent = 'rgba(76,175,80,0.85)';
  private green = 'rgb(76,175,80)';

  constructor(private layerService: LayerService, private poiService: PoiService, private openingHoursService: OpeningHoursService) {
    this.source = new VectorSource<Point>();
    this.layer = new VectorLayer<VectorSource<Point>>({
      source: this.source,
      style: (feature) => feature instanceof Feature ? this.getStyle(feature as Feature<Geometry>, false) : []
    })

    this.poiService.dataChanged.subscribe(newFeatures => {
      this.source.clear();
      this.source.addFeatures(newFeatures);
    });

    let select = new Select({
      style: (feature) => feature instanceof Feature ? this.getStyle(feature as Feature<Geometry>, true) : []
    });
    select.on('select', (event: SelectEvent) => {
      this.selectedFeature = event.selected[0];
      this.poiService.selectPoi(event.selected[0]);
    });
    this.layerService.addInteraction(select);
  }

  ngOnInit(): void {
    this.layerService.addLayer(this.layer);
  }

  private getStyle(feature: Feature<Geometry>, selected: boolean) {
    let strokeColor;
    let fillColor;

    if (selected) { // This feature is selected
      if (this.openingHoursService.isOpen(feature)) {
        strokeColor = this.green
        fillColor = this.greenSemiTransparent
      } else {
        strokeColor = this.red
        fillColor = this.redSemiTransparent
      }
    } else if (this.selectedFeature != null) { // A different feature is currently selected
      fillColor = 'transparent'
      if (this.openingHoursService.isOpen(feature)) {
        strokeColor = this.greenSemiTransparent
      } else {
        strokeColor = this.redSemiTransparent
      }
    } else { // No feature is selected
      if (this.openingHoursService.isOpen(feature)) {
        strokeColor = this.green
        fillColor = this.greenTransparent
      } else {
        strokeColor = this.red
        fillColor = this.redTransparent
      }
    }

    var fill = new Fill({
      color: fillColor
    });
    var stroke = new Stroke({
      color: strokeColor,
      width: 1.5
    });
    return new Style({
      image: new Circle({
        fill: fill,
        stroke: stroke,
        radius: selected ? 10 : 6
      })
    });
  }
}
