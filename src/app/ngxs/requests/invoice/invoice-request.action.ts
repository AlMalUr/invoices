export class InvoiceRequest {
  static type = '[InvoiceRequest] InvoiceRequest';
  constructor(public payload: string) {
  }
}

export class InvoiceRequestSuccess {
  static type = '[InvoiceRequest] InvoiceRequestSuccess';

  constructor(public payload: any) {
  }
}

export class InvoiceRequestFail {
  static type = '[InvoiceRequest] InvoiceRequestFailed';

  constructor(public payload: any) {
  }
}

export class InvoiceRequestReset {
  static type = '[InvoiceRequest] InvoiceRequestReset';
}
