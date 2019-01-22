export class FetchInvoiceItem {
  static readonly type = '[InvoiceItem] FetchInvoiceItem';
  constructor(private payload: string) {
  }
}

export class FetchInvoiceItemSuccess {
  static readonly type = '[InvoiceItem] FetchInvoiceItemSuccess';

  constructor(private payload: any) {
  }
}

export class ResetInvoiceItem {
  static readonly type = '[InvoiceItem] ResetInvoiceItem';
}
