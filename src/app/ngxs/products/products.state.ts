import * as ProductsActions from './products.actions';
import { ProductModel } from '../../core/models/models';
import { ProductsRequestService } from '../../core/services/products-services/products-request.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

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
    private invoicesRequestService: ProductsRequestService
  ) {
  }

  @Selector()
  static getProducts(state: ProductsStateModel) {
    return state.productsIds.map(id => state.products[id]);
  }

  @Action(ProductsActions.FetchProducts)
  fetchProducts({dispatch}: StateContext<ProductsStateModel>) {
    return this.invoicesRequestService
    .fetchProducts()
    .pipe(
      tap((products: ProductModel[]) => {
        dispatch(new ProductsActions.FetchProductsSuccess(products));
      }),
      catchError(error =>
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
  sharedTodoItemFailed(
    {dispatch}: StateContext<ProductModel>,
    {payload: error}: ProductsActions.FetchProductsFailed
  ) {
    dispatch(
      console.error('An error occured: ', error.message)
    );
  }

}


// _id: string = null;
// name: string = null;
// price: number = null;
