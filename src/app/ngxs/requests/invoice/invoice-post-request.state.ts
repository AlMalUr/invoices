import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { CreateInvoiceSuccess } from '../../invoices/invoices.actions';
import { IRequest } from '../requests.interface';
import {
  requestEntitiesFail,
  requestEntitiesInitial,
  requestEntitiesLoading,
  requestEntitiesSuccess
} from '../shared/requests-entities';

import {
  PostInvoiceRequest,
  PostInvoiceRequestFail,
  PostInvoiceRequestSuccess
} from './invoice-post-request.action';
import { InvoiceItemsPostRequest } from '../invoice-items/invoice-items-post-request.action';


@State<IRequest>({
  name: 'postInvoiceRequestState',
  defaults: requestEntitiesInitial,
})
export class PostInvoiceRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Selector()
  static getStatus(state: InvoiceItemsPostRequest) {
    return state;
  }

  @Action(PostInvoiceRequest)
  postInvoiceRequest(
    ctx: StateContext<IRequest>,
    { payload: newInvoice }: PostInvoiceRequest
  ) {
    ctx.patchState(requestEntitiesLoading);
    return this.requestService
    .post('invoices', newInvoice)
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new PostInvoiceRequestSuccess(res));
      }),
      catchError(error => {
        return ctx.dispatch(new PostInvoiceRequestFail(error));
      }),
    );
  }

  @Action(PostInvoiceRequestSuccess)
  postInvoiceRequestSuccess(
    ctx: StateContext<IRequest>,
    {payload}: PostInvoiceRequestSuccess
  ) {
    ctx.patchState(requestEntitiesSuccess(payload));
    ctx.dispatch(new CreateInvoiceSuccess(payload));
  }

  @Action(PostInvoiceRequestFail)
  postInvoiceRequestFail(
    ctx: StateContext<IRequest>,
    {payload}: PostInvoiceRequestFail
  ) {
    ctx.patchState(requestEntitiesFail(payload));
    return console.error('An error occured: ', payload.message);
  }
}
