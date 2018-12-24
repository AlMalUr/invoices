import { HttpErrorResponse } from '@angular/common/http';

import { InvoiceModel } from '../../core/models/invoice.model';


export class FetchInvoices {
  static readonly type = '[Invoices] FetchInvoices';
}

export class FetchInvoicesSuccess {
  static readonly type = '[Invoices] FetchInvoicesSuccess';

  constructor(private payload: InvoiceModel[]) {
  }
}

export class FetchInvoicesFailed {
  static readonly type = '[Invoices] FetchInvoicesFailed';

  constructor(private payload: HttpErrorResponse) {
  }
}
