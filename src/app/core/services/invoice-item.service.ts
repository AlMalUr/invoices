import { Injectable } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchInvoiceItem, ResetInvoiceItem } from '../../ngxs/invoice-item/invoice-item.actions';
import { InvoiceItemState } from '../../ngxs/invoice-item/invoice-item.state';
import { InvoiceItemModel } from '../../shared/models/invoice-item.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceItemService {

  @Select(InvoiceItemState.getInvoiceItem) invoiceItem$: Observable<InvoiceItemModel[]>;

  constructor(
    private store: Store,
  ) {
  }

  fetchInvoiceItem(id) {
    return this.store.dispatch(new FetchInvoiceItem(id));
  }

  resetInvoiceItem() {
    return this.store.dispatch(new ResetInvoiceItem());
  }

}
