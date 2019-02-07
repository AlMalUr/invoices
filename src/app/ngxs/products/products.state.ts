import { Action, Selector, State, StateContext, } from '@ngxs/store';

import { ProductModel, } from '../../shared/models/product.model';
import { ProductsRequest, } from '../requests/products/products-request.action';

import {
  FetchProducts,
  FetchProductsSuccess
} from './products.actions';

export class ProductsStateModel {
  entities: { [ids: string]: ProductModel };
  collectionIds: string[];
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    entities: {},
    collectionIds: null
  }
})
export class ProductsState {

  @Selector()
  static getProducts(state: ProductsStateModel) {
    return state.collectionIds.map(id => state.entities[id]);
  }

  @Action(FetchProducts)
  fetchProducts(
    {dispatch}: StateContext<ProductsStateModel>
  ) {
    return dispatch(new ProductsRequest);
  }

  @Action(FetchProductsSuccess)
  fetchProductsSuccess(
    {setState}: StateContext<ProductsStateModel>,
    {payload: product}: FetchProductsSuccess
  ) {
    const entities = product.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {});
    const collectionIds = product.map(item => item._id);
    return setState({
      entities: entities,
      collectionIds: collectionIds
    });
  }
}

