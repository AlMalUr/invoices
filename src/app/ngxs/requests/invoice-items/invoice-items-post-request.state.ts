import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
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
import { PostInvoiceItemsSuccess } from '../../invoice-items/invoice-items-post.actions';


@State<IRequest>({
  name: 'invoiceItemsPostRequestState',
  defaults: requestEntitiesInitial(),
})
export class InvoiceItemsPostRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Action(InvoiceItemsPostRequest)
  invoiceItemsPostRequest(ctx: StateContext<IRequest>, {id, items}: InvoiceItemsPostRequest) {
    ctx.patchState(requestEntitiesLoading());
    return this.requestService
    .post(`invoices/${id}/items`, items.items)
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
    {payload}: InvoiceItemsPostRequestSuccess
  ) {
    ctx.patchState(requestEntitiesSuccess(payload));
    ctx.dispatch(new PostInvoiceItemsSuccess(payload));
  }

  @Action(InvoiceItemsPostRequestFail)
  invoiceItemsPostRequestFail(ctx: StateContext<IRequest>, {payload}: InvoiceItemsPostRequestFail) {
    ctx.patchState(requestEntitiesFail(payload));
    console.error('An error occured: ', payload.message);
  }


}
