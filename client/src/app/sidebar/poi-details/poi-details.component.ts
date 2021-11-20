import { Component, Input } from '@angular/core';
import { Unsubscriber } from '../../common/unsubscriber';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { OpeningHoursService } from '../../common/opening-hours.service';
import { DateTimeSelectionService } from '../../common/date-time-selection.service';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss'],
})
export class PoiDetailsComponent extends Unsubscriber {
  name: string;
  openingHoursString: string;
  website: string;
  osmWebsite: string;
  isOpen: boolean;
  selectedDateTime: Date | undefined;

  private _selectedFeature: Feature<Point> | undefined;

  constructor(
    private openingHoursService: OpeningHoursService,
    private dateTimeSelectionService: DateTimeSelectionService
  ) {
    super();
    this.unsubscribeLater(
      this.dateTimeSelectionService.dateTimeSelected.subscribe((dateTime: Date | undefined) => {
        this.selectedDateTime = dateTime;
        this.loadFeatureDetails();
      })
    );
  }

  get selectedFeature(): Feature<Point> | undefined {
    return this._selectedFeature;
  }

  @Input()
  set selectedFeature(value: Feature<Point> | undefined) {
    this._selectedFeature = value;
    this.loadFeatureDetails();
  }

  get openingCheckTimeIsNow(): boolean {
    return !this.selectedDateTime;
  }

  loadFeatureDetails(): void {
    if (!this._selectedFeature) {
      this.name = '';
      this.openingHoursString = '';
      this.website = '';
      this.osmWebsite = '';
      this.isOpen = false;
    } else {
      this.name = this._selectedFeature.get('name');
      this.website = this._selectedFeature.get('website');
      this.osmWebsite = this.getOsmWebsite(this._selectedFeature);
      this.openingHoursString = this.openingHoursService.getOpeningHoursString(this._selectedFeature);
      this.isOpen = this.openingHoursService.isOpen(this._selectedFeature, this.selectedDateTime);
    }
  }

  private getOsmWebsite(feature: Feature<Point>): string {
    return 'https://openstreetmap.org/' + feature.get('@type') + '/' + feature.get('@id');
  }
}
