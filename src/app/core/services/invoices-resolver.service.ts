import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { map, take } from 'rxjs/operators';

import { FetchProductsFailed, FetchProductsSuccess } from '../../ngxs/products/products.actions';

import { InvoicesService } from './invoices.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesResolverService implements Resolve<any> {

  constructor(
    private productsService: InvoicesService,
    private router: Router,
    private actions$: Actions
  ) {
  }

  resolve() {
    return this.productsService.fetchProducts().pipe(
      take(1)
    );

  }
}

