import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces';
@Pipe({
  name: 'priceSort',
})
export class PriceSortPipe implements PipeTransform {
  transform(products: Product[], price: number[] = []): any {
    console.log(price);
    if (price.length == 0) {
      return products;
    }
    return products.filter((product) => {
      return (
        product.client_price >= price[0] && product.client_price <= price[1]
      );
    });
  }
}
