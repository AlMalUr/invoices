import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchCustomersFailed, FetchCustomersSuccess } from '../../customers/customers.actions';
import { IRequest } from '../requests.interface';

import { CustomersRequestAction, CustomersRequestFailAction, CustomersRequestSuccessAction } from './customers-request.action';


@State<IRequest>({
  name: 'customersRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
export class CustomersRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Selector([CustomersRequestState])
  static getLoad(state: IRequest): boolean {
    return state.loaded;
  }

  @Action(CustomersRequestAction)
  customersRequest(ctx: StateContext<IRequest>, action: CustomersRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.requestService
    .fetch('customers')
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new CustomersRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new CustomersRequestFailAction(error));
      }),
    );
  }

  @Action(CustomersRequestSuccessAction)
  customersRequestSuccess(
    ctx: StateContext<IRequest>,
    action: CustomersRequestSuccessAction
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload.data,
    });
    ctx.dispatch(new FetchCustomersSuccess(action.payload));
  }

  @Action(CustomersRequestFailAction)
  customersRequestFail(ctx: StateContext<IRequest>, action: CustomersRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new FetchCustomersFailed(action.payload));
  }

}
