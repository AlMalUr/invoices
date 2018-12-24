import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    ProductsRoutingModule,
    SharedModule
  ],
  declarations: [ProductsComponent]
})
export class ProductsModule { }
