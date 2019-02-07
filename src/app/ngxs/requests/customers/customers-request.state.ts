import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchCustomersSuccess } from '../../customers/customers.actions';
import { IRequest } from '../requests.interface';
import {
  requestEntitiesFail,
  requestEntitiesInitial,
  requestEntitiesLoading,
  requestEntitiesSuccess
} from '../shared/requests-entities';

import {
  CustomersRequest,
  CustomersRequestFail,
  CustomersRequestSuccess } from './customers-request.action';


@State<IRequest>({
  name: 'customersRequestState',
  defaults: requestEntitiesInitial,
})
export class CustomersRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Action(CustomersRequest)
  customersRequest(
    ctx: StateContext<IRequest>
  ) {
    ctx.patchState( requestEntitiesLoading );
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
    {payload}: CustomersRequestSuccess
  ) {
    ctx.patchState( requestEntitiesSuccess(payload) );
    return ctx.dispatch(new FetchCustomersSuccess(payload));
  }

  @Action(CustomersRequestFail)
  customersRequestFail(
    ctx: StateContext<IRequest>,
    {payload}: CustomersRequestFail
  ) {
    ctx.patchState( requestEntitiesFail(payload) );
    return console.error('An error occured: ', payload.message);
  }

}
