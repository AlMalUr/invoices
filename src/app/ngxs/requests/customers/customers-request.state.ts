import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchCustomersSuccess } from '../../customers/customers.actions';
import { IRequest } from '../requests.interface';

import { CustomersRequest, CustomersRequestFail, CustomersRequestSuccess } from './customers-request.action';


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

  @Action(CustomersRequest)
  customersRequest(ctx: StateContext<IRequest>) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.requestService
    .get('customers')
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new CustomersRequestSuccess(res));
      }),
      catchError(error => {
        return ctx.dispatch(new CustomersRequestFail(error));
      }),
    );
  }

  @Action(CustomersRequestSuccess)
  customersRequestSuccess(
    ctx: StateContext<IRequest>,
    action: CustomersRequestSuccess
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: action.payload.data,
    });
    ctx.dispatch(new FetchCustomersSuccess(action.payload));
  }

  @Action(CustomersRequestFail)
  customersRequestFail(ctx: StateContext<IRequest>, {payload}: CustomersRequestFail) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: payload,
    });
    console.error('An error occured: ', payload.message);
  }

}
