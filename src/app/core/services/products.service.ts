import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';

import { FetchProducts } from '../../ngxs/products/products.actions';
import { ProductsState } from '../../ngxs/products/products.state';
import { ProductsRequestState } from '../../ngxs/requests/products/products-request.state';
import { ProductModel } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  isLoaded;
  @Select(ProductsState.getProducts) products$: Observable<ProductModel[]>;
  @Select(ProductsRequestState.isLoaded) isLoaded$: Observable<boolean>;

  constructor(private store: Store) {
    this.isLoaded$.subscribe(loaded => this.isLoaded = loaded);
  }

  fetchProducts() {
    if ( !this.isLoaded ) {
      this.store.dispatch(new FetchProducts());
    }
    return this.products$;
  }

}
