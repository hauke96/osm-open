import { Component } from '@angular/core';
import { DateTimeSelectionService } from '../../common/date-time-selection.service';
import { ActivatedRoute, Router } from '@angular/router';
import {TranslatePipe} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-date-time-selection',
  templateUrl: './date-time-selection.component.html',
  styleUrls: ['./date-time-selection.component.scss'],
  imports: [
    TranslatePipe,
    FormsModule
  ]
})
export class DateTimeSelectionComponent {
  date: string;
  time: string;

  constructor(
    private dateTimeSelectionService: DateTimeSelectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.queryParams.subscribe(params => {
      this.date = '';
      this.time = '';

      const dateParam = params['date'] + '';
      if (dateParam.match(/^\d\d\d\d-\d\d-\d\d_\d\d:\d\d$/)) {
        this.date = dateParam.slice(0, 10);
        this.time = dateParam.slice(11, 16);
      }

      if (!this.date || !this.time) {
        this.dateTimeSelectionService.resetSelectedDateTime();
        return;
      }

      const dateObject = new Date(this.date + ' ' + this.time);
      this.dateTimeSelectionService.selectDateTime(dateObject);
    });
  }

  onInputChanged(): void {
    if (!this.date || !this.time) {
      return;
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { date: this.date + '_' + this.time },
      queryParamsHandling: 'merge',
    });
  }
}
