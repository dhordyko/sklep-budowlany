import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces';
@Pipe({
  name: 'priceSort',
})
export class PriceSortPipe implements PipeTransform {
  transform(products: Product[], price = 20): any {
    return products.filter((product) => {
      return product.client_price <= price;
    });
  }
}
