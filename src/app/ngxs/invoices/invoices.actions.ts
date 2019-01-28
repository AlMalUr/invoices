import { InvoiceModel } from '../../shared/models/invoice.model';


export class FetchInvoices {
  static readonly type = '[Invoices] FetchInvoices';
}

export class FetchInvoicesSuccess {
  static readonly type = '[Invoices] FetchInvoicesSuccess';

  constructor(private payload: InvoiceModel[]) {
  }
}

export class AddInvoice {
  static  readonly type = '[InvoiceItems] AddInvoice';
  constructor(private payload: any) {
  }
}
