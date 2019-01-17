import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CustomerModel } from '../../shared/models/customer.model';
import { CustomersRequest } from '../requests/customers/customers-request.action';

import {
  FetchCustomers,
  FetchCustomersSuccess,
} from './customers.actions';

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

  @Selector()
  static getCustomers(state: CustomersStateModel) {
    return state.customersIds.map(id => state.customers[id]);
  }


  @Action(FetchCustomers)
  fetchCustomers({dispatch}: StateContext<CustomersStateModel>) {
    dispatch(new CustomersRequest);
  }

  @Action(FetchCustomersSuccess)
  fetchCustomersSuccess(
    {setState}: StateContext<CustomersStateModel>,
    {payload: custom}: FetchCustomersSuccess
  ) {
    setState({
      customers: custom.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      customersIds: custom.map(item => item._id)
    });
  }
}


