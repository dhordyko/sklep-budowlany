import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingPipe } from './pipes/sorting.pipe';
import { SortBrandPipe } from './pipes/sort-brand.pipe';
import { PriceSortPipe } from './pipes/price-sort.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { ItemsCountPipe } from './pipes/items-count.pipe';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    SearchPipe,
    SortingPipe,
    SortBrandPipe,
    PriceSortPipe,
    SortByPipe,
    ItemsCountPipe,
  ],
  imports: [CommonModule],
  exports: [
    SearchPipe,
    SortingPipe,
    SortBrandPipe,
    PriceSortPipe,
    SortByPipe,
    ItemsCountPipe,
  ],
})
export class SharedModule {}
