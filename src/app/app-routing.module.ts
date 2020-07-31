import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { ProductPageComponent } from './product-page/product-page.component';

import { OrderPageComponent } from './order-page/order-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { OfflineComponent } from './offline/offline.component';
import { StartPageComponent } from './start-page/start-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CartTableComponent } from './cart-table/cart-table.component';
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: StartPageComponent },
      { path: 'category/:category', component: MainPageComponent },
      { path: 'product/:id', component: ProductPageComponent },
      { path: 'order', component: OrderPageComponent },
      { path: 'cart', component: CartTableComponent },
      { path: 'offline', component: OfflineComponent },
    ],
  },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
