import { HttpErrorResponse } from '@angular/common/http';

import { CustomerModel } from '../../../shared/models/customer.model';

export class CustomersRequest {
  static type = '[CustomersRequest] CustomersRequest';
}

export class CustomersRequestSuccess {
  static type = '[CustomersRequest] CustomersRequestSuccess';

  constructor(public payload: CustomerModel[]) {
  }
}

export class CustomersRequestFail {
  static type = '[CustomersRequest] CustomersRequestFailed';

  constructor(public payload: HttpErrorResponse) {
  }
}
