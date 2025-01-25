import { Component, OnInit } from '@angular/core';
import { LayerService } from '../layer.service';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Geometry, Point } from 'ol/geom';
import { PoiService } from '../poi.service';
import { Select } from 'ol/interaction';
import { SelectEvent } from 'ol/interaction/Select';
import { Feature } from 'ol';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import { OpeningHoursService } from '../../common/opening-hours.service';
import { DateTimeSelectionService } from '../../common/date-time-selection.service';
import { Unsubscriber } from '../../common/unsubscriber';

@Component({
  selector: 'app-poi-layer',
  templateUrl: './poi-layer.component.html',
  styleUrls: ['./poi-layer.component.scss'],
})
export class PoiLayerComponent extends Unsubscriber implements OnInit {
  public readonly layer: VectorLayer<VectorSource<Feature<Point>>>;
  public readonly source: VectorSource<Feature<Point>>;

  public features: Feature<Point>[];
  public selectedFeature: Feature<Point>;
  public selectedDateTime: Date | undefined;
  public select: Select;

  private redTransparent = 'rgba(244,67,54,0.25)';
  private redSemiTransparent = 'rgba(244,67,54,0.85)';
  private red = 'rgb(244,67,54)';
  private greenTransparent = 'rgba(76,175,80,0.25)';
  private greenSemiTransparent = 'rgba(76,175,80,0.85)';
  private green = 'rgb(76,175,80)';
  private gray = 'rgb(135,135,135)';
  private graySemiTransparent = 'rgba(135,135,135,0.85)';
  private grayTransparent = 'rgba(135,135,135,0.25)';

  constructor(
    private layerService: LayerService,
    private poiService: PoiService,
    private openingHoursService: OpeningHoursService,
    private dateTimeSelectionService: DateTimeSelectionService
  ) {
    super();

    this.source = new VectorSource<Feature<Point>>();
    this.layer = new VectorLayer<VectorSource<Feature<Point>>>({
      source: this.source,
      style: feature => (feature instanceof Feature ? this.getStyle(feature as Feature<Geometry>, false) : []),
    });

    this.select = new Select({
      style: feature => (feature instanceof Feature ? this.getStyle(feature as Feature<Geometry>, true) : []),
    });
    this.select.on('select', (event: SelectEvent) => {
      const selectedFeature = event.selected[0] as Feature<Point>;
      this.selectedFeature = selectedFeature;
      this.poiService.selectPoi(selectedFeature);
    });
    this.layerService.addInteraction(this.select);

    this.unsubscribeLater(
      this.poiService.dataChanged.subscribe(newFeatures => {
        this.features = newFeatures;
        console.log('Changed');
        this.updateFeatures();
      }),
      this.dateTimeSelectionService.dateTimeSelected.subscribe((selectedDateTime: Date | undefined) => {
        this.selectedDateTime = selectedDateTime;
        this.layer.changed();
        if (this.selectedFeature) {
          this.poiService.selectPoi(this.selectedFeature);
        }
      })
    );
  }

  ngOnInit(): void {
    this.layerService.addLayer(this.layer);
  }

  updateFeatures(): void {
    this.source.clear();
    this.source.addFeatures(this.features);
  }

  getStyle(feature: Feature<Geometry>, selected: boolean): Style {
    let strokeColor;
    let fillColor;

    const isOpen = this.openingHoursService.isOpen(feature, this.selectedDateTime);

    if (selected) {
      // This feature is selected
      if (isOpen === undefined) {
        strokeColor = this.gray;
        fillColor = this.graySemiTransparent;
      } else {
        if (isOpen) {
          strokeColor = this.green;
          fillColor = this.greenSemiTransparent;
        } else {
          strokeColor = this.red;
          fillColor = this.redSemiTransparent;
        }
      }
    } else if (this.selectedFeature != null) {
      // A different feature is currently selected
      fillColor = 'transparent';
      if (isOpen === undefined) {
        strokeColor = this.graySemiTransparent;
      } else {
        if (isOpen) {
          strokeColor = this.greenSemiTransparent;
        } else {
          strokeColor = this.redSemiTransparent;
        }
      }
    } else {
      // No feature is selected
      if (isOpen === undefined) {
        strokeColor = this.gray;
        fillColor = this.grayTransparent;
      } else {
        if (isOpen) {
          strokeColor = this.green;
          fillColor = this.greenTransparent;
        } else {
          strokeColor = this.red;
          fillColor = this.redTransparent;
        }
      }
    }

    const fill = new Fill({
      color: fillColor,
    });
    const stroke = new Stroke({
      color: strokeColor,
      width: 1.5,
    });
    return new Style({
      image: new Circle({
        fill,
        stroke,
        radius: selected ? 10 : 6,
      }),
    });
  }
}
