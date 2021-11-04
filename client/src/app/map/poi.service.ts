import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Point} from "ol/geom";
import {Feature} from "ol";
import {HttpClient} from "@angular/common/http";
import {Extent} from "ol/extent";
import {fromLonLat, toLonLat} from "ol/proj";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  private dataChangedSubject: Subject<Feature<Point>[]> = new Subject<Feature<Point>[]>();
  private poiSelectedSubject: Subject<Feature<Point>> = new Subject<Feature<Point>>();

  constructor(private httpClient: HttpClient) {
  }

  get dataChanged(): Observable<Feature<Point>[]> {
    return this.dataChangedSubject.asObservable();
  }

  get poiSelected(): Observable<Feature<Point>> {
    return this.poiSelectedSubject.asObservable();
  }

  loadData(extent: Extent): Observable<void> {
    const bottomLeft = toLonLat([extent[0], extent[1]]);
    const topRight = toLonLat([extent[2], extent[3]]);
    const bbox = "(" + bottomLeft[1] + "," + bottomLeft[0] + "," + topRight[1] + "," + topRight[0] + ")";

    let url = "https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(" +
      "node[\"opening_hours\"]" + bbox + ";" +
      "way[\"opening_hours\"]" + bbox + ";" +
      ");out center;";

    return this.httpClient
      .get<any>(url)
      .pipe(
        map((data: any) => {
          let features = data.elements.map((element: any) => {
            const feature = new Feature<Point>();
            feature.setProperties(element.tags);
            feature.set("@id", element.id);

            let lon: number;
            let lat: number;

            if (!!element.center) {
              lon = element.center.lon;
              lat = element.center.lat;
            } else {
              lon = element.lon;
              lat = element.lat;
            }

            feature.setGeometry(new Point(fromLonLat([lon, lat])))
            return feature;
          });
          this.dataChangedSubject.next(features);
        })
      );
  }

  selectPoi(feature: Feature<Point>): void {
    this.poiSelectedSubject.next(feature);
  }
}
