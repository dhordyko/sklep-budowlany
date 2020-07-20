import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../interfaces';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-long-prod-card',
  templateUrl: './long-prod-card.component.html',
  styleUrls: ['./long-prod-card.component.scss'],
})
export class LongProdCardComponent implements OnInit {
  @Input() product: Product;
  productImage?: SafeStyle;
  image: any;
  @Input() showElement = false;
  @Input() item: any;

  constructor(
    private sanitizer: DomSanitizer,
    private prodServ: ProductService
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
