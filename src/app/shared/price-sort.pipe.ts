import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces';
@Pipe({
  name: 'priceSort',
})
export class PriceSortPipe implements PipeTransform {
  transform(products: Product[], price = 5000): any {
    return products.filter((product) => {
      return product.cost <= price;
    });
  }
}
