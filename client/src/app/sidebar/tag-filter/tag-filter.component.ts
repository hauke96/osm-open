import { Component } from '@angular/core';

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

  constructor() {
    this.tagTemplates = [
      { name: 'tag-filter.tags.restaurant', tag: 'amenity~(restaurant|fast_food)' },
      { name: 'tag-filter.tags.cafe', tag: 'amenity=cafe' },
      { name: 'tag-filter.tags.bakery', tag: 'shop=bakery' },
      { name: 'tag-filter.tags.supermarket', tag: 'shop~(supermarket|convenience|kiosk)' },
      { name: 'tag-filter.tags.pub', tag: 'amenity~(bar|pub|biergarten)' },
    ];
  }

  onTagFieldChanged(): void {
    console.log(this.selectedTag);
  }
}
