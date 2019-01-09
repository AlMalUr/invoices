import { Action, Selector, State, StateContext } from '@ngxs/store';

import { ProductModel } from '../../core/models/product.model';
import { ProductsRequestAction } from '../requests/products/products-request.action';

import {
  FetchProducts,
  FetchProductsFailed,
  FetchProductsSuccess
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

  constructor(
  ) {
  }

  @Selector()
  static getProducts(state: ProductsStateModel) {
    return state.productsIds.map(id => state.products[id]);
  }

  @Action(FetchProducts)
  fetchProducts({dispatch}: StateContext<ProductsStateModel>) {
    dispatch(new ProductsRequestAction);
  }

  @Action(FetchProductsSuccess)
  fetchProductsSuccess(
    {setState}: StateContext<ProductsStateModel>,
    {payload: prod}: FetchProductsSuccess
  ) {
    setState({
      products: prod.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      productsIds: prod.map(item => item._id)
    });
  }


  @Action(FetchProductsFailed)
  ProductsFailed(
    {dispatch}: StateContext<ProductModel>,
    {payload: error}: FetchProductsFailed
  ) {
    dispatch(
      console.error('An error occured: ', error.message)
    );
  }

}

