import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { MaterialSharedModule } from './shared/material-shared/material-shared.module';
import { NgprimeSharedModule } from './shared/ngprime-shared/ngprime-shared.module';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// --------------------Components---------------------
import { MainLayoutModule } from './main-layout/main-layout.module';
import { AppComponent } from './app.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartTableComponent } from './cart-table/cart-table.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OfflineComponent } from './offline/offline.component';

@NgModule({
  declarations: [
    AppComponent,
    CartPageComponent,
    ProductPageComponent,
    OrderPageComponent,
    CartTableComponent,
    OfflineComponent,
  ],
  imports: [
    MainLayoutModule,
    NgprimeSharedModule,
    MaterialSharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HammerModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
