import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesResolverService } from './core/services/invoices-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './content/products/products.module#ProductsModule',
    resolve: [InvoicesResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
