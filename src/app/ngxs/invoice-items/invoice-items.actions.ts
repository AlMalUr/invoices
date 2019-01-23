export class FetchInvoiceItems {
  static readonly type = '[InvoiceItems] FetchInvoiceItems';
  constructor(private payload: string) {
  }
}

export class FetchInvoiceItemsSuccess {
  static readonly type = '[InvoiceItems] FetchInvoiceItemsSuccess';

  constructor(private payload: any) {
  }
}

export class ResetInvoiceItems {
  static readonly type = '[InvoiceItems] ResetInvoiceItems';
}
