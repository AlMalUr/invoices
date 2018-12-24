import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { CustomerModel } from '../../core/models/customer.model';
import { CustomersRequestService } from '../../core/services/customers-services/customers-request.service';

import * as CustomersActions from './customers.actions';
import { HttpErrorResponse } from '@angular/common/http';

export class CustomersStateModel {
  customers: { [ids: string]: CustomerModel };
  customersIds: string[];
}

@State<CustomersStateModel>({
  name: 'customers',
  defaults: {
    customers: {},
    customersIds: []
  }
})
export class CustomersState {

  constructor(
    private customersRequestService: CustomersRequestService
  ) {
  }

  @Selector()
  static getCustomers(state: CustomersStateModel) {
    return state.customersIds.map(id => state.customers[id]);
  }

  @Action(CustomersActions.FetchCustomers)
  fetchCustomers({dispatch}: StateContext<CustomersStateModel>) {
    return this.customersRequestService
    .fetchCustomers()
    .pipe(
      tap((customers: CustomerModel[]) => {
        dispatch(new CustomersActions.FetchCustomersSuccess(customers));
      }),
      catchError((error: HttpErrorResponse) =>
        dispatch(new CustomersActions.FetchCustomersFailed(error))
      )
    );
  }

  @Action(CustomersActions.FetchCustomersSuccess)
  fetchCustomersSuccess(
    {setState}: StateContext<CustomersStateModel>,
    {payload: custom}: CustomersActions.FetchCustomersSuccess
  ) {
    setState({
      customers: custom.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      customersIds: custom.map(item => item._id)
    });
  }


  @Action(CustomersActions.FetchCustomersFailed)
  CustomersFailed(
    {dispatch}: StateContext<CustomerModel>,
    {payload: error}: CustomersActions.FetchCustomersFailed
  ) {
    dispatch(
      console.error('An error occured: ', error.message)
    );
  }

}


