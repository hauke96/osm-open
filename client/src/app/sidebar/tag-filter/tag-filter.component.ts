import { Component } from '@angular/core';
import { FilterService } from '../../common/filter.service';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';

interface TagTemplate {
  name: string;
  tag: string;
}

@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.scss'],
})
export class TagFilterComponent {
  tagTemplates: TagTemplate[];
  selectedTag: string;

  constructor(private filterService: FilterService) {
    this.tagTemplates = [
      { name: 'tag-filter.tags.restaurant', tag: 'amenity~(restaurant|fast_food)' },
      { name: 'tag-filter.tags.cafe', tag: 'amenity=cafe' },
      { name: 'tag-filter.tags.bakery', tag: 'shop=bakery' },
      { name: 'tag-filter.tags.supermarket', tag: 'shop~(supermarket|convenience|kiosk)' },
      { name: 'tag-filter.tags.pub', tag: 'amenity~(bar|pub|biergarten)' },
    ];
    this.selectedTag = '';
  }

  onTagFieldChanged(): void {
    const key = this.filterService.getKey(this.selectedTag);
    const value = this.filterService.getValue(this.selectedTag);
    const isRegex = this.filterService.isRegex(this.selectedTag);

    if (isRegex) {
      this.filterService.filter((feature: Feature<Geometry>): boolean => {
        return !!feature.get(key) && feature.get(key).match(value) != null;
      });
    } else {
      this.filterService.filter((feature: Feature<Geometry>): boolean => {
        return feature.get(key) === value;
      });
    }
  }

  reset(): void {
    this.selectedTag = '';
  }
}
