import { HttpErrorResponse } from '@angular/common/http';

import { ProductModel } from '../../../shared/models/product.model';

export class ProductsRequest {
  static type = '[ProductsRequest] ProductsRequest';
}

export class ProductsRequestSuccess {
  static type = '[ProductsRequest] ProductsRequestSuccess';

  constructor(public payload: ProductModel[]) {
  }
}

export class ProductsRequestFail {
  static type = '[ProductsRequest] ProductsRequestFailed';

  constructor(public payload: HttpErrorResponse) {
  }
}
