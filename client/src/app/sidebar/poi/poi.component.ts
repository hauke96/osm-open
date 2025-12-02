import { Component, Input } from '@angular/core';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { OpeningHoursService } from '../../common/opening-hours.service';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { PoiDetailsComponent } from '../poi-details/poi-details.component';

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.scss'],
  imports: [NgClass, TranslatePipe, PoiDetailsComponent],
})
export class PoiComponent {
  name: string;
  openingHoursString: string;
  website: string;
  osmWebsite: string;
  isOpen: boolean | undefined;

  private _selectedFeature: Feature<Point> | undefined;
  private _selectedDateTime: Date | undefined;

  constructor(private openingHoursService: OpeningHoursService) {}

  get selectedFeature(): Feature<Point> | undefined {
    return this._selectedFeature;
  }

  @Input()
  set selectedFeature(value: Feature<Point> | undefined) {
    this._selectedFeature = value;
    this.loadFeatureDetails();
  }

  get selectedDateTime(): Date | undefined {
    return this._selectedDateTime;
  }

  @Input()
  set selectedDateTime(value: Date | undefined) {
    this._selectedDateTime = value;
    this.loadFeatureDetails();
  }

  get openingCheckTimeIsNow(): boolean {
    return !this.selectedDateTime;
  }

  loadFeatureDetails(): void {
    const feature = this.selectedFeature;

    if (!feature) {
      this.name = '';
      this.openingHoursString = '';
      this.website = '';
      this.osmWebsite = '';
      this.isOpen = false;
    } else {
      this.name = feature.get('name');
      this.website = feature.get('website');
      this.osmWebsite = this.getOsmWebsite(feature);
      this.openingHoursString = this.openingHoursService.getOpeningHoursString(feature);
      this.isOpen = this.openingHoursService.isOpen(feature, this.selectedDateTime);
    }
  }

  private getOsmWebsite(feature: Feature<Point>): string {
    return 'https://openstreetmap.org/' + feature.get('@type') + '/' + feature.get('@id');
  }
}
