export class InvoicesRequest {
  static type = '[InvoicesRequest] InvoicesRequest';
}

export class InvoicesRequestSuccess {
  static type = '[InvoicesRequest] InvoicesRequestSuccess';

  constructor(public payload: any) {
  }
}

export class InvoicesRequestFail {
  static type = '[InvoicesRequest] InvoicesRequestFailed';

  constructor(public payload: any) {
  }
}

