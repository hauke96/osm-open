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

  public features: Feature<Point>[] = [];
  public selectedFeature: Feature<Point> | undefined = undefined;
  public selectedDateTime: Date | undefined = undefined;
  public select: Select;

  private redTransparent = 'rgba(240,65,55,0.6)';
  private red = 'rgb(220,75,65)';
  private greenTransparent = 'rgba(50,160,50,0.6)';
  private green = 'rgb(50,160,50)';
  private gray = 'rgb(125,125,125)';
  private grayTransparent = 'rgba(115,115,115,0.6)';
  private whiteTransparent = 'rgb(255,255,255, 0.6)';

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
      this.poiService.selectPoi(selectedFeature);
    });
    this.layerService.addInteraction(this.select);

    this.unsubscribeLater(
      this.poiService.dataChanged.subscribe(newFeatures => {
        this.features = newFeatures;
        this.updateFeatures();
        this.poiService.deselectPoi();
      }),
      this.dateTimeSelectionService.dateTimeSelected.subscribe((selectedDateTime: Date | undefined) => {
        this.selectedDateTime = selectedDateTime;
        this.layer.changed();
        if (this.selectedFeature) {
          this.poiService.selectPoi(this.selectedFeature);
        }
      }),
      this.poiService.poiSelected.subscribe((selectedPoiFeature: Feature<Point> | undefined) => {
        this.selectedFeature = selectedPoiFeature;
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

  getStyle(feature: Feature<Geometry>, thisFeatureIsSelected: boolean): Style {
    const strokeColor = this.whiteTransparent;
    let fillColor;

    const isOpen = this.openingHoursService.isOpen(feature, this.selectedDateTime);

    if (this.selectedFeature != null && !thisFeatureIsSelected) {
      // A feature is currently selected, but it's not this one
      if (isOpen === undefined) {
        fillColor = this.grayTransparent;
      } else {
        if (isOpen) {
          fillColor = this.greenTransparent;
        } else {
          fillColor = this.redTransparent;
        }
      }
    } else {
      // This or no feature is selected
      if (isOpen === undefined) {
        fillColor = this.gray;
      } else {
        if (isOpen) {
          fillColor = this.green;
        } else {
          fillColor = this.red;
        }
      }
    }

    const fill = new Fill({
      color: fillColor,
    });
    const stroke = new Stroke({
      color: strokeColor,
      width: thisFeatureIsSelected ? 3 : 1.5,
    });
    return new Style({
      image: new Circle({
        fill,
        stroke,
        radius: thisFeatureIsSelected ? 10 : 6,
      }),
    });
  }
}
