import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ProductsState } from '../../ngxs/products/products.state';
import { ProductModel } from '../models/product.model';
import { ProductsService } from '../services/products-services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<ProductModel[]> {

  isLoaded = false;

  constructor(
    private productsService: ProductsService,
    private store: Store
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (!this.isLoaded) {
      this.isLoaded = true;
      return this.productsService.fetchProducts().pipe(
        take(1)
      );
    } else {
      return this.store.selectSnapshot(ProductsState);
    }
  }
}

