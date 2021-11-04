import {Injectable} from '@angular/core';
import {Geometry} from "ol/geom";
import {Feature} from "ol";
import opening_hours, {optional_conf_param} from "opening_hours";

@Injectable({
  providedIn: 'root'
})
export class OpeningHoursService {
  isOpen(feature: Feature<Geometry>, date?: Date): boolean {
    return this.getOpeningHours(feature).getState(date);
  }

  getOpeningHours(feature: Feature<Geometry>): opening_hours {
    // TODO use locale of country the POI is in
    return new opening_hours(this.getOpeningHoursString(feature), null, {locale: "de"} as optional_conf_param);
  }

  getOpeningHoursString(feature: Feature<Geometry>): string {
    return feature.get("opening_hours");
  }
}
