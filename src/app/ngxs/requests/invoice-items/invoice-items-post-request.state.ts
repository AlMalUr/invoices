import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { InvoiceItemsState } from '../../invoice-items/invoice-items.state';
import { IRequest } from '../requests.interface';
import {
  requestEntitiesFail,
  requestEntitiesInitial,
  requestEntitiesLoading,
  requestEntitiesSuccess
} from '../shared/requests-entities';

import {
  InvoiceItemsPostRequest,
  InvoiceItemsPostRequestFail,
  InvoiceItemsPostRequestSuccess,
} from './invoice-items-post-request.action';



@State<IRequest>({
  name: 'invoiceItemsPostRequestState',
  defaults: requestEntitiesInitial,
})
export class InvoiceItemsPostRequestState {

  constructor(
    private requestService: RequestService,
    private store: Store,
  ) {
  }

  @Action(InvoiceItemsPostRequest)
  invoiceItemsPostRequest(
    ctx: StateContext<IRequest>,
    {payload: id}: InvoiceItemsPostRequest
  ) {
    ctx.patchState(requestEntitiesLoading);
    const items = this.store.selectSnapshot(InvoiceItemsState.getNewItems);
    return this.requestService
    .post(`invoices/${id}/items`, items)
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new InvoiceItemsPostRequestSuccess(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InvoiceItemsPostRequestFail(error));
      }),
    );
  }

  @Action(InvoiceItemsPostRequestSuccess)
  invoiceItemsPostRequestSuccess(
    ctx: StateContext<IRequest>,
    { payload }: InvoiceItemsPostRequestSuccess
  ) {
    return ctx.patchState(requestEntitiesSuccess(payload));
  }

  @Action(InvoiceItemsPostRequestFail)
  invoiceItemsPostRequestFail(
    ctx: StateContext<IRequest>,
    { payload }: InvoiceItemsPostRequestFail
  ) {
    ctx.patchState(requestEntitiesFail(payload));
    return console.error('An error occured: ', payload.message);
  }


}
