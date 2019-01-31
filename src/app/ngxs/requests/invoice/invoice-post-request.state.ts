import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { PostInvoiceItems } from '../../invoice-items/invoice-items-post.actions';
import { PostInvoiceSuccess } from '../../invoice/invoice-post.actions';
import { IRequest } from '../requests.interface';
import {
  requestEntitiesFail,
  requestEntitiesInitial,
  requestEntitiesLoading,
  requestEntitiesSuccess
} from '../shared/requests-entities';

import {
  InvoicePostRequest,
  InvoicePostRequestFail,
  InvoicePostRequestSuccess
} from './invoice-post-request.action';


@State<IRequest>({
  name: 'invoicePostRequestState',
  defaults: requestEntitiesInitial(),
})
export class InvoicePostRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Action(InvoicePostRequest)
  invoicePostRequest(ctx: StateContext<IRequest>, {payload: newInvoice}: InvoicePostRequest) {
    ctx.patchState(requestEntitiesLoading());
    return this.requestService
    .post('invoices', newInvoice)
    .pipe(
      tap((res: any) => {
        ctx.dispatch(new PostInvoiceItems(res._id, newInvoice));
        return ctx.dispatch(new InvoicePostRequestSuccess(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InvoicePostRequestFail(error));
      }),
    );
  }

  @Action(InvoicePostRequestSuccess)
  invoicePostRequestSuccess(
    ctx: StateContext<IRequest>,
    {payload}: InvoicePostRequestSuccess
  ) {
    ctx.patchState(requestEntitiesSuccess(payload));
    ctx.dispatch(new PostInvoiceSuccess(payload));
  }

  @Action(InvoicePostRequestFail)
  invoicePostRequestFail(ctx: StateContext<IRequest>, {payload}: InvoicePostRequestFail) {
    ctx.patchState(requestEntitiesFail(payload));
    console.error('An error occured: ', payload.message);
  }
}
