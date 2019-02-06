import { HttpErrorResponse } from '@angular/common/http';

import { InvoiceItemModel } from '../../../shared/models/invoice-item.model';

export class InvoiceItemsPostRequest {
  static type = '[InvoiceItemsRequest] InvoiceItemsPostRequest';
  constructor(public payload: string) {
  }
}

export class InvoiceItemsPostRequestSuccess {
  static type = '[InvoiceItemsRequest] InvoiceItemsPostRequestSuccess';

  constructor(public payload: InvoiceItemModel[]) {
  }
}

export class InvoiceItemsPostRequestFail {
  static type = '[InvoiceItemsRequest] InvoiceItemsPostRequestFailed';

  constructor(public payload: HttpErrorResponse) {
  }
}
