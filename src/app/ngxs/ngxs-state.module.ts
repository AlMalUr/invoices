import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { CustomersState } from './customers/customers.state';
import { InvoicesState } from './invoices/invoices.state';
import { ProductsState } from './products/products.state';
import { RequestsState } from './requests/requests.state';
import { CustomersRequestState } from './requests/customers/customers-request.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      ProductsState,
      CustomersState,
      InvoicesState,
      RequestsState,
      CustomersRequestState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ]
})
export class NgxsStateModule { }
