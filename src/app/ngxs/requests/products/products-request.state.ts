import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchProductsFailed, FetchProductsSuccess } from '../../products/products.actions';
import { IRequest } from '../requests.interface';

import {
  ProductsRequestAction,
  ProductsRequestFailAction,
  ProductsRequestSuccessAction,
} from './products-request.action';


@State<IRequest>({
  name: 'productsRequestState',
  defaults: {
    loading: false,
    loaded: false,
    status: '',
    data: null,
  },
})
export class ProductsRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Selector()
  static getLoad(state: IRequest): boolean {
    return state.loaded;
  }

  @Action(ProductsRequestAction)
  productsRequest(ctx: StateContext<IRequest>, action: ProductsRequestAction) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.requestService
    .fetch('products')
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
    ctx: StateContext<IRequest>,
    {payload}: ProductsRequestSuccessAction
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: payload,
    });
    ctx.dispatch(new FetchProductsSuccess(payload));
  }

  @Action(ProductsRequestFailAction)
  productsRequestFail(ctx: StateContext<IRequest>, {payload}: ProductsRequestFailAction) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: payload,
    });
    ctx.dispatch(new FetchProductsFailed(payload));
  }

}
