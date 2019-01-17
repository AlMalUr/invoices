import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchCustomers } from '../../ngxs/customers/customers.actions';
import { CustomersState } from '../../ngxs/customers/customers.state';
import { CustomerModel } from '../../shared/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  @Select(CustomersState.getCustomers) customers$: Observable<CustomerModel[]>;

  constructor(private store: Store) {
  }

  fetchCustomers() {
     return this.store.dispatch(new FetchCustomers());
  }

}
