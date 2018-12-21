import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolverService } from './core/services/products-services/products-resolver.service';
import { CustomersResolverService } from './core/services/customers-services/customers-resolver.service';
import { InvoicesResolverService } from './core/services/invoices-services/invoices-resolver.service';

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
    resolve: [InvoicesResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
