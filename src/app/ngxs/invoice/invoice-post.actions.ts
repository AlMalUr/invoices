export class PostInvoice {
  static readonly type = '[Invoice] PostInvoice';
  constructor(private payload: string) {
  }
}

export class PostInvoiceSuccess {
  static readonly type = '[Invoice] PostInvoiceSuccess';
  constructor(private payload: any) {
  }
}
