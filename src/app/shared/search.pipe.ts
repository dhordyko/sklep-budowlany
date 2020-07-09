import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces';
import { Router } from '@angular/router';
import { isNull } from 'util';
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  constructor(private router: Router) {}
  filtered: Product[] = [];
  transform(products: Product[], searchText = ''): any[] {
    if (!products) {
      return [];
    }
    if (!searchText) {
      return products;
    }
    searchText = searchText.toLocaleLowerCase();

    this.filtered = products.filter(
      (data) =>
        JSON.stringify(data).toLowerCase().indexOf(searchText.toLowerCase()) !==
        -1
    );

    return this.filtered;
  }
}
