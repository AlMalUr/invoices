import { Selector, State } from '@ngxs/store';

import { CustomersRequestState } from './customers/customers-request.state';
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
    InvoicesRequestState
  ]
})
export class RequestsState {
  @Selector([
    CustomersRequestState,
    ProductsRequestState,
    InvoicesRequestState
  ])
  static loadingStatus(...states: IRequest[]): boolean {
    return states
      .filter((state) => {
        return state && state.hasOwnProperty('loading') && state.loading;
      })
      .length > 0;
  }
}
