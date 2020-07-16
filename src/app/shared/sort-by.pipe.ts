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
    if (SortOption === 'highPriceFirst') {
      return products.sort(function (a, b) {
        if (a.client_price < b.client_price) {
          return 1;
        }
        if (a.client_price > b.client_price) {
          return -1;
        }
        return 0;
      });
    }
    if (SortOption === 'lowDiscountFirst') {
      return products.sort(function (a, b) {
        var convertedA = parseFloat(a.client_discount) / 100.0;
        var convertedB = parseFloat(b.client_discount) / 100.0;
        if (convertedA < convertedB) {
          return -1;
        }
        if (convertedA > convertedB) {
          return 1;
        }
        return 0;
      });
    }
    if (SortOption === 'highDiscountFirst') {
      return products.sort(function (a, b) {
        var convertedA = parseFloat(a.client_discount) / 100.0;
        var convertedB = parseFloat(b.client_discount) / 100.0;
        if (convertedA < convertedB) {
          return 1;
        }
        if (convertedA > convertedB) {
          return -1;
        }
        return 0;
      });
    }
  }
}
