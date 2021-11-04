import {Component} from '@angular/core';
import {PoiService} from "../../map/poi.service";
import {Unsubscriber} from "../../common/ubsunscriber";
import {Point} from "ol/geom";
import {Feature} from "ol";
import opening_hours, {optional_conf_param} from "opening_hours";
import {OpeningHoursService} from "../../common/opening-hours.service";

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss']
})
export class PoiDetailsComponent extends Unsubscriber {
  name: string;
  openingHoursString: string;
  isNowOpen: boolean;

  constructor(poiService: PoiService, openingHoursService: OpeningHoursService) {
    super();
    this.unsubscribeLater(poiService.poiSelected.subscribe((feature: Feature<Point>) => {
      if (!feature) {
        this.name = "";
        this.openingHoursString = "";
        this.isNowOpen = false;
      } else {
        this.name = feature.get("name");
        this.openingHoursString = openingHoursService.getOpeningHoursString(feature);
        this.isNowOpen = openingHoursService.isOpen(feature);
      }
    }));
  }
}
