import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';

import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { CustomersState } from '../../ngxs/customers/customers.state';
import { CustomerModel } from '../../shared/models/customer.model';
import { CustomersService } from '../services/customers.service';


@Injectable({
  providedIn: 'root'
})
export class CustomersResolverService implements Resolve<CustomerModel[]> {

  constructor(
    private customersService: CustomersService,
    private store: Store
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomerModel[]> {
    return this.store.select(CustomersState.getCustomers).pipe(
      switchMap(customers => {
        return customers.length ? of(customers) : this.customersService.fetchCustomers();
        }
      ),
      filter(customers => customers && customers.length),
      take(1)
    );
  }
}

