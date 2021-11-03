import {Injectable} from '@angular/core';
import BaseLayer from "ol/layer/Base";

@Injectable({
  providedIn: 'root'
})
export abstract class LayerService {
  abstract addLayer(layer: BaseLayer): void;
}
