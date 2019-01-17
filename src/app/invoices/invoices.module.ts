import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InvoicesRoutingModule } from './invoices-routing.module';

@NgModule({
  imports: [
    CommonModule,
    InvoicesRoutingModule,
  ]
})
export class InvoicesModule { }
