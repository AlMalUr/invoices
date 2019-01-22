import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { ProductModel } from '../../shared/models/product.model';
import { ProductsService } from '../services/products.service';
import { Select } from '@ngxs/store';
import { ProductsRequestState } from '../../ngxs/requests/products/products-request.state';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<any> {

  @Select(ProductsRequestState)
  productsRequestState$;

  constructor(
    private productsService: ProductsService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductModel[]> {
    return this.productsService.fetchProducts().pipe(
      filter(products => {if (products && products.length) {return true; }}),
      take(1)
    );
  }
}



