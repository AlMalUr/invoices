export class ProductsRequestAction {
  static type = '[ProductsRequest] ProductsRequest';
}

export class ProductsRequestSuccessAction {
  static type = '[ProductsRequest] ProductsRequestSuccess';

  constructor(public payload: any) {
  }
}

export class ProductsRequestFailAction {
  static type = '[ProductsRequest] ProductsRequestFailed';

  constructor(public payload: any) {
  }
}
