import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  HostListener,
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
  chosenLang: any = [];
  chosenCurrency: any = [];
  @ViewChild('search') search: ElementRef;
  @ViewChild('sdbSearch') sdbSearch: ElementRef;
  @ViewChild('menu_card') menu_card: ElementRef;

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

  constructor(private prodServ: ProductService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.animate = true;
    }, 100);
    this.chosenLang = this.languages[0];
    this.chosenCurrency = this.currency[0];
    this.prodServ.getProducts();
    this.prodServ.CartTotalPrice.subscribe(
      (total_cost: number) =>
        (this.IconPrice = Math.round(total_cost * 100) / 100)
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
    if (window.pageYOffset >= 0) {
      this.showElement = true;
    }
    if (window.pageYOffset <= 0) {
      this.showElement = false;
    }
  }

  // ------navbar animation-------

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
