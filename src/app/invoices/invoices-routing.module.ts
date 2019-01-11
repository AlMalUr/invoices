import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersResolverService } from '../core/resolvers/customers-resolver.service';
import { InvoicesResolverService } from '../core/resolvers/invoices-resolver.service';

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
    loadChildren: './invoice-view/invoices-view.module#InvoicesViewModule',
    resolve: {
      invoices: InvoicesResolverService,
      customers: CustomersResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
