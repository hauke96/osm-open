import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Point} from "ol/geom";
import {Feature} from "ol";
import {HttpClient} from "@angular/common/http";
import {Extent} from "ol/extent";
import {fromLonLat, toLonLat} from "ol/proj";

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  private dataChangedSubject: Subject<Feature<Point>[]> = new Subject<Feature<Point>[]>();

  constructor(private httpClient: HttpClient) {
  }

  get dataChanged(): Observable<Feature<Point>[]> {
    return this.dataChangedSubject.asObservable();
  }

  loadData(extent: Extent): void {
    const bottomLeft = toLonLat([extent[0], extent[1]]);
    const topRight = toLonLat([extent[2], extent[3]]);
    const bbox = "(" + bottomLeft[1] + "," + bottomLeft[0] + "," + topRight[1] + "," + topRight[0] + ")";

    let url = "https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(" +
      "node[\"opening_hours\"]" + bbox + ";" +
      "way[\"opening_hours\"]" + bbox + ";" +
      ");out center;";

    this.httpClient.get(url).subscribe((data: any) => {
      console.log(data);
      let features = data.elements.map((element: any) => {
        const feature = new Feature<Point>();
        feature.setProperties(element.tags)

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
  }
}
