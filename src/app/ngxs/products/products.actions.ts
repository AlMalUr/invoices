import { ProductModel } from '../../shared/models/product.model';


export class FetchProducts {
  static readonly type = '[Products] FetchProducts';
}

export class FetchProductsSuccess {
  static readonly type = '[Products] FetchProductsSuccess';

  constructor(private payload: ProductModel[]) {
  }
}
export class FetchSelectedProduct {
  static readonly type = '[Products] FetchSelectedProduct';

  constructor(private payload: string[]) {
  }
}
