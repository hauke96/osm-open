import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateTimeSelectionService {
  private dateTimeSelectedSubject: Subject<Date | undefined> = new Subject<Date | undefined>();

  get dateTimeSelected(): Observable<Date | undefined> {
    return this.dateTimeSelectedSubject.asObservable();
  }

  selectDateTime(date: Date): void {
    this.dateTimeSelectedSubject.next(date);
  }

  resetSelectedDateTime() {
    this.dateTimeSelectedSubject.next(undefined);
  }
}
