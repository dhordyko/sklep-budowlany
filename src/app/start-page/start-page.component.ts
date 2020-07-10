import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../shared/product.service';
import { forkJoin } from 'rxjs';
import { IgxCarouselComponent } from 'igniteui-angular';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  styles: [
    `
      .carousel-demo
        .ui-carousel
        .ui-carousel-content
        .ui-carousel-item
        .car-details
        > .p-grid {
        border: 1px solid #b3c2ca;
        border-radius: 3px;
        margin: 0.3em;
        text-align: center;
        padding: 2em 0 2.25em 0;
      }
      .carousel-demo
        .ui-carousel
        .ui-carousel-content
        .ui-carousel-item
        .car-data
        .car-title {
        font-weight: 700;
        font-size: 20px;
        margin-top: 24px;
      }
      .carousel-demo
        .ui-carousel
        .ui-carousel-content
        .ui-carousel-item
        .car-data
        .car-subtitle {
        margin: 0.25em 0 2em 0;
      }
      .carousel-demo
        .ui-carousel
        .ui-carousel-content
        .ui-carousel-item
        .car-data
        button {
        margin-left: 0.5em;
      }
      .carousel-demo
        .ui-carousel
        .ui-carousel-content
        .ui-carousel-item
        .car-data
        button:first-child {
        margin-left: 0;
      }
      .carousel-demo .ui-carousel.custom-carousel .ui-carousel-dot-icon {
        width: 16px !important;
        height: 16px !important;
        border-radius: 50%;
      }
      .carousel-demo
        .ui-carousel.ui-carousel-horizontal
        .ui-carousel-content
        .ui-carousel-item.ui-carousel-item-start
        .car-details
        > .p-grid {
        margin-left: 0.6em;
      }
      .carousel-demo
        .ui-carousel.ui-carousel-horizontal
        .ui-carousel-content
        .ui-carousel-item.ui-carousel-item-end
        .car-details
        > .p-grid {
        margin-right: 0.6em;
      }
    `,
  ],
})
export class StartPageComponent implements OnInit {
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
  @ViewChild('carousel') public carousel: IgxCarouselComponent;
  prods$;
  prodsAll$;
  cars: any[];
  public loop = true;
  public pause = true;
  public slides: any[] = [];
  bannerAnimClass = '';
  showArrows = false;
  public total: number;
  public current: number;
  responsiveOptions;
  gridsize: number;
  public _opened: boolean = false;
  menucard_class = '';

  Development;
  brands: string[] = ['Select All', 'HTC', 'HP', 'Lenovo', 'LG', 'Apple'];

  constructor(config: NgbCarouselConfig, private serv: ProductService) {
    // customize default values of carousels used by this component tree
    config.interval = 100000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
    // this.carousel.stop();
    //this.total = this.slides.length;
    //this.current = this.carousel.current;
    const promise = this.serv.getProducts().toPromise();
    const promiseAll = this.serv.getProducts().toPromise();
    this.prods$ = promise.then((data) =>
      this.chunks(data.success.products.data, 5)
    );
    this.prodsAll$ = promiseAll.then((data) => data.success.products.data);
    this.responsiveOptions = [
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
        breakpoint: '600px',
        numVisible: 2,
        numScroll: 1,
      },
    ];
  }

  chunks(array, size) {
    let results = [];
    results = [];
    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
  }

  randomIndex() {
    return Math.floor(Math.random() * (10 - 1)) + 1;
  }
  //category view realization
  setBrandCat(brand) {
    this.serv.setBrand(brand);
  }
  @Output() rangeChange = new EventEmitter<any>();
  formatLabel(value: number) {
    return `${value}zl`;
  }
  filterPrices() {
    this.serv.setPrice(this.gridsize);
  }

  //sidebar show-hide
  public _toggleSidebar() {
    this._opened = !this._opened;
    this.serv.SideBarOpen.next(this._opened);
  }
  //fire sortedprice component after slider action
  updateSetting(event) {
    this.gridsize = event.value;
    // this.router.navigate(['sortedprice']);
  }
  hideCard() {
    this.menucard_class = 'home-menu-card-hide';
  }

  public onSlideChanged(carousel: IgxCarouselComponent) {
    this.current = carousel.current + 1;
  }
}