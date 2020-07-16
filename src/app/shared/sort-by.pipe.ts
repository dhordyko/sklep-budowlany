import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(products: Product[], SortOption = ''): any[] {
    if (SortOption === '') {
      return products;
    }
    if (SortOption === 'brand') {
      return products.sort(function (a, b) {
        if (a.manufacturer < b.manufacturer) {
          return -1;
        }
        if (a.manufacturer > b.manufacturer) {
          return 1;
        }
        return 0;
      });
    }
    if (SortOption === 'lowPriceFirst') {
      return products.sort(function (a, b) {
        if (a.client_price < b.client_price) {
          return -1;
        }
        if (a.client_price > b.client_price) {
          return 1;
        }
        return 0;
      });
    }
  }
}
