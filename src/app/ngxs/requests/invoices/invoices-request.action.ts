import { HttpErrorResponse } from '@angular/common/http';

import { InvoiceModel } from '../../../shared/models/invoice.model';

export class InvoicesRequest {
  static type = '[InvoicesRequest] InvoicesRequest';
}

export class InvoicesRequestSuccess {
  static type = '[InvoicesRequest] InvoicesRequestSuccess';

  constructor(public payload: InvoiceModel[]) {
  }
}

export class InvoicesRequestFail {
  static type = '[InvoicesRequest] InvoicesRequestFailed';

  constructor(public payload: HttpErrorResponse) {
  }
}
