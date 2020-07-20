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

  @Input() data: any = [];
  gridsize: number;
  @ViewChild('search') search: ElementRef;
  @ViewChild('dataview', { static: false }) dataView: DataView;
  ElementRef;
  sortOptions: SelectItem[];
  rangeSliderValues: number[] = [0, 1000];
  sortKey: string;
  sortField: string;
  paginatorTemplate = '';
  sortOrder: number;
  rangeValues: number[];
  sortItemsNumber = 0;

  categoriesData: any[] = [];
  manufacturerData: any[] = [];
  categoryItemsLength = [];
  manufItemsLength = [];
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
      var allcatarray = [];
      var manarray = [];
      var allmanarray = [];
      for (let i in data.success.products.data) {
        allcatarray.push(data.success.products.data[i].categories);
        if (
          !catarray.find(
            (val) => val === data.success.products.data[i].categories
          )
        ) {
          catarray.push(data.success.products.data[i].categories);
        }
        // ================manufacturer categories==============
        allmanarray.push(data.success.products.data[i].manufacturer);
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
      this.itemsPerCategory(allcatarray, this.categoriesData);
      this.itemsPerManufacturer(allmanarray, this.manufacturerData);
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
      var name = categories[i].split('&gt;')[0].toLocaleLowerCase();

      if (!this.categoriesData.find((val) => val.name === name)) {
        this.categoriesData.push({
          name: name,
          checked: false,
        });
      }
    }
  }
  manufacturerDataSet(manufacturers) {
    for (let i in manufacturers) {
      this.manufacturerData.push({
        brand: manufacturers[i].toLocaleLowerCase(),
        checked: false,
      });
    }
  }

  itemsPerCategory(catarray, catdata) {
    var array1 = [];
    var array2 = [];

    catdata.filter((x) => array1.push(x.name.replace(/\s|&/g, '')));

    array2.push(
      array1.map(function (e) {
        return catarray.filter((p) => {
          return (
            p.split('&gt;')[0].replace(/\s|&/g, '').toLocaleLowerCase() === e
          );
        });
      })
    );

    array2.filter((x) => {
      for (let i of x) {
        this.categoryItemsLength.push(i.length);
      }
    });
  }
  itemsPerManufacturer(catarray, catdata) {
    var array1 = [];
    var array2 = [];

    catdata.filter((x) => array1.push(x.brand.replace(/\s|&/g, '')));

    array2.push(
      array1.map(function (e) {
        return catarray.filter((p) => {
          return (
            p.split('&gt;')[0].replace(/\s|&/g, '').toLocaleLowerCase() === e
          );
        });
      })
    );

    array2.filter((x) => {
      for (let i of x) {
        this.manufItemsLength.push(i.length);
      }
    });
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
  setProductCat() {
    var checkedCat = this.categoriesData
      .filter((x) => x.checked === true)
      .map((x) => x.name);
    this.prodServ.setCategory(checkedCat);
  }
  setManufacturer() {
    var checkedMan = this.manufacturerData
      .filter((x) => x.checked === true)
      .map((x) => x.brand);
    this.prodServ.setManufacturer(checkedMan);
  }

  LayoutChange(): String {
    if (this.sideBarOpen) {
      return 'column';
    }
    return 'row wrap';
  }
}
