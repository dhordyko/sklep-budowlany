import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  CartQuantity: number;
  showList: boolean = false;
  cartList: any[] = [];

  @Input() IconPrice: number = 0;
  constructor(private prodServ: ProductService) {}

  ngOnInit(): void {
    this.getCartList();
    this.getCartQuantity();
  }
  removeCartItem(id: number) {
    var existItem = this.cartList.find((item) => item.id === id);

    this.prodServ.ProductsCart = this.prodServ.ProductsCart.filter(
      (item) => item.id !== id
    );

    localStorage.setItem('cart', JSON.stringify(this.prodServ.ProductsCart));
    this.cartList = this.prodServ.ProductsCart;
    this.prodServ.cartContent.next(this.cartList);
    this.IconPrice -= existItem.total;
    if (this.IconPrice < 0) {
      this.IconPrice = 0;
    } else this.IconPrice.toFixed(2);
    this.prodServ.CartTotalPrice.next(this.IconPrice);
    this.CartQuantity -= existItem.quantity;
    this.prodServ.CartTotalQunatity.next(this.CartQuantity);
  }

  getCartQuantity() {
    this.prodServ.CartTotalQunatity.subscribe((total_qnt: number) => {
      this.CartQuantity = total_qnt;
    });
  }
  getCartList() {
    this.prodServ.miniCartProducts.subscribe((item: any) => {
      if (item == null) {
        return this.cartList;
      }
      this.cartList = item;
      this.prodServ.cartContent.next(this.cartList);
    });
  }
}
