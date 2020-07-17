import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductComponent } from './product/product.component';
import { ProductPageComponent } from './product-page/product-page.component';

import { SidebarModule } from 'ng-sidebar';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortingPipe } from './shared/sorting.pipe';
import { SortBrandPipe } from './shared/sort-brand.pipe';
import { PriceSortPipe } from './shared/price-sort.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { OrderPageComponent } from './order-page/order-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CartTableComponent } from './cart-table/cart-table.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge';

import { SearchPipe } from './shared/search.pipe';

import { FlexLayoutModule } from '@angular/flex-layout';

import { OfflineComponent } from './offline/offline.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatMenuModule } from '@angular/material/menu';
import { StartPageComponent } from './start-page/start-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AllcatMenuComponent } from './allcat-menu/allcat-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IonicModule } from '@ionic/angular';

import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { StartMobileComponent } from './start-mobile/start-mobile.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SlideMenuModule } from 'primeng/slidemenu';
import { DataViewModule } from 'primeng/dataview';

import { PanelModule } from 'primeng/panel';
import { LongProdCardComponent } from './long-prod-card/long-prod-card.component';
import { PaginatorModule } from 'primeng/paginator';
import { SortByPipe } from './shared/sort-by.pipe';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { ItemsCountPipe } from './shared/items-count.pipe';
@NgModule({
  declarations: [
    AppComponent,
    CartPageComponent,
    MainPageComponent,
    ProductComponent,
    ProductPageComponent,

    SortingPipe,
    SortBrandPipe,
    PriceSortPipe,
    OrderPageComponent,
    CartTableComponent,
    SearchPipe,
    OfflineComponent,
    StartPageComponent,
    AllcatMenuComponent,
    StartMobileComponent,
    MainLayoutComponent,
    LongProdCardComponent,
    SortByPipe,
    ItemsCountPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    IvyCarouselModule,
    SidebarModule,
    MatSidenavModule,
    GalleriaModule,
    CarouselModule,
    ButtonModule,
    SlideMenuModule,
    ToastModule,
    MatExpansionModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatBadgeModule,
    FlexLayoutModule,
    DataViewModule,
    HammerModule,
    PanelModule,
    PaginatorModule,
    SliderModule,
    InputTextModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    NgbModule,
    IonicModule.forRoot(),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
