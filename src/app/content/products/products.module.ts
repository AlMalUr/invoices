import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatTableModule
  ],
  declarations: [ProductsComponent]
})
export class ProductsModule { }
