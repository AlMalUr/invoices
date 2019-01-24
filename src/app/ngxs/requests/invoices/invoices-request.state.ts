import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchInvoicesSuccess } from '../../invoices/invoices.actions';
import { IRequest } from '../requests.interface';
import {
  requestEntitiesDefault,
  requestEntitiesFail,
  requestEntitiesLoading,
  requestEntitiesSuccess
} from '../shared/requests-entities';

import {
  InvoicesRequest,
  InvoicesRequestFail,
  InvoicesRequestSuccess
} from './invoices-request.action';

@State<IRequest>({
  name: 'invoicesRequestState',
  defaults: requestEntitiesDefault,
})
export class InvoicesRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Action(InvoicesRequest)
  invoicesRequest(ctx: StateContext<IRequest>, action: InvoicesRequest) {
    ctx.patchState(requestEntitiesLoading);
    return this.requestService
    .get('invoices')
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new InvoicesRequestSuccess(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InvoicesRequestFail(error));
      }),
    );
  }

  @Action(InvoicesRequestSuccess)
  invoicesRequestSuccess(
    ctx: StateContext<IRequest>,
    {payload}: InvoicesRequestSuccess
  ) {
    ctx.patchState({...requestEntitiesSuccess, data: payload});
    ctx.dispatch(new FetchInvoicesSuccess(payload));
  }

  @Action(InvoicesRequestFail)
  invoicesRequestFail(ctx: StateContext<IRequest>, {payload}: InvoicesRequestFail) {
    ctx.patchState({...requestEntitiesFail, data: payload});
    console.error('An error occured: ', payload.message);
  }

}
