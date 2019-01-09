import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { ProductsRequestService } from '../../../core/services/products-services/products-request.service';
import { FetchProductsFailed, FetchProductsSuccess } from '../../products/products.actions';
import { IRequest } from '../requests.interface';

import { ProductsRequestAction, ProductsRequestFailAction, ProductsRequestSuccessAction } from './products-request.action';

export interface ProductsRequestStateModel extends IRequest {

}

@State<ProductsRequestStateModel>({
  name: 'productsRequestState',
  defaults: {
    loading: false,
    load: false,
    status: '',
    data: null,
  },
})
export class ProductsRequestState {

  constructor(
    private productsRequestService: ProductsRequestService,
  ) {
  }

  @Selector()
  static getLoad(state: ProductsRequestStateModel): boolean {
    return state.load;
  }

  @Action(ProductsRequestAction)
  productsRequest(ctx: StateContext<ProductsRequestStateModel>, action: ProductsRequestAction) {
    ctx.patchState({
      loading: true,
      load: false,
      status: '',
      data: null,
    });
    return this.productsRequestService
    .fetchProducts()
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new ProductsRequestSuccessAction(res));
      }),
      catchError(error => {
        return ctx.dispatch(new ProductsRequestFailAction(error));
      }),
    );
  }

  @Action(ProductsRequestSuccessAction)
  productsRequestSuccess(
    ctx: StateContext<ProductsRequestStateModel>,
    action: ProductsRequestSuccessAction
  ) {
    ctx.patchState({
      loading: false,
      load: true,
      status: 'success',
      data: action.payload.data,
    });
    ctx.dispatch(new FetchProductsSuccess(action.payload));
  }

  @Action(ProductsRequestFailAction)
  productsRequestFail(ctx: StateContext<ProductsRequestStateModel>, action: ProductsRequestFailAction) {
    ctx.patchState({
      loading: false,
      load: true,
      status: 'fail',
      data: action.payload,
    });
    ctx.dispatch(new FetchProductsFailed(action.payload));
  }

}
