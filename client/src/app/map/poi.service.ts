import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Point} from "ol/geom";
import {Feature} from "ol";

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  private dataChangedSubject: Subject<Feature<Point>[]> = new Subject<Feature<Point>[]>();

  get dataChanged(): Observable<Feature<Point>[]> {
    return this.dataChangedSubject.asObservable();
  }

  loadData(): void {
    this.dataChangedSubject.next([new Feature(new Point([1110161, 7085688]))]);
  }
}
