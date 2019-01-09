import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { InvoicesRequestService } from '../../../core/services/invoices-services/invoices-request.service';
import { FetchInvoicesFailed, FetchInvoicesSuccess } from '../../invoices/invoices.actions';
import { IRequest } from '../requests.interface';

import {
  InvoicesRequestAction,
  InvoicesRequestFailAction,
  InvoicesRequestSuccessAction
} from './invoices-request.action';

export interface InvoicesRequestStateModel extends IRequest {

}

@State<InvoicesRequestStateModel>({
  name: 'invoicesRequestState',
  defaults: {
    loading: false,
    load: false,
    status: '',
    data: null,
  },
})
export class InvoicesRequestState {

  constructor(
    private invoicesRequestService: InvoicesRequestService,
  ) {
  }

  @Selector()
  static getLoad(state: InvoicesRequestStateModel): boolean {
    return state.load;
  }

  @Action(InvoicesRequestAction)
  invoicesRequest(ctx: StateContext<InvoicesRequestStateModel>, action: InvoicesRequestAction) {
    ctx.patchState({
      loading: true,
      load: false,
      status: '',
      data: null,
    });
    return this.invoicesRequestService
    .fetchInvoices()
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new InvoicesRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InvoicesRequestFailAction(error));
      }),
    );
  }

  @Action(InvoicesRequestSuccessAction)
  invoicesRequestSuccess(
    ctx: StateContext<InvoicesRequestStateModel>,
    action: InvoicesRequestSuccessAction
  ) {
    ctx.patchState({
      loading: false,
      load: true,
      status: 'success',
      data: action.payload.data,
    });
    ctx.dispatch(new FetchInvoicesSuccess(action.payload));
  }

  @Action(InvoicesRequestFailAction)
  invoicesRequestFail(ctx: StateContext<InvoicesRequestStateModel>, action: InvoicesRequestFailAction) {
    ctx.patchState({
      loading: false,
      load: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new FetchInvoicesFailed(action.payload));
  }

}
