import { InvoiceModel } from '../../shared/models/invoice.model';

// get all invoices

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

  constructor(private payload: any) {
  }
}

// get one invoice

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

// post invoice

export class CreateInvoice {
  static readonly type = '[Invoice] CreateInvoice';
  constructor(private payload: any) {
  }
}

export class CreateInvoiceSuccess {
  static readonly type = '[Invoice] CreateInvoiceSuccess';
  constructor(private payload: any) {
  }
}
