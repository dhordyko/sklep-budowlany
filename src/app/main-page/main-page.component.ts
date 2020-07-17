import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../interfaces';
import { Router } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import * as $ from 'jquery';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [],
})
export class MainPageComponent implements OnInit {
  products$;
  sideBarOpen = false;
  brand = this.prodServ.brand;
  category = this.prodServ.category;
  price: number = 0;
  product: boolean;
  keyUpSubscription: Subscription;
  brands: string[] = ['Select All', 'HTC', 'HP', 'Lenovo', 'LG', 'Apple'];
  @Input() data: any = [];
  gridsize: number;
  @ViewChild('search') search: ElementRef;
  @ViewChild('dataview', { static: false }) dataView: DataView;
  sortOptions: SelectItem[];
  rangeValues: number[] = [0, 1000];
  sortKey: string;
  sortField: string;
  paginatorTemplate = '';
  sortOrder: number;
  rangeValues: number[];

  constructor(public prodServ: ProductService, private router: Router) {}

  ngOnInit() {
    // if (localStorage.getItem('products')) {
    //   this.products = JSON.parse(localStorage['products']);
    // }

    this.prodServ.SideBarOpen.subscribe((value) => (this.sideBarOpen = value));

    if (!navigator.onLine) {
      this.router.navigate(['/offline']);
    }

    const promise = this.prodServ.getProducts().toPromise();
    this.products$ = promise.then((data) => data.success.products.data);

    this.sortOptions = [
      { label: 'Manufacturer', value: 'brand' },
      { label: 'Sort by Price : low to high', value: 'lowPriceFirst' },
      { label: 'Sort by Price : high to low', value: 'highPriceFirst' },
      {
        label: 'Sort by Client Discount : low to high',
        value: 'lowDiscountFirst',
      },
      {
        label: 'Sort by Client Discount : high to low',
        value: 'highDiscountFirst',
      },
    ];
  }

  @Output() rangeChange = new EventEmitter<any>();
  formatLabel(value: number) {
    return `${value}zl`;
  }
  paginatorTemplateUpload() {
    return $(
      '.ui-paginator-bottom >.ui-paginator-current.ng-star-inserted'
    ).text();
  }
  // number of items on sorting page
  onSortChange(event) {
    this.prodServ.getSortOption(event.value);
  }
  //fire sortedprice component after slider action
  updateSetting(event) {
    this.gridsize = event.value;
  }
  //filtering items by prices
  filterPrices() {
    this.prodServ.setPrice(this.gridsize);
  }
  //category view realization
  setBrandCat(brand) {
    this.prodServ.setBrand(brand);
  }
  //category vieiconw realization
  setProductCat(category) {
    this.category = category;
    if (this.category !== ('cart' as string)) {
      this.prodServ.setCategory(category);
    }
  }

  LayoutChange(): String {
    if (this.sideBarOpen) {
      return 'column';
    }
    return 'row wrap';
  }
}
