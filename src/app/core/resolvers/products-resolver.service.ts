import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { take } from 'rxjs/operators';

import { ProductsState } from '../../ngxs/products/products.state';
import { ProductModel } from '../models/product.model';
import { ProductsService } from '../services/products-services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<ProductModel[]> {

  constructor(
    private productsService: ProductsService,
    private store: Store
  ) {
  }

  resolve() {
    if (!this.store.selectSnapshot(ProductsState.getProducts).length) {
      return this.productsService.fetchProducts().pipe(
        take(1)
      );
    } else {
      return this.store.selectSnapshot(ProductsState);
    }
  }
}

