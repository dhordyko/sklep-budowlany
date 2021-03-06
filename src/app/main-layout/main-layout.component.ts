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
import { MatSidenavModule } from '@angular/material/sidenav';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  providers: [ProductService],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  gridsize: number;
  filterData: any[];
  cartListContent: any[] = [];
  IconPrice: number = 0;
  CartQuantity: number;
  keyUpSubscription: Subscription;
  searchText = '';

  items: MenuItem[];
  panelOpenState = false;
  showElement = false;
  showMainNav = true;
  navbar_class = '';

  chosenLang: any = [];
  chosenCurrency: any = [];
  @ViewChild('search') search: ElementRef;
  @ViewChild('sdbSearch') sdbSearch: ElementRef;
  @ViewChild('menu_card') menu_card: ElementRef;
  @ViewChild(' cart_list') cart_list: ElementRef;

  mediaSub: Subscription;

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
    this.defaultLangOption();
    this.defaultCurrencyOption();
    this.prodServ.getProducts();
    this.getCartPrice();
    this.getCartQuantity();
    this.showRWDInfo();
    this.prodServ.cartContent.subscribe((item: any) => {
      this.cartListContent = item;
    });
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
  @HostListener('click', ['$event']) onClick(event) {
    if (event.target.id == 'collapseBtnClose') {
      if (document.body.classList.contains('block-scroll')) {
        document.body.classList.remove('block-scroll');
      }

      document.body.classList.add('open-scroll');
    }
    if (event.target.id == 'collapseBtnOpen') {
      if (document.body.classList.contains('open-scroll')) {
        document.body.classList.remove('open-scroll');
      }
      document.body.classList.add('block-scroll');
    }
  }
  // ------navbar animation-------
  defaultLangOption() {
    this.chosenLang = this.languages[0];
  }
  defaultCurrencyOption() {
    this.chosenCurrency = this.currency[0];
  }
  getCartPrice() {
    this.prodServ.CartTotalPrice.subscribe((total_cost: number) => {
      this.IconPrice = Math.round(total_cost * 100) / 100;
      this.IconPrice.toFixed(2);
    });
  }
  showRWDInfo() {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        if (change.mqAlias === 'md') {
          document.body.classList.add('open-scroll');
        }
        console.log(change.mqAlias);
        console.log(change.mediaQuery);
      }
    );
  }

  getCartQuantity() {
    this.prodServ.CartTotalQunatity.subscribe((total_qnt: number) => {
      this.CartQuantity = total_qnt;
    });
  }
  showCartList() {
    this.cart_list.nativeElement.classList.add('show-list');
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
  removeCartItem(id: number) {}
  ngAfterViewInit() {
    this.keyUpSubscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        map((event: Event) => (<HTMLInputElement>event.target).value)
      )
      .subscribe((event) => this.prodServ.setSearch(event));
  }
  goHome(drawer: any) {
    this.router.navigate(['/']);
    drawer.toggle();
    if (document.body.classList.contains('block-scroll')) {
      document.body.classList.remove('block-scroll');
    }
    document.body.classList.add('open-scroll');
  }

  value(icon): any {
    if (this.CartQuantity == null) {
      return (icon.matBadge = '0');
    }
    return (icon.matBadge = this.CartQuantity.toString());
  }
}
