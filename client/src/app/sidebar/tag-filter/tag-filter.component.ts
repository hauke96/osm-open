import { Component } from '@angular/core';
import { FilterService } from '../../common/filter.service';

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
  filterExpression: string;

  constructor(private filterService: FilterService) {
    this.tagTemplates = [
      { name: 'tag-filter.tags.restaurant', tag: 'amenity~(restaurant|fast_food)' },
      { name: 'tag-filter.tags.cafe', tag: 'amenity=cafe' },
      { name: 'tag-filter.tags.bakery', tag: 'shop=bakery' },
      { name: 'tag-filter.tags.supermarket', tag: 'shop~(supermarket|convenience|kiosk)' },
      { name: 'tag-filter.tags.pub', tag: 'amenity~(bar|pub|biergarten)' },
    ];
    this.filterExpression = '';
  }

  onTagFieldChanged(): void {
    this.filterService.filter(this.filterExpression);
  }

  reset(): void {
    this.filterExpression = '';
  }
}
