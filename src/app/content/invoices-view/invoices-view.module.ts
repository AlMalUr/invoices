import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { InvoicesViewRoutingModule } from './invoices-view-routing.module';
import { InvoicesViewComponent } from './invoices-view.component';

@NgModule({
  declarations: [InvoicesViewComponent],
  imports: [
    InvoicesViewRoutingModule,
    SharedModule
  ]
})
export class InvoicesViewModule { }
