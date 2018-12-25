import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { take } from 'rxjs/operators';

import { CustomersState } from '../../ngxs/customers/customers.state';
import { CustomersRequestState } from '../../ngxs/requests/customers/customers-request.state';
import { CustomersService } from '../services/customers-services/customers.service';
import { defer, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersResolverService implements Resolve<any> {

  constructor(
    private customersService: CustomersService,
    private store: Store
  ) {
  }

  resolve() {
    return defer(() => {
      return (!this.store.selectSnapshot(CustomersRequestState).load)
        ? (this.customersService.fetchCustomers().pipe(take(1)))
        : of(this.store.selectSnapshot(CustomersState));
    });
  }
}
