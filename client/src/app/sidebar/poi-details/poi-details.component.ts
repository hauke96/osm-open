import {Component} from '@angular/core';
import {PoiService} from "../../map/poi.service";
import {Unsubscriber} from "../../common/ubsunscriber";
import {Point} from "ol/geom";
import {Feature} from "ol";

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss']
})
export class PoiDetailsComponent extends Unsubscriber {
  name: string;
  openingHours: string;

  constructor(private poiService: PoiService) {
    super();
    this.unsubscribeLater(poiService.poiSelected.subscribe((feature: Feature<Point>) => {
      this.name = feature.get("name");
      this.openingHours = feature.get("opening_hours");
    }));
  }
}
