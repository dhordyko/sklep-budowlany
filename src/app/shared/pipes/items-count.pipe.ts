import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces';

@Pipe({
  name: 'itemsCount',
})
export class ItemsCountPipe implements PipeTransform {
  transform(products: Product[], sortValue = ''): unknown {
    if ((sortValue = '')) {
      return null;
    }
  }
}
