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
  category = 'all';
  brand = 'select all';
  searchText = '';
  price: number = 5000;
  order: Partial<Order> = {};
  countdownEndSource = new BehaviorSubject<any>(null);
  CartTotalPrice = new BehaviorSubject<any>(null);
  CartTotalQunatity = new BehaviorSubject<any>(null);
  SideBarOpen = new BehaviorSubject<any>(null);

  ProductsCart: Product[] = [];
  sumItems: Product[] = [];
  CACHE_KEY = 'products';
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
      existItem.total = existItem.quantity * +existItem.cost;
    } else {
      this.ProductsCart.push(product);

      product.quantity = 1;
      product.total = product.quantity * +product.cost;
    }

    localStorage.setItem('cart', JSON.stringify(this.ProductsCart));
  }

  setCategory(category) {
    this.category = category.toLowerCase();
  }
  setPrice(price) {
    this.price = price;
  }
  setBrand(brand) {
    this.brand = brand.toLowerCase();
  }
  setSearch(searchText) {
    this.searchText = searchText;
  }
}