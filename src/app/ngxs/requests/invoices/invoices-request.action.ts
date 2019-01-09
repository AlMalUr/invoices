export class InvoicesRequestAction {
  static type = '[InvoicesRequest] InvoicesRequest';
}

export class InvoicesRequestSuccessAction {
  static type = '[InvoicesRequest] InvoicesRequestSuccess';

  constructor(public payload: any) {
  }
}

export class InvoicesRequestFailAction {
  static type = '[InvoicesRequest] InvoicesRequestFailed';

  constructor(public payload: any) {
  }
}
