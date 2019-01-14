import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { map, take } from 'rxjs/operators';

import { CustomersRequestState } from '../../ngxs/requests/customers/customers-request.state';
import { CustomersService } from '../services/customers-services/customers.service';
import { ProductsState } from '../../ngxs/products/products.state';
import { InvoiceItemService } from '../services/invoice-item-servises/invoice-item.service';


@Injectable({
  providedIn: 'root'
})
export class InvoiceItemResolverService implements Resolve<any> {

  @Select(CustomersRequestState.getLoad) load$: boolean;

  constructor(
    private invoiceItemService: InvoiceItemService,
    private store: Store
  ) {
  }

  resolve() {
    return this.invoiceItemService.fetchInvoiceView();
  }
}
