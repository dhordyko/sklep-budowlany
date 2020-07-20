import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces';
@Pipe({
  name: 'sortBrand',
})
export class SortBrandPipe implements PipeTransform {
  transform(products: Product[], brand = ''): any {
    if (brand === 'select all') {
      return products;
    }
    return products.filter((product) => {
      return product.brand.replace(/\s|&/g, '').toLocaleLowerCase() == brand;
    });
  }
}
