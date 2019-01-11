import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesAllComponent } from './invoices-all.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesAllComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesAllRoutingModule {
}
