import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';

import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MenuItem } from 'primeng/api';
import { Product } from '../interfaces';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  providers: [ProductService],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  category: 'smart_phones';
  SelectedBrand: string;

  package: any;
  gridsize: number;
  filterData: any[];
  IconPrice: number = 0;
  CartQuantity: number;
  keyUpSubscription: Subscription;
  searchText = '';
  animate = false;
  items: MenuItem[];
  panelOpenState = false;
  showElement = false;
  showMainNav = true;
  menucard_class = '';
  navbar_class = '';
  showFiller = false;
  chosenLang: any = [];
  chosenCurrency: any = [];
  @ViewChild('search') search: ElementRef;
  @ViewChild('sdbSearch') sdbSearch: ElementRef;
  @ViewChild('menu_card') menu_card: ElementRef;
  @ViewChild(' cart_list') cart_list: ElementRef;

  mediaSub: Subscription;
  cartList: any[] = [];
  hoverElement: boolean = false;
  languages = [
    {
      lang_name: 'English',
      icon: 'flag-icon-gb',
    },
    { lang_name: 'Polish', icon: 'flag-icon-pl' },
  ];
  currency = [
    {
      name: 'PLN',
      icon: 'flag-icon-pl',
    },
    { name: 'USD', icon: 'flag-icon-us' },
    { name: 'EURO', icon: 'flag-icon-eu' },
  ];

  constructor(
    private prodServ: ProductService,
    private router: Router,
    private mediaObserver: MediaObserver
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    setTimeout(() => {
      this.animate = true;
    }, 100);
    this.chosenLang = this.languages[0];
    this.chosenCurrency = this.currency[0];
    this.prodServ.getProducts();
    this.prodServ.CartTotalPrice.subscribe((total_cost: number) => {
      this.IconPrice = Math.round(total_cost * 100) / 100;
      this.IconPrice.toFixed(2);
    });

    this.prodServ.CartTotalQunatity.subscribe(
      (total_qnt: number) => (this.CartQuantity = total_qnt)
    );
    this.prodServ.miniCartProducts.subscribe((item: any) => {
      this.cartList = item;
    });

    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        console.log(change.mqAlias);
        console.log(change.mediaQuery);
      }
    );
  }
  // ---------show top navbar on scroll event ---------
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    if (window.pageYOffset >= 0) {
      this.showElement = true;
    }
    if (window.pageYOffset <= 0) {
      this.showElement = false;
    }
  }

  // ------navbar animation-------
  showCartList() {
    this.cart_list.nativeElement.classList.add('show-list');
    console.log(this.cart_list.nativeElement.classList);
  }
  hideCartList() {
    this.cart_list.nativeElement.classList.remove('show-list');
  }
  showNav() {
    this.navbar_class = 'animate__animated animate__slideInDown';
    this.showElement = true;
  }
  handleScroll(event) {
    const scrollTop = event.path[0].scrollTop;
  }
  langOption(langOption) {
    this.chosenLang = langOption;
  }
  currencyOption(option) {
    this.chosenCurrency = option;
  }

  ngOnDestroy() {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }
  removeCartItem(id: number) {
    var existItem = this.cartList.find((item) => item.id === id);

    this.prodServ.ProductsCart = this.prodServ.ProductsCart.filter(
      (item) => item.id !== id
    );

    localStorage.setItem('cart', JSON.stringify(this.prodServ.ProductsCart));
    this.cartList = this.prodServ.ProductsCart;
    this.IconPrice -= existItem.total;
    if (this.IconPrice < 0) {
      this.IconPrice = 0;
    } else this.IconPrice.toFixed(2);

    this.CartQuantity -= existItem.quantity;
    console.log(this.IconPrice);
  }
  ngAfterViewInit() {
    this.keyUpSubscription = fromEvent(this.search.nativeElement, 'keyup')
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
