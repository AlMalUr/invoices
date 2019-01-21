export class InvoiceItemRequest {
  static type = '[InvoiceItemRequest] InvoiceItemRequest';
  constructor(public payload: string) {
  }
}

export class InvoiceItemRequestSuccess {
  static type = '[InvoiceItemRequest] InvoiceItemRequestSuccess';

  constructor(public payload: any) {
  }
}

export class InvoiceItemRequestFail {
  static type = '[InvoiceItemRequest] InvoiceItemRequestFailed';

  constructor(public payload: any) {
  }
}

export class InvoiceItemRequestReset {
  static type = '[InvoiceItemRequest] InvoiceItemRequestReset';
}

export class CustomerItemRequest {
  static type = '[InvoiceItemRequest] CustomerItemRequest';
  constructor(public payload: string) {
  }
}

export class CustomerItemRequestSuccess {
  static type = '[InvoiceItemRequest] CustomerItemRequestSuccess';

  constructor(public payload: any) {
  }
}
