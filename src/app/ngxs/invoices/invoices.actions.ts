import { InvoiceModel } from '../../shared/models/invoice.model';


export class FetchInvoices {
  static readonly type = '[Invoices] FetchInvoices';
}

export class FetchInvoicesSuccess {
  static readonly type = '[Invoices] FetchInvoicesSuccess';

  constructor(private payload: InvoiceModel[]) {
  }
}

export class FetchSelectedInvoice {
  static readonly type = '[Invoices] FetchSelectedInvoice';

  constructor(private payload: string) {
  }
}
