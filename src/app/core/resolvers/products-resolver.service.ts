import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { ProductsState } from '../../ngxs/products/products.state';
import { ProductModel } from '../../shared/models/product.model';
import { ProductsService } from '../services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<any> {

  constructor(
    private productsService: ProductsService,
    private store: Store
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductModel[]> {
     return this.store.select(ProductsState.getProducts).pipe(
       switchMap(products => {
           return products.length ? of(products) : this.productsService.fetchProducts();
         }
       ),
       filter(products => products && products.length),
       take(1)
     );
  }
}



