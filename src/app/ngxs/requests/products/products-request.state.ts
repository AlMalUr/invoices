import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchProductsSuccess } from '../../products/products.actions';
import { IRequest } from '../requests.interface';

import {
  ProductsRequest,
  ProductsRequestFail,
  ProductsRequestSuccess,
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

  @Selector()
  static isLoaded(state: IRequest) {
    return state.loaded;
  }

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Action(ProductsRequest)
  productsRequest(ctx: StateContext<IRequest>, action: ProductsRequest) {
    ctx.patchState({
      loading: true,
      loaded: false,
      status: '',
      data: null,
    });
    return this.requestService
    .get('products')
    .pipe(
      tap((res: any) => {
        return ctx.dispatch(new ProductsRequestSuccess(res));
      }),
      catchError(error => {
        return ctx.dispatch(new ProductsRequestFail(error));
      }),
    );
  }

  @Action(ProductsRequestSuccess)
  productsRequestSuccess(
    ctx: StateContext<IRequest>,
    {payload}: ProductsRequestSuccess
  ) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'success',
      data: payload,
    });
    ctx.dispatch(new FetchProductsSuccess(payload));
  }

  @Action(ProductsRequestFail)
  productsRequestFail(ctx: StateContext<IRequest>, {payload}: ProductsRequestFail) {
    ctx.patchState({
      loading: false,
      loaded: true,
      status: 'fail',
      data: payload,
    });
    console.error('An error occured: ', payload.message);
  }
}
