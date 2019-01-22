import { Action, Selector, State, StateContext, } from '@ngxs/store';

import { ProductModel, } from '../../shared/models/product.model';
import { ProductsRequest, } from '../requests/products/products-request.action';

import {
  FetchProducts,
  FetchProductsSuccess, FetchSelectedProduct,
} from './products.actions';
import { FetchSelectedCustomer } from '../customers/customers.actions';
import { CustomersStateModel } from '../customers/customers.state';

export class ProductsStateModel {
  entities: { [ids: string]: ProductModel };
  collectionIds: string[];
  selectedProducts;
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    entities: {},
    collectionIds: [],
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
      selectedProducts: 1
    });
  }

  @Action(FetchSelectedProduct)
  fetchSelectedInvoice (
    {patchState, getState}: StateContext<ProductsStateModel>,
    {payload: product_ids}: FetchSelectedProduct
  ) {
    console.log(product_ids);
    const product = Object.values(getState().entities)
    .filter(prod => prod._id === String(product_ids));
    patchState({
      selectedProducts: product
    });
  }
}

