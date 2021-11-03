import {Component} from '@angular/core';
import {PoiService} from "../../map/poi.service";
import {Unsubscriber} from "../../common/ubsunscriber";
import {Point} from "ol/geom";
import {Feature} from "ol";
import opening_hours, {mode, optional_conf_param} from "opening_hours";

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss']
})
export class PoiDetailsComponent extends Unsubscriber {
  name: string;
  openingHoursString: string;
  isNowOpen: boolean;

  constructor(private poiService: PoiService) {
    super();
    this.unsubscribeLater(poiService.poiSelected.subscribe((feature: Feature<Point>) => {
      this.name = feature.get("name");
      this.openingHoursString = feature.get("opening_hours");

      // TODO use locale of country the POI is in
      let openingHours = new opening_hours(this.openingHoursString, null, {locale: "de"} as optional_conf_param);
      this.isNowOpen = openingHours.getState();
    }));
  }
}
