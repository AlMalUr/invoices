import { Injectable } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchInvoiceItems, ResetInvoiceItems } from '../../ngxs/invoice-items/invoice-items.actions';
import { InvoiceItemsState } from '../../ngxs/invoice-items/invoice-items.state';
import { InvoiceItemModel } from '../../shared/models/invoice-item.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceItemsService {

  @Select(InvoiceItemsState.getInvoiceItems) invoiceItems$: Observable<InvoiceItemModel[]>;

  constructor(
    private store: Store,
  ) {
 }
  fetchInvoiceItems(id) {
    this.store.dispatch(new FetchInvoiceItems(id));
    return this.invoiceItems$;
  }

  resetInvoiceItems() {
    return this.store.dispatch(new ResetInvoiceItems());
  }

}
