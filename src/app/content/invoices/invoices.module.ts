import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    SharedModule
  ],
  declarations: [InvoicesComponent]
})
export class InvoicesModule { }
