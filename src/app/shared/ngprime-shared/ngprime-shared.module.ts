import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SlideMenuModule } from 'primeng/slidemenu';
import { DataViewModule } from 'primeng/dataview';

import { PanelModule } from 'primeng/panel';

import { PaginatorModule } from 'primeng/paginator';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    CarouselModule,
    GalleriaModule,
    ButtonModule,
    ToastModule,
    SlideMenuModule,
    DataViewModule,
    PanelModule,
    PaginatorModule,
    SliderModule,
    InputTextModule,
  ],
})
export class NgprimeSharedModule {}
