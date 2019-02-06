import { HttpErrorResponse } from '@angular/common/http';

import { InvoiceModel } from '../../../shared/models/invoice.model';

export class GetInvoiceRequest {
  static type = '[GetInvoiceRequest] GetInvoiceRequest';
  constructor(public payload: string) {
  }
}

export class GetInvoiceRequestSuccess {
  static type = '[GetInvoiceRequest] GetInvoiceRequestSuccess';

  constructor(public payload: InvoiceModel) {
  }
}

export class GetInvoiceRequestFail {
  static type = '[GetInvoiceRequest] GetInvoiceRequestFailed';

  constructor(public payload: HttpErrorResponse) {
  }
}

export class GetInvoiceRequestReset {
  static type = '[GetInvoiceRequest] GetInvoiceRequestReset';
}
