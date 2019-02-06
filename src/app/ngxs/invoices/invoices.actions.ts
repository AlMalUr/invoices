import { InvoiceModel } from '../../shared/models/invoice.model';


export class FetchInvoices {
  static readonly type = '[Invoices] FetchInvoices';
}

export class FetchInvoicesSuccess {
  static readonly type = '[Invoices] FetchInvoicesSuccess';

  constructor(private payload: InvoiceModel[]) {
  }
}

export class UpdateInvoices {
  static readonly type = '[Invoices] UpdateInvoices';

  constructor(private payload: InvoiceModel) {
  }
}

export class FetchInvoice {
  static readonly type = '[Invoice] FetchInvoice';
  constructor(private payload: string) {
  }
}

export class FetchInvoiceSuccess {
  static readonly type = '[Invoice] FetchInvoiceSuccess';
  constructor(private payload: InvoiceModel) {
  }
}

export class ResetInvoice {
  static readonly type = '[Invoice] ResetInvoice';
}

export class CreateInvoice {
  static readonly type = '[Invoice] CreateInvoice';
  constructor(private payload: InvoiceModel) {
  }
}

export class CreateInvoiceSuccess {
  static readonly type = '[Invoice] CreateInvoiceSuccess';
  constructor(private payload: InvoiceModel) {
  }
}
