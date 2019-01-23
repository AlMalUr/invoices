import { Action, Selector, State, StateContext, } from '@ngxs/store';

import { ProductModel, } from '../../shared/models/product.model';
import { ProductsRequest, } from '../requests/products/products-request.action';

import {
  FetchProducts,
  FetchProductsSuccess, FetchSelectedProduct,
} from './products.actions';

export class ProductsStateModel {
  entities: { [ids: string]: ProductModel };
  collectionIds: string[];
  selectedProducts;
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    entities: {},
    collectionIds: null,
    selectedProducts: null
  }
})
export class ProductsState {

  @Selector()
  static getProducts(state: ProductsStateModel) {
    return state.collectionIds.map(id => state.entities[id]);
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
    const entities = product.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {});
    const collectionIds = product.map(item => item._id);
    setState({
      entities: entities,
      collectionIds: collectionIds,
      selectedProducts: null
    });
  }

  @Action(FetchSelectedProduct)
  fetchSelectedInvoice (
    {patchState, getState}: StateContext<ProductsStateModel>,
    {payload: product_ids}: FetchSelectedProduct
  ) {
    const product = Object.values(getState().entities)
    .filter(prod => {
      for (let x = 0; x < product_ids.length; x++) {
        if (product_ids[x] === prod._id) {
          return prod;
        }
      }
    });
    patchState({
      selectedProducts: product
    });
  }
}

