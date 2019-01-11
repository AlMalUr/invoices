import { Action, Selector, State, StateContext } from '@ngxs/store';

import { ProductModel } from '../../shared/models/product.model';
import { ProductsRequestAction } from '../requests/products/products-request.action';

import {
  FetchProducts,
  FetchProductsFailed,
  FetchProductsSuccess
} from './invoice-item.actions';

export class InvoiceViewStateModel {
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
export class InvoiceItemState {

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

      console.error('An error occured: ', error.message)

  }

}

