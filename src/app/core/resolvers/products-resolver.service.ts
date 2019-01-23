import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { ProductModel } from '../../shared/models/product.model';
import { ProductsService } from '../services/products.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<ProductModel[]> {

  constructor(
    private productsService: ProductsService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductModel[]> {
    return this.productsService.products$.pipe(
      switchMap((products) =>
        products ? this.productsService.products$ : this.productsService.fetchProducts()
      ),
      filter(products => !!products),
      take(1)
    );
  }
}



