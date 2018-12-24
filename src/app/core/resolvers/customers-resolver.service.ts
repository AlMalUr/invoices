import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { take } from 'rxjs/operators';


import { CustomersService } from '../services/customers-services/customers.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersResolverService implements Resolve<any> {

  constructor(
    private customersService: CustomersService
  ) {
  }

  resolve() {
   return this.customersService.fetchCustomers().pipe(
      take(1)
    );
  }
}

