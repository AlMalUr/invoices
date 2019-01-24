import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchInvoiceSuccess } from '../../invoice/invoice.actions';
import { IRequest } from '../requests.interface';
import {
  requestEntitiesDefault,
  requestEntitiesFail,
  requestEntitiesLoading,
  requestEntitiesSuccess
} from '../shared/requests-entities';

import {
  InvoiceRequest,
  InvoiceRequestFail,
  InvoiceRequestReset,
  InvoiceRequestSuccess
} from './invoice-request.action';


@State<IRequest>({
  name: 'invoiceRequestState',
  defaults: requestEntitiesDefault,
})
export class InvoiceRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Action(InvoiceRequest)
  invoiceRequest(ctx: StateContext<IRequest>, {payload: id}: InvoiceRequest) {
    ctx.patchState(requestEntitiesLoading);
    return this.requestService
    .get(`invoices/${id}`)
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
    ctx.patchState({...requestEntitiesSuccess, data: payload});
    ctx.dispatch(new FetchInvoiceSuccess(payload));
  }

  @Action(InvoiceRequestFail)
  invoiceRequestFail(ctx: StateContext<IRequest>, {payload}: InvoiceRequestFail) {
    ctx.patchState({...requestEntitiesFail, data: payload});
    console.error('An error occured: ', payload.message);
  }

  @Action(InvoiceRequestReset)
  invoiceRequestReset({patchState}: StateContext<IRequest>) {
    patchState(requestEntitiesDefault);
  }
}
