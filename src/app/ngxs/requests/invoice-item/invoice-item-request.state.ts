import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchInvoiceItemFailed, FetchInvoiceItemSuccess } from '../../invoice-item/invoice-item.actions';
import { IRequest } from '../requests.interface';

import {
  InvoiceItemRequestAction,
  InvoiceItemRequestFailAction,
  InvoiceItemRequestSuccessAction,
} from './invoice-item-request.action';


@State<IRequest>({
  name: 'InvoiceItemRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
export class InvoiceItemRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Selector()
  static getLoad(state: IRequest): boolean {
    return state.loaded;
  }

  @Action(InvoiceItemRequestAction)
  invoiceItemRequest(ctx: StateContext<IRequest>, {payload: id}: InvoiceItemRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.requestService
    .fetch('invoices/' + id + '/items')
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new InvoiceItemRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new InvoiceItemRequestFailAction(error));
      }),
    );
  }

  @Action(InvoiceItemRequestSuccessAction)
  invoiceItemRequestSuccess(
    ctx: StateContext<IRequest>,
    {payload}: InvoiceItemRequestSuccessAction
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: payload,
    });
    ctx.dispatch(new FetchInvoiceItemSuccess(payload));
  }

  @Action(InvoiceItemRequestFailAction)
  invoiceItemRequestFail(ctx: StateContext<IRequest>, {payload}: InvoiceItemRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: payload,
    });
    ctx.dispatch(new FetchInvoiceItemFailed(payload));
  }

}
