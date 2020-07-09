import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../interfaces';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  CartProducts: Product[] = [];
  totalPrice: 0;

  constructor(private prodServ: ProductService) {}

  ngOnInit(): void {
    this.CartProducts = this.prodServ.ProductsCart;
    if (localStorage.getItem('cart')) {
      this.CartProducts = JSON.parse(localStorage.getItem('cart'));
    }

    // for (let i = 0; i < this.CartProducts.length; i++) {
    //   this.totalPrice += this.CartProducts[i].cost;
    // }
  }
}
