import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchInvoicesSuccess } from '../../invoices/invoices.actions';
import { IRequest } from '../requests.interface';

import {
  InvoicesRequest,
  InvoicesRequestFail,
  InvoicesRequestSuccess
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
  static isLoaded(state: IRequest): boolean {
    return state.loaded;
  }

  @Action(InvoicesRequest)
  invoicesRequest(ctx: StateContext<IRequest>, action: InvoicesRequest) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
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
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: payload,
    });
    ctx.dispatch(new FetchInvoicesSuccess(payload));
  }

  @Action(InvoicesRequestFail)
  invoicesRequestFail(ctx: StateContext<IRequest>, {payload}: InvoicesRequestFail) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: payload,
    });
    console.error('An error occured: ', payload.message);
  }

}
