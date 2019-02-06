import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchInvoiceSuccess } from '../../invoices/invoices.actions';
import { IRequest } from '../requests.interface';
import {
  requestEntitiesFail,
  requestEntitiesInitial,
  requestEntitiesLoading,
  requestEntitiesSuccess
} from '../shared/requests-entities';

import {
  GetInvoiceRequest,
  GetInvoiceRequestFail,
  GetInvoiceRequestReset,
  GetInvoiceRequestSuccess
} from './invoice-get-request.action';


@State<IRequest>({
  name: 'getInvoiceRequestState',
  defaults: requestEntitiesInitial,
})
export class GetInvoiceRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Action(GetInvoiceRequest)
  getInvoiceRequest(ctx: StateContext<IRequest>, {payload: id}: GetInvoiceRequest) {
    ctx.patchState(requestEntitiesLoading);
    return this.requestService
    .get(`invoices/${id}`)
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new GetInvoiceRequestSuccess(res));
      }),
      catchError(error => {
        return ctx.dispatch(new GetInvoiceRequestFail(error));
      }),
    );
  }

  @Action(GetInvoiceRequestSuccess)
  getInvoiceRequestSuccess(
    ctx: StateContext<IRequest>,
    {payload}: GetInvoiceRequestSuccess
  ) {
    ctx.patchState(requestEntitiesSuccess(payload));
    ctx.dispatch(new FetchInvoiceSuccess(payload));
  }

  @Action(GetInvoiceRequestFail)
  getInvoiceRequestFail(ctx: StateContext<IRequest>, {payload}: GetInvoiceRequestFail) {
    ctx.patchState(requestEntitiesFail(payload));
    console.error('An error occured: ', payload.message);
  }

  @Action(GetInvoiceRequestReset)
  getInvoiceRequestReset({patchState}: StateContext<IRequest>) {
    patchState(requestEntitiesInitial);
  }
}
