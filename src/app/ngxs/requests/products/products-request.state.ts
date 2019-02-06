import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { RequestService } from '../../../core/services/request.service';
import { FetchProductsSuccess } from '../../products/products.actions';
import { IRequest } from '../requests.interface';
import {
  requestEntitiesFail,
  requestEntitiesInitial,
  requestEntitiesLoading,
  requestEntitiesSuccess
} from '../shared/requests-entities';

import {
  ProductsRequest,
  ProductsRequestFail,
  ProductsRequestSuccess,
} from './products-request.action';


@State<IRequest>({
  name: 'productsRequestState',
  defaults: requestEntitiesInitial,
})
export class ProductsRequestState {

  constructor(
    private requestService: RequestService,
  ) {
  }

  @Action(ProductsRequest)
  productsRequest(ctx: StateContext<IRequest>) {
    ctx.patchState(requestEntitiesLoading);
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
    ctx.patchState(requestEntitiesSuccess(payload));
    ctx.dispatch(new FetchProductsSuccess(payload));
  }

  @Action(ProductsRequestFail)
  productsRequestFail(ctx: StateContext<IRequest>, {payload}: ProductsRequestFail) {
    ctx.patchState(requestEntitiesFail(payload));
    console.error('An error occured: ', payload.message);
  }
}
