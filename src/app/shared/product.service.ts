import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Product, Order } from '../interfaces';
import { Router } from '@angular/router';
import { startWith } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  category = [];
  manufacturer = [];
  brand = 'select all';
  searchText = '';
  price = [];
  order: Partial<Order> = {};
  SortOption = '';
  countdownEndSource = new BehaviorSubject<any>(null);
  CartTotalPrice = new BehaviorSubject<any>(null);
  CartTotalQunatity = new BehaviorSubject<any>(null);
  SideBarOpen = new BehaviorSubject<any>(null);
  miniCartProducts = new BehaviorSubject<any>(null);
  cartContent = new BehaviorSubject<any>(null);
  ProductsCart: Product[] = [];
  sumItems: Product[] = [];
  CACHE_KEY = 'products';
  selectedOption: string;
  itemsPerCategory: number[] = [];
  emphasisWords: string[] = [
    '&lt;![CDATA[',
    ' . &lt;br&gt;&lt;br&gt;',
    '.]]&gt;',
    '&lt;P&gt;&lt;STRONG&gt;NITY ZRYWALNE&lt;/STRONG&gt;&lt;/P&gt;&lt;P&gt;&lt;STRONG&gt;&lt;/STRONG&gt;&lt;BR&gt;',
    '.&lt;BR&gt;&lt;BR&gt;',
    '&lt;br&gt;',
    '&lt;br&gt;]]&gt;',
    '&lt;BR&gt;',
    '&lt;BR&gt;]]&gt;',
    ']]&gt;',
    '&lt',
  ];
  constructor(private http: HttpClient, private router: Router) {}

  // getProducts(): Observable<any> {
  //   return this.http.post<{ [key: string]: Product }>(
  //     `${environment.apiDbUrl}/products`,
  //     []
  //   );
  // }
  getProducts(): Observable<any> {
    const data = this.http.post<{ [key: string]: Product }>(
      `${environment.apiDbUrl}/products`,
      []
    );
    // data.subscribe(
    //   (next: any) =>
    //     (localStorage[this.CACHE_KEY] = JSON.stringify(next.success.products))
    // );
    return data;
  }
  getProduct(id: number): Observable<any> {
    return this.http.post<{ [key: string]: Product }>(
      `${environment.apiDbUrl}/product`,
      { id: id }
    );
  }

  addToCart(product: Product) {
    var existItem = this.ProductsCart.find((item) => item.id === product.id);

    if (existItem) {
      existItem.quantity++;
      existItem.total = existItem.quantity * +existItem.client_price.toFixed(2);
    } else {
      this.ProductsCart.push(product);

      product.quantity = 1;
      product.total = product.quantity * +product.client_price.toFixed(2);
    }

    localStorage.setItem('cart', JSON.stringify(this.ProductsCart));
    this.miniCartProducts.next(JSON.parse(localStorage.getItem('cart')));
  }

  setCategory(category: any[]) {
    this.category = category;
  }
  setManufacturer(manufacturer: any[]) {
    this.manufacturer = manufacturer;
  }
  setPrice(val1: number, val2: number) {
    this.price = [];
    this.price.push(val1, val2);
  }
  setBrand(brand) {
    this.brand = brand.toLowerCase();
  }
  setSearch(searchText) {
    this.searchText = searchText;
  }
  getSortOption(option) {
    this.SortOption = option;
  }
}
