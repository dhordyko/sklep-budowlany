import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../interfaces';
import { Router } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { DataView } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import * as $ from 'jquery';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {
  products$;
  sideBarOpen = false;
  brand = this.prodServ.brand;
  category = this.prodServ.category;
  price: number = 0;
  product: boolean;
  keyUpSubscription: Subscription;
  brands: string[] = ['Select All', 'HTC', 'HP', 'Lenovo', 'LG', 'Apple'];
  @Input() data: any = [];
  gridsize: number;
  @ViewChild('search') search: ElementRef;
  @ViewChild('dataview', { static: false }) dataView: DataView;
  sortOptions: SelectItem[];
  rangeSliderValues: number[] = [0, 1000];
  sortKey: string;
  sortField: string;
  paginatorTemplate = '';
  sortOrder: number;
  rangeValues: number[];
  sortItemsNumber = 0;
  categoriesDataItem = { label: '', value: '' };
  categoriesData: any[] = [];
  manufacturerData: any[] = [];
  constructor(
    public prodServ: ProductService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {
    setInterval(() => {
      this.paginatorTemplateUpload();
      // require view to be updated
      this.ref.markForCheck();
    }, 500);
  }

  ngOnInit() {
    // if (localStorage.getItem('products')) {
    //   this.products = JSON.parse(localStorage['products']);
    // }

    if (!navigator.onLine) {
      this.router.navigate(['/offline']);
    }

    const promise = this.prodServ.getProducts().toPromise();
    this.products$ = promise.then((data) => data.success.products.data);
    promise.then((data) => {
      var catarray = [];
      var manarray = [];
      for (let i in data.success.products.data) {
        if (
          !catarray.find(
            (val) => val === data.success.products.data[i].categories
          )
        ) {
          catarray.push(data.success.products.data[i].categories);
        }
        // ================manufacturer categories==============
        if (
          !manarray.find(
            (val) => val === data.success.products.data[i].manufacturer
          )
        ) {
          manarray.push(data.success.products.data[i].manufacturer);
        }
      }
      this.categoryDataSet(catarray);
      this.manufacturerDataSet(manarray);
    });

    this.sortOptions = [
      { label: 'Manufacturer', value: 'brand' },
      { label: 'Sort by Price : low to high', value: 'lowPriceFirst' },
      { label: 'Sort by Price : high to low', value: 'highPriceFirst' },
      {
        label: 'Sort by Client Discount : low to high',
        value: 'lowDiscountFirst',
      },
      {
        label: 'Sort by Client Discount : high to low',
        value: 'highDiscountFirst',
      },
    ];
  }

  categoryDataSet(categories) {
    for (let i in categories) {
      var name = categories[i].split('&gt;')[0];
      var subname1 = categories[i].split('&gt;')[1];
      var subname2 = categories[i].split('&gt;')[
        categories[i].split('&gt;').length - 1
      ];
      if (!this.categoriesData.find((val) => val.type === subname1)) {
        this.categoriesData.push({
          name: name,
          type: subname1,
          form: subname2,
        });
      }
    }

    console.log(this.categoriesData);
  }
  manufacturerDataSet(manufacturers) {
    for (let i in manufacturers) {
      this.manufacturerData.push({ brand: manufacturers[i] });
    }

    console.log(this.manufacturerData);
  }

  @Output() rangeChange = new EventEmitter<any>();
  formatLabel(value: number) {
    return `${value}zl`;
  }
  paginatorTemplateUpload() {
    return $(
      '.ui-paginator-bottom >.ui-paginator-current.ng-star-inserted'
    ).text();
  }
  // number of items on sorting page
  onSortChange(event) {
    this.prodServ.getSortOption(event.value);
  }

  //filtering items by prices
  filterPrices() {
    this.prodServ.setPrice(
      this.rangeSliderValues[0],
      this.rangeSliderValues[1]
    );
  }
  //category view realization
  setBrandCat(brand) {
    this.prodServ.setBrand(brand);
  }
  //category vieiconw realization
  setProductCat(category) {
    this.category = category;
    if (this.category !== ('cart' as string)) {
      this.prodServ.setCategory(category);
    }
  }

  LayoutChange(): String {
    if (this.sideBarOpen) {
      return 'column';
    }
    return 'row wrap';
  }
}
