import { Injectable } from '@angular/core';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';
import OpeningHours, { optional_conf_param as OptionalObjectParam } from 'opening_hours';

@Injectable({
  providedIn: 'root',
})
export class OpeningHoursService {
  isOpen(feature: Feature<Geometry>, date?: Date): boolean {
    return this.getOpeningHours(feature)?.getState(date) ?? false;
  }

  getOpeningHours(feature: Feature<Geometry>): OpeningHours | undefined {
    // TODO use locale of country the POI is in
    try {
      return new OpeningHours(this.getOpeningHoursString(feature), null, {
        locale: navigator.language,
      } as OptionalObjectParam);
    } catch (e) {
      console.error(
        `Error on feature https://openstreetmap.org/${feature.get('@type')}/${feature.get('@id')} with name
        '${feature.get('name')}' and opening_hours '${this.getOpeningHoursString(feature)}':`
      );
      console.error(e);
      return undefined;
    }
  }

  getOpeningHoursString(feature: Feature<Geometry>): string {
    return feature.get('opening_hours');
  }
}
