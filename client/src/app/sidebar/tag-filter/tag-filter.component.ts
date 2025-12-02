import { Component } from '@angular/core';
import { FilterService } from '../../common/filter.service';
import { ActivatedRoute, Router } from '@angular/router';

interface TagTemplate {
  name: string;
  tag: string;
}

@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.scss'],
  standalone: false,
})
export class TagFilterComponent {
  tagTemplates: TagTemplate[] = [];
  filterExpression: string = '';

  constructor(
    private filterService: FilterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.tagTemplates = [
      { name: 'tag-filter.tags.restaurant', tag: 'amenity~(restaurant|fast_food)' },
      { name: 'tag-filter.tags.cafe', tag: 'amenity=cafe' },
      { name: 'tag-filter.tags.bakery', tag: 'shop=bakery' },
      { name: 'tag-filter.tags.supermarket', tag: 'shop~(supermarket|convenience|kiosk)' },
      { name: 'tag-filter.tags.pub', tag: 'amenity~(bar|pub|biergarten)' },
      { name: 'tag-filter.tags.nightlife', tag: 'amenity~(bar|nightclub|music_venue|theatre)' },
      { name: 'tag-filter.tags.atm', tag: 'amenity=atm' },
      { name: 'tag-filter.tags.bank', tag: 'amenity=bank' },
    ];

    this.activatedRoute.queryParams.subscribe(params => {
      this.filterExpression = '';

      const filterParam = params['filter'];
      if (filterParam != null) {
        this.filterExpression = filterParam + '';
      }

      this.filterService.filter(this.filterExpression);
    });
  }

  onTagFieldChanged(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { filter: this.filterExpression },
      queryParamsHandling: 'merge',
    });
  }

  reset(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { filter: '' },
      queryParamsHandling: 'merge',
    });
  }
}
