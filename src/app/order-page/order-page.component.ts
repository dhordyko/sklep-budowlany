import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Order, Product } from '../interfaces';
import { ProductService } from '../shared/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  cartProducts: Product[] = [];
  order: Partial<Order> = {};
  shippingMode: string[] = ['DHL', 'Inpost'];
  submited = false;
  allCartPrices: string[] = [];
  IconPrice: number;

  constructor(
    private _formBuilder: FormBuilder,
    private prodServ: ProductService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.prodServ.ProductsCart;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.allCartPrices.push(this.cartProducts[i].id.toString());
    }

    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      address: ['', Validators.required],
      city: [''],
      country: ['', Validators.required],
      postIndex: [''],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.secondFormGroup = this._formBuilder.group({
      shippingMode: ['', Validators.required],
      orderInfo: [''],
      payment: ['', Validators.required],
    });
    this.checkTotalPrice();
  }

  checkTotalPrice() {
    this.http
      .post('https://front-api.onlinemagento.com/summarize', {
        ids: this.allCartPrices,
      })

      .subscribe((res) => (this.IconPrice = res['success'].price));
  }
  getErrorMessage() {
    if (this.firstFormGroup.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.firstFormGroup.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }
  goForward(stepper) {
    if (this.submited) {
      stepper.next();
    }
    return;
  }
  FirstStepCheck(stepper) {
    if (!this.firstFormGroup.valid) {
      stepper.focus;
    } else {
      console.log('valid');

      stepper.next();
    }

    // checkbtn.disabled = false;
    // stepper.next();
  }
  submit(stepper) {
    if (
      !this.firstFormGroup.valid &&
      !this.secondFormGroup.valid &&
      this.IconPrice == null
    ) {
      return;
    }

    this.submited = true;
    this.order = {
      name: this.firstFormGroup.value.firstName,
      lastName: this.firstFormGroup.value.lastName,
      address: this.firstFormGroup.value.address,
      city: this.firstFormGroup.value.city,
      country: this.firstFormGroup.value.country,
      postIndex: this.firstFormGroup.value.postIndex,
      phone: this.firstFormGroup.value.phone,
      email: this.firstFormGroup.value.email,
      shipping: this.secondFormGroup.value.shippingMode,
      orderInfo: this.secondFormGroup.value.orderInfo,
      paymanet: this.secondFormGroup.value.paymanet,
      orders: this.cartProducts,
    };
    stepper.next();

    this.prodServ.CartTotalPrice.next(null);
    this.prodServ.CartTotalQunatity.next(null);
    localStorage.removeItem('cart');
    this.prodServ.ProductsCart = [];
  }
  // vertical Stepper Submit function
  Vertsubmit(Vertsubmit) {
    if (
      !this.firstFormGroup.valid &&
      !this.secondFormGroup.valid &&
      this.IconPrice == null
    ) {
      return;
    }

    this.submited = true;
    this.order = {
      name: this.firstFormGroup.value.firstName,
      lastName: this.firstFormGroup.value.lastName,
      address: this.firstFormGroup.value.address,
      city: this.firstFormGroup.value.city,
      country: this.firstFormGroup.value.country,
      postIndex: this.firstFormGroup.value.postIndex,
      phone: this.firstFormGroup.value.phone,
      email: this.firstFormGroup.value.email,
      shipping: this.secondFormGroup.value.shippingMode,
      orderInfo: this.secondFormGroup.value.orderInfo,
      paymanet: this.secondFormGroup.value.paymanet,
      orders: this.cartProducts,
    };
    Vertsubmit.next();

    this.prodServ.CartTotalPrice.next(null);
    this.prodServ.CartTotalQunatity.next(null);
    localStorage.removeItem('cart');
    this.prodServ.ProductsCart = [];
  }
}
