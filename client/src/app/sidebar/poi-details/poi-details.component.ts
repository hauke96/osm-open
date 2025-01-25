import { Component, Input } from '@angular/core';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss'],
})
export class PoiDetailsComponent {
  @Input()
  selectedFeature: Feature<Geometry> | undefined;

  listExpanded: boolean = false;

  private relevantKeys = [
    'addr:street',
    'addr:housenumber',
    'addr:postcode',
    'contact:phone',
    'contact:website',
    'contact:facebook',
    'name',
    'website',
    'phone',
    'wheelchair',
    'wheelchair:description',
    'toilets',
    'toilets:wheelchair',
    'changing_table',
    'opening_hours',
  ];

  constructor() {}

  get relevantTags(): [string, string][] {
    if (!this.selectedFeature) {
      return [];
    }

    return Object.entries(this.selectedFeature.getProperties()).filter(t => this.relevantKeys.includes(t[0]));
  }

  get lastEditDate(): Date {
    return new Date(this.selectedFeature?.get('@timestamp'));
  }

  isUrl(value: string): boolean {
    let url;

    try {
      url = new URL(value);
    } catch {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }
}
