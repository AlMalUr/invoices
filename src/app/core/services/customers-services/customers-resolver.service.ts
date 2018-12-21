import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Actions } from '@ngxs/store';
import { take } from 'rxjs/operators';


import { CustomersService } from './customers.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersResolverService implements Resolve<any> {

  constructor(
    private customersService: CustomersService,
    private router: Router,
    private actions$: Actions
  ) {
  }

  resolve() {
   return this.customersService.fetchCustomers().pipe(
      take(1)
    );

  }
}

