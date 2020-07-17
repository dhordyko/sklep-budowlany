import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemsCount'
})
export class ItemsCountPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
