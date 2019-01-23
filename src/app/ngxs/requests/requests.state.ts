import { Selector, State } from '@ngxs/store';

import { CustomersRequestState } from './customers/customers-request.state';
import { InvoiceItemsRequestState } from './invoice-items/invoice-items-request.state';
import { InvoiceRequestState } from './invoice/invoice-request.state';
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
    InvoiceRequestState,
    InvoicesRequestState,
    InvoiceItemsRequestState,
  ]
})
export class RequestsState {
  @Selector([
    CustomersRequestState,
    ProductsRequestState,
    InvoiceRequestState,
    InvoicesRequestState,
    InvoiceItemsRequestState,
  ])
  static loadingStatus(...states: IRequest[]): boolean {
    return states
      .filter((state) => {
        return state && state.hasOwnProperty('loading') && state.loading;
      })
      .length > 0;
  }
}
