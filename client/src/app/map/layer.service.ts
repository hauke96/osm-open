import { Injectable } from '@angular/core';
import BaseLayer from 'ol/layer/Base';
import { Interaction } from 'ol/interaction';

@Injectable({
  providedIn: 'root',
})
export abstract class LayerService {
  abstract addLayer(layer: BaseLayer): void; // TODO remove method

  abstract addInteraction(interaction: Interaction): void; // TODO remove method
}
