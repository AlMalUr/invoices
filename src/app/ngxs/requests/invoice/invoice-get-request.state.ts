import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchInvoiceSuccess } from '../../invoice/invoice.actions';
import { IRequest } from '../requests.interface';
import {
  requestEntitiesFail,
  requestEntitiesInitial,
  requestEntitiesLoading,
  requestEntitiesSuccess
} from '../shared/requests-entities';

import {
  InvoiceGetRequest,
  InvoiceGetRequestFail,
  InvoiceGetRequestReset,
  InvoiceGetRequestSuccess
} from './invoice-get-request.action';


@State<IRequest>({
  name: 'invoiceGetRequestState',
  defaults: requestEntitiesInitial(),
})
export class InvoiceGetRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Action(InvoiceGetRequest)
  invoiceGetRequest(ctx: StateContext<IRequest>, {payload: id}: InvoiceGetRequest) {
    ctx.patchState(requestEntitiesLoading());
    return this.requestService
    .get(`invoices/${id}`)
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new InvoiceGetRequestSuccess(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InvoiceGetRequestFail(error));
      }),
    );
  }

  @Action(InvoiceGetRequestSuccess)
  invoiceGetRequestSuccess(
    ctx: StateContext<IRequest>,
    {payload}: InvoiceGetRequestSuccess
  ) {
    ctx.patchState(requestEntitiesSuccess(payload));
    ctx.dispatch(new FetchInvoiceSuccess(payload));
  }

  @Action(InvoiceGetRequestFail)
  invoiceGetRequestFail(ctx: StateContext<IRequest>, {payload}: InvoiceGetRequestFail) {
    ctx.patchState(requestEntitiesFail(payload));
    console.error('An error occured: ', payload.message);
  }

  @Action(InvoiceGetRequestReset)
  invoiceGetRequestReset({patchState}: StateContext<IRequest>) {
    patchState(requestEntitiesInitial());
  }
}
