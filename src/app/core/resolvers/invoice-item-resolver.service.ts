import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { map, take } from 'rxjs/operators';

import { CustomersRequestState } from '../../ngxs/requests/customers/customers-request.state';
import { CustomersService } from '../services/customers-services/customers.service';
import { ProductsState } from '../../ngxs/products/products.state';


@Injectable({
  providedIn: 'root'
})
export class InvoiceItemResolverService implements Resolve<any> {

  @Select(CustomersRequestState.getLoad) load$: boolean;

  constructor(
    private customersService: CustomersService,
    private store: Store
  ) {
  }

  resolve() {
    this.store.select(ProductsState.getProducts).pipe(
      map(products => {
          if (products.length === 0) {
            return this.productsService.fetchProducts();
          } else { return products; }
        }
      ),
      take(1)
    ).subscribe();
  }
}
