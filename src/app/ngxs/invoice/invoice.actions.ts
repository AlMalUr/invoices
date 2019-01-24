import { InvoiceModel } from '../../shared/models/invoice.model';

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
