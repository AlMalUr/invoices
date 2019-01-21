import { Injectable } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchInvoiceItem, ResetInvoiceItem } from '../../ngxs/invoice-item/invoice-item.actions';
import { InvoiceItemState } from '../../ngxs/invoice-item/invoice-item.state';
import { InvoiceItemModel } from '../../shared/models/invoice-item.model';
import { InvoiceModel } from '../../shared/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceItemService {

  @Select(InvoiceItemState.getInvoiceItem) invoiceItem$: Observable<InvoiceModel>;

  constructor(
    private store: Store,
  ) {
  }

  fetchInvoiceItem(id) {
    this.store.dispatch(new FetchInvoiceItem(id));
    return this.invoiceItem$;
  }

  resetInvoiceItem() {
    return this.store.dispatch(new ResetInvoiceItem());
  }

}
