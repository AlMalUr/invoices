import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';

@NgModule({
  imports: [
    InvoicesRoutingModule,
    SharedModule
  ],
  declarations: [InvoicesComponent]
})
export class InvoicesModule { }
