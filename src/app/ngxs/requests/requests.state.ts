import { Selector, State } from '@ngxs/store';

import { CustomersRequestState } from './customers/customers-request.state';
import { InvoiceItemsPostRequestState } from './invoice-items/invoice-items-post-request.state';
import { InvoiceItemsRequestState } from './invoice-items/invoice-items-request.state';
import { GetInvoiceRequestState } from './invoice/invoice-get-request.state';
import { PostInvoiceRequestState } from './invoice/invoice-post-request.state';
import { InvoicesRequestState } from './invoices/invoices-request.state';
import { ProductsRequestState } from './products/products-request.state';
import { IRequest } from './requests.interface';

export class RequestsStateModel {
}

@State<RequestsStateModel>({
  name: 'requests',
  defaults: {},
  children: [
    CustomersRequestState,
    ProductsRequestState,
    GetInvoiceRequestState,
    PostInvoiceRequestState,
    InvoicesRequestState,
    InvoiceItemsRequestState,
    InvoiceItemsPostRequestState
  ]
})
export class RequestsState {
  @Selector([
    CustomersRequestState,
    ProductsRequestState,
    GetInvoiceRequestState,
    PostInvoiceRequestState,
    InvoicesRequestState,
    InvoiceItemsRequestState,
    InvoiceItemsPostRequestState
  ])
  static loadingStatus(...states: IRequest[]): boolean {
    return states
      .filter((state) => {
        return state && state.hasOwnProperty('loading') && state.loading;
      })
      .length > 0;
  }
}
