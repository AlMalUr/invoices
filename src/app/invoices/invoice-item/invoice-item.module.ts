import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { InvoiceItemRoutingModule } from './invoice-item-routing.module';
import { InvoiceItemComponent } from './invoice-item.component';

@NgModule({
  declarations: [InvoiceItemComponent],
  imports: [
    InvoiceItemRoutingModule,
    SharedModule,
  ]
})
export class InvoiceItemModule { }
