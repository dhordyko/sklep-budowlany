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

import { Router } from '@angular/router';
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
  brands: string[] = ['Select All', 'HTC', 'HP', 'Lenovo', 'LG', 'Apple'];
  @Input() data: any = [];
  gridsize: number;

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
  }
  @Output() rangeChange = new EventEmitter<any>();
  formatLabel(value: number) {
    return `${value}zl`;
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
