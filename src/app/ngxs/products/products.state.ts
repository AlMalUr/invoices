import { Action, Selector, State, StateContext, } from '@ngxs/store';

import { ProductModel, } from '../../shared/models/product.model';
import { ProductsRequest, } from '../requests/products/products-request.action';

import {
  FetchProducts,
  FetchProductsSuccess,
} from './products.actions';

export class ProductsStateModel {
  products: { [ids: string]: ProductModel };
  productsIds: string[];
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    products: {},
    productsIds: []
  }
})
export class ProductsState {

  @Selector()
  static getProducts(state: ProductsStateModel) {
    return state.productsIds.map(id => state.products[id]);
  }

  @Action(FetchProducts)
  fetchProducts({dispatch}: StateContext<ProductsStateModel>) {
    dispatch(new ProductsRequest);
  }

  @Action(FetchProductsSuccess)
  fetchProductsSuccess(
    {setState}: StateContext<ProductsStateModel>,
    {payload: product}: FetchProductsSuccess
  ) {
    const products = product.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {});
    const productsIds = product.map(item => item._id);
    setState({
      products,
      productsIds,
    });
  }
}

