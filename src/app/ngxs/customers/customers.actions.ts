import { HttpErrorResponse } from '@angular/common/http';

import { CustomerModel } from '../../shared/models/customer.model';


export class FetchCustomers {
  static readonly type = '[Customers] FetchCustomers';
}

export class FetchCustomersSuccess {
  static readonly type = '[Customers] FetchCustomersSuccess';

  constructor(private payload: CustomerModel[]) {
  }
}

export class FetchCustomersFailed {
  static readonly type = '[Customers] FetchCustomersFailed';

  constructor(private payload: HttpErrorResponse) {
  }
}
