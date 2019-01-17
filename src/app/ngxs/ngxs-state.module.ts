import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { CustomersState } from './customers/customers.state';
import { InvoiceItemState } from './invoice-item/invoice-item.state';
import { InvoicesState } from './invoices/invoices.state';
import { ProductsState } from './products/products.state';
import { CustomersRequestState } from './requests/customers/customers-request.state';
import { InvoiceItemRequestState } from './requests/invoice-item/invoice-item-request.state';
import { InvoicesRequestState } from './requests/invoices/invoices-request.state';
import { ProductsRequestState } from './requests/products/products-request.state';
import { RequestsState } from './requests/requests.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      ProductsState,
      CustomersState,
      InvoicesState,
      InvoiceItemState,
      RequestsState,
      CustomersRequestState,
      ProductsRequestState,
      InvoicesRequestState,
      InvoiceItemRequestState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ]
})
export class NgxsStateModule { }
