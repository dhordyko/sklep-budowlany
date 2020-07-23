import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces';
import { ProductService } from '../product.service';
@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  constructor(private prodServ: ProductService) {}
  transform(products: Product[], category = []): any {
    if (category.length === 0) {
      console.log(products);
      return products;
    }

    var array1 = [],
      array2 = [];

    category.filter((x) =>
      array1.push(x.replace(/\s|&/g, '').toLocaleLowerCase())
    );
    array2.push(
      array1.map(function (e) {
        return products.filter((p) => {
          return (
            p.categories
              .split('&gt;')[0]
              .replace(/\s|&/g, '')
              .toLocaleLowerCase() === e
          );
        });
      })
    );

    var arr = [];

    for (let i of array2) {
      arr = [...i];
    }

    var newArray = Array.prototype.concat.apply([], arr);
    return (products = newArray);
  }
}
