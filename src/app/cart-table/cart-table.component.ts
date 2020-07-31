import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { DataSource } from '@angular/cdk/collections';
import { Product } from '../interfaces';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss'],
})
export class CartTableComponent implements OnInit {
  ///dataSource = new UserDataSource(this.prodService);

  dataSource = new MatTableDataSource<Product>(this.prodService.ProductsCart);
  products: Product[] = [];
  quantity: number = 1;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  CartProducts: Product[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'remove',
  ];
  displayedColumns1 = ['product', 'name', 'quantity', 'remove'];
  displayedFooterColumns = ['product', 'name', 'quantity'];
  constructor(
    private prodService: ProductService,
    private router: Router,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('cart')) {
      this.prodService.ProductsCart = JSON.parse(localStorage.getItem('cart'));
      console.log(this.prodService.ProductsCart);
    }
    this.dataSource = new MatTableDataSource<Product>(
      this.prodService.ProductsCart
    );
    this.products = this.prodService.ProductsCart;

    for (let i = 0; i < this.prodService.ProductsCart.length; i++) {
      this.totalPrice += Number(this.prodService.ProductsCart[i].total);
      this.totalQuantity += this.prodService.ProductsCart[i].quantity;

      this.CartProducts = this.prodService.ProductsCart;
      if (localStorage.getItem('cart')) {
        this.CartProducts = JSON.parse(localStorage.getItem('cart'));
      }
      // this.prodService.CartTotalPrice.next(this.totalPrice);
      // this.prodService.CartTotalQunatity.next(this.totalQuantity);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  addOneItem(id: number) {
    var existItem = this.prodService.ProductsCart.find(
      (item) => item.id === id
    );
    if (!existItem && existItem.quantity == 50) {
      return;
    }
    existItem.quantity++;
    existItem.total += +existItem.cost;
    this.totalPrice += +existItem.cost;
    localStorage.setItem('cart', JSON.stringify(this.prodService.ProductsCart));
    this.totalQuantity++;
    this.prodService.CartTotalPrice.next(this.totalPrice);
    this.prodService.CartTotalQunatity.next(this.totalQuantity);
  }
  removeOneItem(id: number) {
    var existItem = this.prodService.ProductsCart.find(
      (item) => item.id === id
    );

    if (existItem.quantity == 0) {
      return;
    } else {
      existItem.quantity--;
      existItem.total -= +existItem.cost;
      this.totalPrice -= +existItem.cost;
      localStorage.setItem(
        'cart',
        JSON.stringify(this.prodService.ProductsCart)
      );
      this.totalQuantity--;
      this.prodService.CartTotalPrice.next(this.totalPrice);
      this.prodService.CartTotalQunatity.next(this.totalQuantity);
    }
  }

  removeCartItem(id: number) {
    var existItem = this.prodService.ProductsCart.find(
      (item) => item.id === id
    );

    this.prodService.ProductsCart = this.prodService.ProductsCart.filter(
      (item) => item.id !== id
    );
    this.dataSource = new MatTableDataSource<Product>(
      this.prodService.ProductsCart
    );
    this.products = this.prodService.ProductsCart;
    localStorage.setItem('cart', JSON.stringify(this.prodService.ProductsCart));
    this.totalPrice -= existItem.total;
    this.totalQuantity -= existItem.quantity;
    this.prodService.CartTotalPrice.next(this.totalPrice);
    this.prodService.CartTotalQunatity.next(this.totalQuantity);
  }
}

export class UserDataSource extends DataSource<any> {
  constructor(private prodService: ProductService) {
    super();
  }

  connect(): Observable<Product[]> {
    return of(Object.values(this.prodService.ProductsCart));
  }
  disconnect() {}
}
