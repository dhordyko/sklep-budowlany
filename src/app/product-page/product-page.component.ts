import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  constructor(
    public prodServ: ProductService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private _formBuilder: FormBuilder
  ) {}
  product: Product;
  Productid: any;
  quantity: number = 1;
  imagesArray = Array<{ images: string }>();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  isActive = false;
  prodsAll$: any;
  responsiveOptions;
  ngOnInit(): void {
    var id = this.route.snapshot.params['id'];
    if (!this.product) {
      const promise = this.prodServ.getProduct(id).toPromise();
      const promiseImg = this.prodServ.getProduct(id).toPromise();
      const promiseAll = this.prodServ.getProducts().toPromise();
      this.prodsAll$ = promiseAll.then((data) => data.success.products.data);
      promise.then((data) => (this.product = data.success.product));
      promiseImg.then((data) => {
        this.imgData(data.success.product.url_images);
      });
    }
    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup = this._formBuilder.group({});
    this.responsiveOptions = [
      {
        breakpoint: '1300px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '1100px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '780px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '600px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  applyClass() {
    console.log('hello');
    this.isActive = true;
  }
  applyHover(event) {
    console.log(event.currentTarget.class);
  }
  addOneItem() {
    if (this.quantity == 50) {
      return;
    }
    this.quantity++;
  }
  imgData(imgs) {
    for (let i of imgs.split('&gt;')) {
      this.imagesArray.push({ images: i });
    }
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
