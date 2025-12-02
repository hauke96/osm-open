import { Component } from '@angular/core';
import packageInfo from '../../../../package.json';
import { environment } from '../../../environments/environment';
import { PoiService } from '../../map/poi.service';
import { Unsubscriber } from '../../common/unsubscriber';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { DateTimeSelectionService } from '../../common/date-time-selection.service';
import { DateTimeSelectionComponent } from '../date-time-selection/date-time-selection.component';
import { TagFilterComponent } from '../tag-filter/tag-filter.component';
import { LoadDataComponent } from '../load-data/load-data.component';
import { PoiComponent } from '../poi/poi.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [DateTimeSelectionComponent, TagFilterComponent, LoadDataComponent, PoiComponent, TranslatePipe],
})
export class SidebarComponent extends Unsubscriber {
  version = packageInfo.version;
  sourceRepoUrl = environment.sourceRepoUrl;
  selectedFeature: Feature<Point> | undefined;
  selectedDateTime: Date | undefined;

  constructor(poiService: PoiService, dateTimeSelectionService: DateTimeSelectionService) {
    super();

    this.unsubscribeLater(
      poiService.poiSelected.subscribe((feature: Feature<Point> | undefined) => {
        this.selectedFeature = feature;
      }),
      dateTimeSelectionService.dateTimeSelected.subscribe((dateTime: Date | undefined) => {
        this.selectedDateTime = dateTime;
      })
    );
  }
}
