import { Component, Input } from '@angular/core';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent {
  @Input()
  selectedFeature: Feature<Geometry>;

  constructor() {}
}
