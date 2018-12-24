import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { CustomersState } from './customers/customers.state';
import { InvoicesState } from './invoices/invoices.state';
import { ProductsState } from './products/products.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      ProductsState,
      CustomersState,
      InvoicesState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ]
})
export class NgxsStateModule { }
