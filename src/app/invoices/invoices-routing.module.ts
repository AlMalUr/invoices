import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersResolverService } from '../core/resolvers/customers-resolver.service';
import { InvoiceItemResolverService } from '../core/resolvers/invoice-item-resolver.service';
import { InvoicesResolverService } from '../core/resolvers/invoices-resolver.service';
import { ProductsResolverService } from '../core/resolvers/products-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/invoices',
    pathMatch: 'full'
  },
  {
    path: 'invoices',
    loadChildren: './invoices-all/invoices-all.module#InvoicesAllModule',
    resolve: {
      invoices: InvoicesResolverService,
      customers: CustomersResolverService
    }
  },
  {
    path: 'invoices/:id/item',
    loadChildren: './invoice-item/invoice-item.module#InvoiceItemModule',
    resolve: {
      invoices: InvoicesResolverService,
      customers: CustomersResolverService,
      invoiceItem: InvoiceItemResolverService,
      products: ProductsResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
