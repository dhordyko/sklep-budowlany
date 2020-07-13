import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-start-mobile',
  templateUrl: './start-mobile.component.html',
  styleUrls: ['./start-mobile.component.scss'],
})
export class StartMobileComponent implements OnInit {
  prodsAll$;
  prods$;
  responsiveOptions: any;
  categoryList: any;
  images = [
    'assets/carousel/slider1.jpg',
    'assets/carousel/slider2.jpg',
    'assets/carousel/slider3.jpg',
  ];
  banners = [
    'assets/carousel/banner2.jpg',
    'assets/carousel/banner3.jpg',
    'assets/carousel/banner4.jpg',
    'assets/carousel/banner5.jpg',
  ];
  categories = [
    'assets/carousel/featured.jpg',
    'assets/carousel/featured1.jpg',
    'assets/carousel/featured2.jpg',
    'assets/carousel/featured3.jpg',
    'assets/carousel/featured4.jpg',
    'assets/carousel/featured5.jpg',
    'assets/carousel/featured6.jpg',
    'assets/carousel/featured7.jpg',
  ];
  showArrows = false;

  constructor(private serv: ProductService) {
    this.categoryList = [
      { name: 'Automobiles', image: 'assets/carousel/featured.jpg' },
      { name: 'Jewelry & Watches', image: 'assets/carousel/featured1.jpg' },
      { name: 'Bottoms', image: 'assets/carousel/featured2.jpg' },
      { name: 'Hot Categories', image: 'assets/carousel/featured3.jpg' },
      { name: 'Accessories & Parts', image: 'assets/carousel/featured4.jpg' },
      { name: 'Electronics', image: 'assets/carousel/featured5.jpg' },
      { name: 'Automobiles', image: 'assets/carousel/featured6.jpg' },
      { name: 'Electronics', image: 'assets/carousel/featured7.jpg' },
    ];
    this.responsiveOptions = [
      {
        breakpoint: '1200px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '490px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    const promise = this.serv.getProducts().toPromise();

    this.prodsAll$ = promise.then((data) => data.success.products.data);
    const promise2 = this.serv.getProducts().toPromise();
    this.prods$ = promise2.then((data) =>
      this.chunks(data.success.products.data, 10)
    );
  }

  chunks(array, size) {
    let results = [];
    results = [];
    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
  }
}
