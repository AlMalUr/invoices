import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersResolverService } from './core/resolvers/customers-resolver.service';
import { InvoicesResolverService } from './core/resolvers/invoices-resolver.service';
import { ProductsResolverService } from './core/resolvers/products-resolver.service';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: './content/products/products.module#ProductsModule',
    resolve: [ProductsResolverService]
  },
  {
    path: 'customers',
    loadChildren: './content/customers/customers.module#CustomersModule',
    resolve: [CustomersResolverService]
  },
  {
    path: '',
    loadChildren: './content/invoices/invoices.module#InvoicesModule',
    resolve: [InvoicesResolverService, CustomersResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
