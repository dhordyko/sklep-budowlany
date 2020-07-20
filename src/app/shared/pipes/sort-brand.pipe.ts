import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces';
@Pipe({
  name: 'sortBrand',
})
export class SortBrandPipe implements PipeTransform {
  transform(products: Product[], manufacturer = []): any {
    if (manufacturer.length == 0) {
      return products;
    }
    var array1 = [],
      array2 = [];

    manufacturer.filter((x) =>
      array1.push(x.replace(/\s|&/g, '').toLocaleLowerCase())
    );
    array2.push(
      array1.map(function (e) {
        return products.filter((p) => {
          return p.manufacturer.replace(/\s|&/g, '').toLocaleLowerCase() === e;
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
