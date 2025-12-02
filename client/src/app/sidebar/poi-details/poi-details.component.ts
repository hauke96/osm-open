import { Component, Input } from '@angular/core';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';
import {DatePipe} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss'],
  imports: [
    DatePipe,
    TranslatePipe
  ]
})
export class PoiDetailsComponent {
  @Input()
  selectedFeature: Feature<Geometry> | undefined;

  listExpanded: boolean = false;

  private irrelevantKeys = ['@id', '@type', '@timestamp', 'geometry'];

  constructor() {}

  get relevantTags(): [string, string][] {
    if (!this.selectedFeature) {
      return [];
    }

    return Object.entries(this.selectedFeature.getProperties()).filter(t => !this.irrelevantKeys.includes(t[0]));
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
