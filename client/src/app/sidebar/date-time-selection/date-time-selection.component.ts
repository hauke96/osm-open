import { Component } from '@angular/core';
import { DateTimeSelectionService } from '../../common/date-time-selection.service';

@Component({
  selector: 'app-date-time-selection',
  templateUrl: './date-time-selection.component.html',
  styleUrls: ['./date-time-selection.component.scss']
})
export class DateTimeSelectionComponent {
  date: string;
  time: string;

  constructor(private dateTimeSelectionService: DateTimeSelectionService) {}

  onInputChanged(): void {
    if (!this.date || !this.time) {
      this.dateTimeSelectionService.resetSelectedDateTime();
      return;
    }

    const dateObject = new Date(this.date + ' ' + this.time);

    this.dateTimeSelectionService.selectDateTime(dateObject);
  }
}
