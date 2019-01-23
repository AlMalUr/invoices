import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchInvoiceSuccess } from '../../invoice/invoice.actions';
import { IRequest } from '../requests.interface';

import {
  InvoiceRequest,
  InvoiceRequestFail,
  InvoiceRequestReset,
  InvoiceRequestSuccess
} from './invoice-request.action';


@State<IRequest>({
  name: 'invoiceRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
export class InvoiceRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Action(InvoiceRequest)
  invoiceRequest(ctx: StateContext<IRequest>, {payload: id}: InvoiceRequest) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.requestService
    .get('invoices/' + id)
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new InvoiceRequestSuccess(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InvoiceRequestFail(error));
      }),
    );
  }

  @Action(InvoiceRequestSuccess)
  invoiceRequestSuccess(
    ctx: StateContext<IRequest>,
    {payload}: InvoiceRequestSuccess
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: payload,
    });
    ctx.dispatch(new FetchInvoiceSuccess(payload));
  }

  @Action(InvoiceRequestFail)
  invoiceRequestFail(ctx: StateContext<IRequest>, {payload}: InvoiceRequestFail) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: payload,
    });
    console.error('An error occured: ', payload.message);
  }

  @Action(InvoiceRequestReset)
  invoiceRequestReset({patchState}: StateContext<IRequest>) {
    patchState({
      loading: false,
      loaded: false,
      status: 'reset',
      data: null
    });
  }
}
