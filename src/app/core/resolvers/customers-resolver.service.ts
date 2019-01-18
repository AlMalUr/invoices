import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

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
    return this.customersService.fetchCustomers().pipe(
      filter(customers => {if (customers && customers.length) {return true; }}),
      take(1)
    );
  }
}

