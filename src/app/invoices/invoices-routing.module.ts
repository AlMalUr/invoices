import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersResolverService } from '../core/resolvers/customers-resolver.service';
import { InvoiceResolverService } from '../core/resolvers/invoice-resolver.service';
import { InvoicesResolverService } from '../core/resolvers/invoices-resolver.service';
import { ProductsResolverService } from '../core/resolvers/products-resolver.service';
import { InvoiceItemsResolverService } from '../core/resolvers/invoice-items-resolver.service';

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
    path: 'invoices/:id',
    loadChildren: './invoice-view/invoice-view.module#InvoiceViewModule',
    resolve: {
      invoice: InvoiceResolverService,
      customers: CustomersResolverService,
      invoiceItems: InvoiceItemsResolverService,
      products: ProductsResolverService
    }
  },
  {
    path: 'invoice-new',
    loadChildren: './invoice-new/invoice-new.module#InvoiceNewModule',
    resolve: {
      products: ProductsResolverService,
      customers: CustomersResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
