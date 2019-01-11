import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { InvoicesAllRoutingModule } from './invoices-all-routing.module';
import { InvoicesAllComponent } from './invoices-all.component';

@NgModule({
  imports: [
    InvoicesAllRoutingModule,
    SharedModule
  ],
  declarations: [InvoicesAllComponent]
})
export class InvoicesAllModule { }
