import { Injectable } from '@angular/core';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';
import OpeningHours, { optional_conf_param as OptionalObjectParam } from 'opening_hours';

@Injectable({
  providedIn: 'root',
})
export class OpeningHoursService {
  isOpen(feature: Feature<Geometry>, date?: Date): boolean | undefined {
    const state = this.getOpeningHours(feature)?.getState(date);
    return state === undefined ? undefined : state;
  }

  getOpeningHours(feature: Feature<Geometry>): OpeningHours | undefined {
    const openingHoursString = this.getOpeningHoursString(feature);
    if (!openingHoursString) {
      return undefined;
    }

    try {
      return new OpeningHours(openingHoursString, null, {
        // TODO use locale of country the POI is in
        locale: navigator.language,
      } as OptionalObjectParam);
    } catch (e) {
      console.error(
        `Error on feature https://openstreetmap.org/${feature.get('@type')}/${feature.get('@id')} with name
        '${feature.get('name')}' and opening_hours '${openingHoursString}':`
      );
      console.error(e);
      return undefined;
    }
  }

  getOpeningHoursString(feature: Feature<Geometry>): string {
    return feature.get('opening_hours');
  }
}
