import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { InvoiceViewRoutingModule } from './invoice-view-routing.module';
import { InvoiceViewComponent } from './invoice-view.component';

@NgModule({
  declarations: [InvoiceViewComponent],
  imports: [
    InvoiceViewRoutingModule,
    SharedModule,
  ]
})
export class InvoiceViewModule { }
