import { HttpErrorResponse } from '@angular/common/http';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { ProductModel } from '../../core/models/product.model';
import { ProductsRequestService } from '../../core/services/products-services/products-request.service';

import * as ProductsActions from './products.actions';

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
    private productsRequestService: ProductsRequestService
  ) {
  }

  @Selector()
  static getProducts(state: ProductsStateModel) {
    return state.productsIds.map(id => state.products[id]);
  }

  @Action(ProductsActions.FetchProducts)
  fetchProducts({dispatch}: StateContext<ProductsStateModel>) {
    return this.productsRequestService
    .fetchProducts()
    .pipe(
      tap((products: ProductModel[]) => {
        dispatch(new ProductsActions.FetchProductsSuccess(products));
      }),
      catchError((error: HttpErrorResponse) =>
        dispatch(new ProductsActions.FetchProductsFailed(error))
      )
    );
  }

  @Action(ProductsActions.FetchProductsSuccess)
  fetchProductsSuccess(
    {setState}: StateContext<ProductsStateModel>,
    {payload: prod}: ProductsActions.FetchProductsSuccess
  ) {
    setState({
      products: prod.reduce((acc, item) => ({
        ...acc,
        [item._id]: item
      }), {}),
      productsIds: prod.map(item => item._id)
    });
  }


  @Action(ProductsActions.FetchProductsFailed)
  ProductsFailed(
    {dispatch}: StateContext<ProductModel>,
    {payload: error}: ProductsActions.FetchProductsFailed
  ) {
    dispatch(
      console.error('An error occured: ', error.message)
    );
  }

}

