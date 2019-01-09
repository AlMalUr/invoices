import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { take } from 'rxjs/operators';

import { CustomersState } from '../../ngxs/customers/customers.state';
import { CustomersRequestState } from '../../ngxs/requests/customers/customers-request.state';
import { CustomersService } from '../services/customers-services/customers.service';


@Injectable({
  providedIn: 'root'
})
export class CustomersResolverService implements Resolve<any> {

  @Select(CustomersRequestState.getLoad) load$: boolean;

  constructor(
    private customersService: CustomersService,
    private store: Store
  ) {
  }

  resolve() {
    if (!this.store.selectSnapshot(CustomersState.getCustomers).length) {
      return this.customersService.fetchCustomers().pipe(
        take(1)
      );
    } else {
      return this.store.selectSnapshot(CustomersState);
    }
  }
}
