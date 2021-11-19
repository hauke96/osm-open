import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterSubject: Subject<(feature: Feature<Geometry>) => boolean> = new Subject();

  get filter(): Observable<(feature: Feature<Geometry>) => boolean> {
    return this.filterSubject.asObservable();
  }

  public filterFeatures(filterFunction: (feature: Feature<Geometry>) => boolean): void {
    this.filterSubject.next(filterFunction);
  }

  getKey(tag: string): string {
    return tag.split(/[=~]/)[0];
  }

  getValue(tag: string): string {
    return tag.split(/[=~]/)[1];
  }

  isRegex(tag: string): boolean {
    return tag.match(/\w*~\w*/) != null;
  }
}
