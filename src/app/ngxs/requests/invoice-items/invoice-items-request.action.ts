export class InvoiceItemsRequest {
  static type = '[InvoiceItemsRequest] InvoiceItemsRequest';
  constructor(public payload: string) {
  }
}

export class InvoiceItemsRequestSuccess {
  static type = '[InvoiceItemsRequest] InvoiceItemsRequestSuccess';

  constructor(public payload: any) {
  }
}

export class InvoiceItemsRequestFail {
  static type = '[InvoiceItemsRequest] InvoiceItemsRequestFailed';

  constructor(public payload: any) {
  }
}

export class InvoiceItemsRequestReset {
  static type = '[InvoiceItemsRequest] InvoiceItemsRequestReset';
}
