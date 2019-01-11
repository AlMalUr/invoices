import { HttpErrorResponse } from '@angular/common/http';

import { InvoiceItemModel } from '../../shared/models/invoice-item.model';


export class FetchInvoiceItem {
  static readonly type = '[InvoiceItem] FetchInvoiceItem';
}

export class FetchInvoiceItemSuccess {
  static readonly type = '[InvoiceItem] FetchInvoiceItemSuccess';

  constructor(private payload: InvoiceItemModel[]) {
  }
}

export class FetchInvoiceItemFailed {
  static readonly type = '[InvoiceItem] FetchInvoiceItemFailed';

  constructor(private payload: HttpErrorResponse) {
  }
}
