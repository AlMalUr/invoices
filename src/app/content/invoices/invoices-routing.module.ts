import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { ProductsComponent } from '../products/products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/invoices',
    pathMatch: 'full'
  },
  {
    path: 'invoices',
    component: InvoicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule {
}
