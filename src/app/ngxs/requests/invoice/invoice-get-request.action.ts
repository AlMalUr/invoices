import { HttpErrorResponse } from '@angular/common/http';

import { InvoiceModel } from '../../../shared/models/invoice.model';

export class InvoiceRequest {
  static type = '[InvoiceRequest] InvoiceRequest';
  constructor(public payload: string) {
  }
}

export class InvoiceRequestSuccess {
  static type = '[InvoiceRequest] InvoiceRequestSuccess';

  constructor(public payload: InvoiceModel) {
  }
}

export class InvoiceRequestFail {
  static type = '[InvoiceRequest] InvoiceRequestFailed';

  constructor(public payload: HttpErrorResponse) {
  }
}

export class InvoiceRequestReset {
  static type = '[InvoiceRequest] InvoiceRequestReset';
}
