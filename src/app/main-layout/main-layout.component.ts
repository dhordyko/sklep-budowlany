import {
  Component,
  OnInit,
  Input,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
  HostListener,
  ViewEncapsulation,
  Directive,
} from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';

import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  providers: [ProductService],
})
export class MainLayoutComponent implements OnInit {
  category: 'smart_phones';
  SelectedBrand: string;

  package: any;
  gridsize: number;
  filterData: any[];
  IconPrice: number;
  CartQuantity: number;
  keyUpSubscription: Subscription;
  searchText = '';
  animate = false;
  items: MenuItem[];

  showHomeElement: boolean = false;
  showShopElement: boolean = false;
  showPageElement: boolean = false;
  showElement = false;
  showMainNav = true;
  menucard_class = '';
  navbar_class = '';
  showFiller = false;

  @ViewChild('search') search: ElementRef;
  @ViewChild('sdbSearch') sdbSearch: ElementRef;
  @ViewChild('menu_card') menu_card: ElementRef;

  home_items = ['HOME1', 'HOME2', 'HOME3', 'HOME4', 'HOME5', 'HOME6'];
  shop_items = ['SHOP1', 'SHOP2', 'SHOP3', 'SHOP4', 'SHOP5', 'SHOP6'];
  pages_items = ['PAGE1', 'PAGE2', 'PAGE3', 'PAGE4', 'PAGE5', 'PAGE6'];

  constructor(private prodServ: ProductService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.animate = true;
    }, 100);

    this.prodServ.getProducts();
    this.prodServ.CartTotalPrice.subscribe(
      (total_cost: number) => (this.IconPrice = total_cost)
    );
    this.prodServ.CartTotalQunatity.subscribe(
      (total_qnt: number) => (this.CartQuantity = total_qnt)
    );

    let price = 0;
    let number = 0;

    if (localStorage.getItem('cart')) {
      for (
        let i = 0;
        i < JSON.parse(localStorage.getItem('cart')).length;
        i++
      ) {
        price += Number(JSON.parse(localStorage.getItem('cart'))[i].total);
        number += JSON.parse(localStorage.getItem('cart'))[i].quantity;
      }
    }

    this.CartQuantity = number;
    this.IconPrice = price;
  }
  // ---------show top navbar on scroll event ---------
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    if (window.pageYOffset >= 204) {
      this.showElement = true;
      this.showMainNav = false;
    }
    if (window.pageYOffset <= 205) {
      this.showElement = false;
      this.showMainNav = true;
    }
  }

  // ------navbar animation-------

  showCard(event, card_name: String) {
    if (card_name === 'home') {
      this.showShopElement = false;
      this.showHomeElement = true;
      this.showPageElement = false;
      this.menucard_class =
        'animate__animated animate__slideInDown home-menu-card';
    }
    if (card_name === 'shop') {
      this.showHomeElement = false;
      this.showShopElement = true;
      this.showPageElement = false;
      this.menucard_class =
        'animate__animated animate__slideInDown home-menu-card';
    }
    if (card_name === 'page') {
      this.showHomeElement = false;
      this.showShopElement = false;
      this.showPageElement = true;
      this.menucard_class =
        'animate__animated animate__slideInDown home-menu-card';
    }
  }
  hideCard() {
    this.menucard_class = 'home-menu-card-hide';
  }
  fixCard() {
    this.menucard_class = 'home-menu-card';
  }
  showNav() {
    this.navbar_class = 'animate__animated animate__slideInDown';
    this.showElement = true;
  }
  handleScroll(event) {
    const scrollTop = event.path[0].scrollTop;
  }

  ngAfterViewInit() {
    this.keyUpSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map((event: Event) => (<HTMLInputElement>event.target).value)
      )
      .subscribe((event) => this.prodServ.setSearch(event));

    this.keyUpSubscription = fromEvent(this.sdbSearch.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map((event: Event) => (<HTMLInputElement>event.target).value)
      )
      .subscribe((event) => this.prodServ.setSearch(event));
  }

  value(icon): any {
    if (this.CartQuantity == null) {
      return (icon.matBadge = '0');
    }
    return (icon.matBadge = this.CartQuantity.toString());
  }
  //category vieiconw realization
  setProductCat(category) {
    this.category = category;
    if (this.category !== ('cart' as string)) {
      this.prodServ.setCategory(category);
    }
  }

  //filtering items by prices
}
