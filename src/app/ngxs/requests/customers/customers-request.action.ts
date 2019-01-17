export class CustomersRequest {
  static type = '[CustomersRequest] CustomersRequest';
}

export class CustomersRequestSuccess {
  static type = '[CustomersRequest] CustomersRequestSuccess';

  constructor(public payload: any) {
  }
}

export class CustomersRequestFail {
  static type = '[CustomersRequest] CustomersRequestFailed';

  constructor(public payload: any) {
  }
}
