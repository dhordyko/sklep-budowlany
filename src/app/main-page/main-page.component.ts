import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  @Input() data: any = [];

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
  LayoutChange(): String {
    if (this.sideBarOpen) {
      return 'column';
    }
    return 'row wrap';
  }
}
