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
    this.tagTemplates = [{ name: 'tag-filter.tags.restaurant', tag: 'amenity=restaurant' }];
  }

  onTagFieldChanged(): void {
    console.log(this.selectedTag);
  }
}
