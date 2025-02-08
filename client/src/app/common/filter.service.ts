import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private $filterExpression: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public filter(newExpression: string): void {
    this.$filterExpression.next(newExpression);
  }

  public get currentFilterExpression(): string {
    return this.$filterExpression.value;
  }

  public asOverpassQuery(): string {
    const isRegex = FilterService.isRegex(this.currentFilterExpression);

    let separator = '=';
    if (isRegex) {
      separator = '~';
    }

    const splitResult = this.currentFilterExpression.split(separator);
    const key = splitResult.shift();
    const values = splitResult.join(separator);
    return `["${key}"${separator}"${values}"]`;
  }

  public static isRegex(tag: string): boolean {
    return tag.match(/^[^=~]*~.*$/) != null;
  }
}
