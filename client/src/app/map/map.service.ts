import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private $currentZoomLevelChanges: Subject<number> = new Subject<number>();

  get currentZoomLevelChanged(): Observable<number> {
    return this.$currentZoomLevelChanges.asObservable();
  }

  zoomLevelChanged(newZoomLevel: number): void {
    this.$currentZoomLevelChanges.next(newZoomLevel);
  }
}
