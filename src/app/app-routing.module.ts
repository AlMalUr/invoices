import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersResolverService } from './core/resolvers/customers-resolver.service';
import { ProductsResolverService } from './core/resolvers/products-resolver.service';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule',
    resolve: {
      products: ProductsResolverService
    }
  },
  {
    path: 'customers',
    loadChildren: './customers/customers.module#CustomersModule',
    resolve: {
      customer: CustomersResolverService
    }
  },
  {
    path: '',
    loadChildren: './invoices/invoices.module#InvoicesModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
