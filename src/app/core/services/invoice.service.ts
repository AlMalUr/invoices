import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';

import { FetchInvoice, ResetInvoice } from '../../ngxs/invoice/invoice.actions';
import { InvoiceState } from '../../ngxs/invoice/invoice.state';
import { InvoiceModel } from '../../shared/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  @Select(InvoiceState.getInvoice) invoice$: Observable<InvoiceModel>;

  constructor(private store: Store) {
  }

  fetchInvoice(id) {
    this.store.dispatch(new FetchInvoice(id));
    return this.invoice$;
  }

  resetInvoice() {
    return this.store.dispatch(new ResetInvoice());
  }
}

