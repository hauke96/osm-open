import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DateTimeSelectionService {
  private dateTimeSelectedSubject: Subject<Date> = new Subject<Date>();

  get dateTimeSelected(): Observable<Date> {
    return this.dateTimeSelectedSubject.asObservable();
  }

  selectDateTime(date: Date): void {
    this.dateTimeSelectedSubject.next(date);
  }
}
