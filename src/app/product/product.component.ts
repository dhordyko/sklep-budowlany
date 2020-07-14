import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeStyle } from '@angular/platform-browser';
import { ProductService } from '../shared/product.service';
import { CartTableComponent } from '../cart-table/cart-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../interfaces';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [CartTableComponent],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  productImage?: SafeStyle;
  image: any;
  @Input() showElement = false;
  @Input() item: any;
  constructor(
    private sanitizer: DomSanitizer,
    private prodServ: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productImage = this.sanitizer.bypassSecurityTrustStyle(
      'url(' + this.product.url_image + ')'
    );
    this.idPassing();
  }
  getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  showButtons() {
    this.showElement = true;
  }
  hideButtons() {
    this.showElement = false;
  }

  openSnackBar() {
    this._snackBar.open('Product is added to the cart', '', {
      duration: 2000,
    });
  }
  idPassing() {
    this.prodServ.countdownEndSource.next(this.product);
  }

  addToCart() {
    this.prodServ.addToCart(this.product);
    let sum = 0;
    let qnt = 0;

    this.prodServ.ProductsCart.forEach((a) => {
      sum += a.total;
      qnt += a.quantity;
      this.prodServ.CartTotalPrice.next(sum);
      this.prodServ.CartTotalQunatity.next(qnt);
    });

    // this.tbl.ngOnInit();
    // this.prodServ.CartTotalPrice.next(this.tbl.totalPrice);
  }
}
