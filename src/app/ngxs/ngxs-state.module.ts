import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { CustomersState } from './customers/customers.state';
import { InvoiceItemsState } from './invoice-items/invoice-items.state';
import { InvoiceState } from './invoice/invoice.state';
import { InvoicesState } from './invoices/invoices.state';
import { ProductsState } from './products/products.state';
import { CustomersRequestState } from './requests/customers/customers-request.state';
import { InvoiceItemsRequestState } from './requests/invoice-items/invoice-items-request.state';
import { InvoiceRequestState } from './requests/invoice/invoice-request.state';
import { InvoicesRequestState } from './requests/invoices/invoices-request.state';
import { ProductsRequestState } from './requests/products/products-request.state';
import { RequestsState } from './requests/requests.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      ProductsState,
      CustomersState,
      InvoicesState,
      InvoiceState,
      InvoiceItemsState,
      RequestsState,
      CustomersRequestState,
      ProductsRequestState,
      InvoicesRequestState,
      InvoiceRequestState,
      InvoiceItemsRequestState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ]
})
export class NgxsStateModule { }
