import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchCustomerItemSuccess, FetchInvoiceItemSuccess, } from '../../invoice-item/invoice-item.actions';
import { IRequest } from '../requests.interface';

import {
  CustomerItemRequest, CustomerItemRequestSuccess,
  InvoiceItemRequest,
  InvoiceItemRequestFail,
  InvoiceItemRequestReset,
  InvoiceItemRequestSuccess,
} from './invoice-item-request.action';


@State<IRequest>({
  name: 'InvoiceItemRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
export class InvoiceItemRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Action(InvoiceItemRequest)
  invoiceItemRequest(ctx: StateContext<IRequest>, {payload: id}: InvoiceItemRequest) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.requestService
    .get('invoices/' + id)
    // .get('invoices/' + id + '/items')
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new InvoiceItemRequestSuccess(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InvoiceItemRequestFail(error));
      }),
    );
  }

  @Action(InvoiceItemRequestSuccess)
  invoiceItemRequestSuccess(
    ctx: StateContext<IRequest>,
    {payload}: InvoiceItemRequestSuccess
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: payload,
    });
    ctx.dispatch(new FetchInvoiceItemSuccess(payload));
  }

  @Action(InvoiceItemRequestFail)
  invoiceItemRequestFail(ctx: StateContext<IRequest>, {payload}: InvoiceItemRequestFail) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: payload,
    });
    console.error('An error occured: ', payload.message);
  }

  @Action(InvoiceItemRequestReset)
  invoiceItemRequestReset({patchState}: StateContext<IRequest>) {
    patchState({
      loading: false,
      loaded: false,
      status: 'reset',
      data: null
    });
  }

  @Action(CustomerItemRequest)
  customerItemRequest(ctx: StateContext<IRequest>, {payload: id}: CustomerItemRequest) {
    return this.requestService
    .get('customers/' + id)
    // .get('invoices/' + id + '/items')
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new CustomerItemRequestSuccess(res));
      }),
    //  catchError(error => {
    //    return ctx.dispatch(new InvoiceItemRequestFail(error));
    //  }),
    );
  }
  @Action(CustomerItemRequestSuccess)
  customerItemRequestSuccess(
    ctx: StateContext<IRequest>,
    {payload}: CustomerItemRequestSuccess
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: payload,
    });
    ctx.dispatch(new FetchCustomerItemSuccess(payload));
  }
}
