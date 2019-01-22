import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';

import { FetchCustomers } from '../../ngxs/customers/customers.actions';
import { CustomersState } from '../../ngxs/customers/customers.state';
import { CustomersRequestState } from '../../ngxs/requests/customers/customers-request.state';
import { CustomerModel } from '../../shared/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  isLoaded;
  @Select(CustomersState.getCustomers) customers$: Observable<CustomerModel[]>;
  @Select(CustomersRequestState.isLoaded) isLoaded$: Observable<boolean>;

  constructor(private store: Store) {
    this.isLoaded$.subscribe(loaded => this.isLoaded = loaded);
  }

  fetchCustomers() {
    if ( !this.isLoaded ) {
      this.store.dispatch(new FetchCustomers());
    }
    return this.customers$;
  }
}
