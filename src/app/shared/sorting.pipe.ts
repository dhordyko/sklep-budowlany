import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces';
@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  transform(products: Product[], category = ''): any {
    if (category === 'all') {
      return products;
    }
    return products.filter((product) => {
      return (
        product.category.replace(/\s|&/g, '').toLocaleLowerCase() ==
        category.replace(/_/g, '')
      );
    });
    //return product.category.trim().toLowerCase() == category;
  }
}
