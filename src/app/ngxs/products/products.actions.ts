import { HttpErrorResponse } from '@angular/common/http';
import { ProductModel } from '../../core/models/models';

export class FetchProducts {
  static readonly type = '[Products] FetchProducts';
}
export class FetchProductsSuccess {
  static readonly type = '[Products] FetchProductsSuccess';

  constructor(private payload: ProductModel[]) {
  }
}

export class FetchProductsFailed {
  static readonly type = '[Products] FetchProductsFailed';

  constructor(private payload: HttpErrorResponse) {
  }
}
