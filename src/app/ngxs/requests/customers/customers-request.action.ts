export class CustomersRequestAction {
  static type = '[CustomersRequest] CustomersRequest';
}

export class CustomersRequestSuccessAction {
  static type = '[CustomersRequest] CustomersRequestSuccess';

  constructor(public payload: any) {
  }
}

export class CustomersRequestFailAction {
  static type = '[CustomersRequest] CustomersRequestFailed';

  constructor(public payload: any) {
  }
}
