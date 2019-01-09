import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CustomerModel } from '../../core/models/customer.model';
import { CustomersRequestAction } from '../requests/customers/customers-request.action';

import {
  FetchCustomers,
  FetchCustomersFailed,
  FetchCustomersSuccess
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

  constructor(
  ) {
  }

  @Selector()
  static getCustomers(state: CustomersStateModel) {
    return state.customersIds.map(id => state.customers[id]);
  }


  @Action(FetchCustomers)
  fetchCustomers({dispatch}: StateContext<CustomersStateModel>) {
    dispatch(new CustomersRequestAction);
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


  @Action(FetchCustomersFailed)
  CustomersFailed(
    {dispatch}: StateContext<CustomerModel>,
    {payload: error}: FetchCustomersFailed
  ) {
    dispatch(
      console.error('An error occured: ', error.message)
    );
  }

}


