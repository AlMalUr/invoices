import { Injectable } from '@angular/core';
import { FetchProducts } from '../../../ngxs/products/products.actions';
import { Select, Store } from '@ngxs/store';
import { ProductsState } from '../../../ngxs/products/products.state';
import { Observable } from 'rxjs';
import { ProductModel } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  @Select(ProductsState.getProducts) products$: Observable<ProductModel[]>;

  constructor(private store: Store) {
  }

  fetchProducts() {
    return this.store.dispatch(new FetchProducts());
  }

}
