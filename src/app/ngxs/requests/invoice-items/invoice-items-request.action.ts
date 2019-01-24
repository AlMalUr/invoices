import { HttpErrorResponse } from '@angular/common/http';

import { InvoiceItemModel } from '../../../shared/models/invoice-item.model';

export class InvoiceItemsRequest {
  static type = '[InvoiceItemsRequest] InvoiceItemsRequest';
  constructor(public payload: string) {
  }
}

export class InvoiceItemsRequestSuccess {
  static type = '[InvoiceItemsRequest] InvoiceItemsRequestSuccess';

  constructor(public payload: InvoiceItemModel[]) {
  }
}

export class InvoiceItemsRequestFail {
  static type = '[InvoiceItemsRequest] InvoiceItemsRequestFailed';

  constructor(public payload: HttpErrorResponse) {
  }
}

export class InvoiceItemsRequestReset {
  static type = '[InvoiceItemsRequest] InvoiceItemsRequestReset';
}
