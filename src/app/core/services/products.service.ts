import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchProducts } from '../../ngxs/products/products.actions';
import { ProductsState } from '../../ngxs/products/products.state';
import { ProductModel } from '../../shared/models/product.model';

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
