import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchInvoiceItemsSuccess, } from '../../invoice-items/invoice-items.actions';
import { IRequest } from '../requests.interface';
import {
  requestEntitiesFail,
  requestEntitiesInitial,
  requestEntitiesLoading,
  requestEntitiesSuccess
} from '../shared/requests-entities';

import {
  InvoiceItemsRequest,
  InvoiceItemsRequestFail,
  InvoiceItemsRequestReset,
  InvoiceItemsRequestSuccess,
} from './invoice-items-request.action';


@State<IRequest>({
  name: 'invoiceItemsRequestState',
  defaults: requestEntitiesInitial,
})
export class InvoiceItemsRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Action(InvoiceItemsRequest)
  invoiceItemsRequest(ctx: StateContext<IRequest>, {payload: id}: InvoiceItemsRequest) {
    ctx.patchState(requestEntitiesLoading);
    return this.requestService
    .get(`invoices/${id}/items`)
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new InvoiceItemsRequestSuccess(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InvoiceItemsRequestFail(error));
      }),
    );
  }

  @Action(InvoiceItemsRequestSuccess)
  invoiceItemsRequestSuccess(
    ctx: StateContext<IRequest>,
    {payload}: InvoiceItemsRequestSuccess
  ) {
    ctx.patchState(requestEntitiesSuccess(payload));
    return ctx.dispatch(new FetchInvoiceItemsSuccess(payload));
  }

  @Action(InvoiceItemsRequestFail)
  invoiceItemsRequestFail(
    ctx: StateContext<IRequest>,
    {payload}: InvoiceItemsRequestFail
  ) {
    ctx.patchState(requestEntitiesFail(payload));
    return console.error('An error occured: ', payload.message);
  }

  @Action(InvoiceItemsRequestReset)
  invoiceItemsRequestReset(
    {patchState}: StateContext<IRequest>
  ) {
    return patchState(requestEntitiesInitial);
  }
}
