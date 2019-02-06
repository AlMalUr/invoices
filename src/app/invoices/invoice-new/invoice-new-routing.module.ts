import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoiceNewGuard } from '../../core/guards/invoice-new.guard';

import { InvoiceNewComponent } from './invoice-new.component';

const routes: Routes = [
  { path: '',
    component: InvoiceNewComponent,
    canDeactivate: [InvoiceNewGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceNewRoutingModule { }
