import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchInvoicesFailed, FetchInvoicesSuccess } from '../../invoices/invoices.actions';
import { IRequest } from '../requests.interface';

import {
  InvoicesRequestAction,
  InvoicesRequestFailAction,
  InvoicesRequestSuccessAction
} from './invoices-request.action';

@State<IRequest>({
  name: 'invoicesRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
export class InvoicesRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Selector()
  static getLoad(state: IRequest): boolean {
    return state.loaded;
  }

  @Action(InvoicesRequestAction)
  invoicesRequest(ctx: StateContext<IRequest>, action: InvoicesRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.requestService
    .fetch('invoices')
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
    ctx: StateContext<IRequest>,
    {payload}: InvoicesRequestSuccessAction
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: payload,
    });
    ctx.dispatch(new FetchInvoicesSuccess(payload));
  }

  @Action(InvoicesRequestFailAction)
  invoicesRequestFail(ctx: StateContext<IRequest>, {payload}: InvoicesRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: payload,
    });
    ctx.dispatch(new FetchInvoicesFailed(payload));
  }

}
