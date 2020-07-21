import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MaterialSharedModule } from '../shared/material-shared/material-shared.module';
import { NgprimeSharedModule } from '../shared/ngprime-shared/ngprime-shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// --------------------Components---------------------
import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { AllcatMenuComponent } from '../main-layout/allcat-menu/allcat-menu.component';
import { StartPageComponent } from '../start-page/start-page.component';
import { ProductComponent } from '../product/product.component';
import { StartMobileComponent } from '../start-page/start-mobile/start-mobile.component';

import { MainPageComponent } from '../main-page/main-page.component';
import { LongProdCardComponent } from '../main-page/long-prod-card/long-prod-card.component';
@NgModule({
  declarations: [
    MainLayoutComponent,
    AllcatMenuComponent,
    StartPageComponent,
    ProductComponent,
    StartMobileComponent,
    MainPageComponent,
    LongProdCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialSharedModule,
    FlexLayoutModule,
    AppRoutingModule,
    NgprimeSharedModule,
    NgbModule,
  ],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
