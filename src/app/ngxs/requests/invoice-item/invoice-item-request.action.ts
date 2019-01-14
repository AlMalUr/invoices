export class InvoiceItemRequestAction {
  static type = '[InvoiceItemRequest] InvoiceItemRequest';
  constructor(public payload: string) {
  }
}

export class InvoiceItemRequestSuccessAction {
  static type = '[InvoiceItemRequest] InvoiceItemRequestSuccess';

  constructor(public payload: any) {
  }
}

export class InvoiceItemRequestFailAction {
  static type = '[InvoiceItemRequest] InvoiceItemRequestFailed';

  constructor(public payload: any) {
  }
}
