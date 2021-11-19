import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateTimeSelectionService {
  private $dateTimeSelected: Subject<Date | undefined> = new Subject<Date | undefined>();

  get dateTimeSelected(): Observable<Date | undefined> {
    return this.$dateTimeSelected.asObservable();
  }

  selectDateTime(date: Date): void {
    this.$dateTimeSelected.next(date);
  }

  resetSelectedDateTime(): void {
    this.$dateTimeSelected.next(undefined);
  }
}
