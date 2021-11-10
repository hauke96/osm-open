import { Component } from '@angular/core';
import { PoiService } from '../../map/poi.service';
import { Unsubscriber } from '../../common/ubsunscriber';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { OpeningHoursService } from '../../common/opening-hours.service';
import { DateTimeSelectionService } from '../../common/date-time-selection.service';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.scss']
})
export class PoiDetailsComponent extends Unsubscriber {
  name: string;
  openingHoursString: string;
  website: string;
  osmWebsite: string;
  isNowOpen: boolean;

  private selectedFeature: Feature<Point>;
  private selectedDateTime: Date | undefined;

  constructor(
    private openingHoursService: OpeningHoursService,
    private dateTimeSelectionService: DateTimeSelectionService,
    poiService: PoiService
  ) {
    super();
    this.unsubscribeLater(
      poiService.poiSelected.subscribe((feature: Feature<Point>) => {
        this.selectedFeature = feature;
        this.loadFeatureDetails();
      }),
      this.dateTimeSelectionService.dateTimeSelected.subscribe((dateTime: Date | undefined) => {
        this.selectedDateTime = dateTime;
        this.loadFeatureDetails();
      })
    );
  }

  loadFeatureDetails(): void {
    if (!this.selectedFeature) {
      this.name = '';
      this.openingHoursString = '';
      this.website = '';
      this.osmWebsite = '';
      this.isNowOpen = false;
    } else {
      this.name = this.selectedFeature.get('name');
      this.website = this.getWebsite(this.selectedFeature);
      this.osmWebsite = this.getOsmWebsite(this.selectedFeature);
      this.openingHoursString = this.openingHoursService.getOpeningHoursString(this.selectedFeature);
      this.isNowOpen = this.openingHoursService.isOpen(this.selectedFeature, this.selectedDateTime);
    }
  }

  private getWebsite(feature: Feature<Point>): string {
    let websiteString = '';

    if (feature.get('website')) {
      websiteString = feature.get('website');
    } else if (feature.get('contact:website')) {
      websiteString = feature.get('contact:website');
    }

    return websiteString;
  }

  private getOsmWebsite(feature: Feature<Point>): string {
    return 'https://openstreetmap.org/' + feature.get('@type') + '/' + feature.get('@id');
  }
}
