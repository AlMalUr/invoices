export class PostInvoiceItems {
  static readonly type = '[InvoiceItems] PostInvoiceItems';
  constructor(private id: string, private items: any) {
  }
}

export class PostInvoiceItemsSuccess {
  static readonly type = '[InvoiceItems] PostInvoiceItemsSuccess';

  constructor(private payload: any) {
  }
}


