import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { CustomersState } from '../../../ngxs/customers/customers.state';
import { CustomerModel } from '../../models/customer.model';
import { CustomersRequestAction } from '../../../ngxs/requests/customers/customers-request.action';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  @Select(CustomersState.getCustomers) customers$: Observable<CustomerModel[]>;

  constructor(private store: Store) {
  }

  fetchCustomers() {
     return this.store.dispatch(new CustomersRequestAction());
  }

}
