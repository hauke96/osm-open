import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Extent } from 'ol/extent';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private $currentMapViewChanged: Subject<[number, Extent]> = new Subject<[number, Extent]>();

  get currentMapViewChanged(): Observable<[number, Extent]> {
    return this.$currentMapViewChanged.asObservable();
  }

  mapViewChanged(zoomLevel: number, extent: Extent): void {
    this.$currentMapViewChanged.next([zoomLevel, extent]);
  }
}
