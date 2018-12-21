import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Actions } from '@ngxs/store';
import { take } from 'rxjs/operators';


import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<any> {

  constructor(
    private productsService: ProductsService
  ) {
  }

  resolve() {
    return this.productsService.fetchProducts().pipe(
      take(1)
    );

  }
}

