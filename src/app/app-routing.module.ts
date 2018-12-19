import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolverService } from './core/services/products-services/products-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './content/products/products.module#ProductsModule',
    resolve: [ProductsResolverService]
  },
  {
    path: 'customers',
    loadChildren: './content/customers/customers.module#CustomersModule'
  },
  {
    path: 'invoices',
    loadChildren: './content/invoices/invoices.module#InvoicesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
