import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { CustomersRequestService } from '../../../core/services/customers-services/customers-request.service';
import { FetchCustomersFailed, FetchCustomersSuccess } from '../../customers/customers.actions';
import { IRequest } from '../requests.interface';

import { CustomersRequestAction, CustomersRequestFailAction, CustomersRequestSuccessAction } from './customers-request.action';

export interface CustomersRequestStateModel extends IRequest {

}

@State<CustomersRequestStateModel>({
  name: 'customersRequestState',
  defaults: {
    loading: false,
    load: false,
    status: '',
    data: null,
  },
})
export class CustomersRequestState {

  constructor(
    private customersRequestService: CustomersRequestService,
  ) {
  }

  @Selector([CustomersRequestState])
  static getLoad(state: CustomersRequestStateModel): boolean {
    return state.load;
  }

  @Action(CustomersRequestAction)
  customersRequest(ctx: StateContext<CustomersRequestStateModel>, action: CustomersRequestAction) {
    ctx.patchState({
      loading: true,
      load: false,
      status: '',
      data: null,
    });
    return this.customersRequestService
    .fetchCustomers()
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
    ctx: StateContext<CustomersRequestStateModel>,
    action: CustomersRequestSuccessAction
  ) {
    ctx.patchState({
      loading: false,
      load: true,
      status: 'success',
      data: action.payload.data,
    });
    ctx.dispatch(new FetchCustomersSuccess(action.payload));
  }

  @Action(CustomersRequestFailAction)
  customersRequestFail(ctx: StateContext<CustomersRequestStateModel>, action: CustomersRequestFailAction) {
    ctx.patchState({
      loading: false,
      load: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new FetchCustomersFailed(action.payload));
  }

}
