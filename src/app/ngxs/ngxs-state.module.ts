import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { CustomersState } from './customers/customers.state';
import { InvoiceItemsState } from './invoice-items/invoice-items.state';
import { InvoicesState } from './invoices/invoices.state';
import { ProductsState } from './products/products.state';
import { CustomersRequestState } from './requests/customers/customers-request.state';
import { InvoiceItemsPostRequestState } from './requests/invoice-items/invoice-items-post-request.state';
import { InvoiceItemsRequestState } from './requests/invoice-items/invoice-items-request.state';
import { GetInvoiceRequestState } from './requests/invoice/invoice-get-request.state';
import { PostInvoiceRequestState } from './requests/invoice/invoice-post-request.state';
import { InvoicesRequestState } from './requests/invoices/invoices-request.state';
import { ProductsRequestState } from './requests/products/products-request.state';
import { RequestsState } from './requests/requests.state';


@NgModule({
  imports: [
    NgxsModule.forRoot([
      ProductsState,
      CustomersState,
      InvoicesState,
      InvoiceItemsState,
      RequestsState,
      CustomersRequestState,
      ProductsRequestState,
      InvoicesRequestState,
      GetInvoiceRequestState,
      PostInvoiceRequestState,
      InvoiceItemsRequestState,
      InvoiceItemsPostRequestState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot()
  ]
})
export class NgxsStateModule { }
