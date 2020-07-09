import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductService } from '../shared/product.service';
import { CartTableComponent } from '../cart-table/cart-table.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [CartTableComponent],
})
export class ProductComponent implements OnInit {
  @Input() product;
  profileImage?: SafeUrl;
  image: any;
  @Input() showElement = false;
  @Input() item: any;
  constructor(
    private sanitizer: DomSanitizer,
    private prodServ: ProductService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.profileImage = this.sanitizer.bypassSecurityTrustUrl(
      this.product.image
    );
    this.image = this.profileImage['changingThisBreaksApplicationSecurity'];
    this.idPassing();
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
