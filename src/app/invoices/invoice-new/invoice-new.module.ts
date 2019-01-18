import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { InvoiceNewRoutingModule } from './invoice-new-routing.module';
import { InvoiceNewComponent } from './invoice-new.component';

@NgModule({
  declarations: [InvoiceNewComponent],
  imports: [
    InvoiceNewRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class InvoiceNewModule { }
