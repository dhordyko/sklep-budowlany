import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  constructor(
    private prodServ: ProductService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  product: Product;
  Productid: any;
  quantity: number = 1;
  ngOnInit(): void {
    var id = this.route.snapshot.params['id'];
    if (!this.product) {
      const promise = this.prodServ.getProduct(id).toPromise();
      promise.then((data) => (this.product = data.success.product));
    }
    // this.prodServ.countdownEndSource.subscribe(
    //   (product) => (this.product = product)
    // );
  }
  addOneItem() {
    if (this.quantity == 50) {
      return;
    }
    this.quantity++;
  }
  removeOneItem() {
    if (this.quantity < 1) {
      return;
    }
    this.quantity--;
  }
  addToCart() {
    this.prodServ.addToCart(this.product);
  }
}
