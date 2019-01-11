import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { switchMap, take } from 'rxjs/operators';

import { ProductsState } from '../../ngxs/products/products.state';

import { ProductsService } from '../services/products-services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<any> {

  constructor(
    private productsService: ProductsService,
    private store: Store
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     return this.store.select(ProductsState.getProducts).pipe(
       switchMap(products => {
         if (products.length === 0) {
          return this.productsService.fetchProducts();
         } else { return products; }
         }
       ),
       take(1)
     ).subscribe();
  }
}



