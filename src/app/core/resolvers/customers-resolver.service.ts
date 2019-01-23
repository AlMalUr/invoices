import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { CustomerModel } from '../../shared/models/customer.model';
import { CustomersService } from '../services/customers.service';


@Injectable({
  providedIn: 'root'
})
export class CustomersResolverService implements Resolve<CustomerModel[]> {

  constructor(
    private customersService: CustomersService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomerModel[]> {
    return this.customersService.customers$.pipe(
      switchMap((customers) =>
        customers ? this.customersService.customers$ : this.customersService.fetchCustomers()
      ),
      filter(customers => !!customers),
      take(1)
    );
  }
}

