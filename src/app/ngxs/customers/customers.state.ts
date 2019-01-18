import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CustomerModel } from '../../shared/models/customer.model';
import { CustomersRequest } from '../requests/customers/customers-request.action';

import {
  FetchCustomers,
  FetchCustomersSuccess,
} from './customers.actions';

export class CustomersStateModel {
  entities: { [ids: string]: CustomerModel };
  collectionIds: string[];
}

@State<CustomersStateModel>({
  name: 'customers',
  defaults: {
    entities: {},
    collectionIds: []
  }
})
export class CustomersState {

  @Selector()
  static getCustomers(state: CustomersStateModel) {
    return state.collectionIds.map(id => state.entities[id]);
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
      entities: custom.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      collectionIds: custom.map(item => item._id)
    });
  }
}


