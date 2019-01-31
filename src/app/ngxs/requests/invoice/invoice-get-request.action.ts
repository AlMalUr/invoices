import { HttpErrorResponse } from '@angular/common/http';

import { InvoiceModel } from '../../../shared/models/invoice.model';

export class InvoiceGetRequest {
  static type = '[InvoiceGetRequest] InvoiceGetRequest';
  constructor(public payload: string) {
  }
}

export class InvoiceGetRequestSuccess {
  static type = '[InvoiceGetRequest] InvoiceGetRequestSuccess';

  constructor(public payload: InvoiceModel) {
  }
}

export class InvoiceGetRequestFail {
  static type = '[InvoiceGetRequest] InvoiceGetRequestFailed';

  constructor(public payload: HttpErrorResponse) {
  }
}

export class InvoiceGetRequestReset {
  static type = '[InvoiceGetRequest] InvoiceGetRequestReset';
}
