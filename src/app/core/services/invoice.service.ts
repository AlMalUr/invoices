import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';

import { FetchInvoice, ResetInvoice } from '../../ngxs/invoices/invoices.actions';
import { InvoicesState } from '../../ngxs/invoices/invoices.state';
import { InvoiceModel } from '../../shared/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  @Select(InvoicesState.getInvoice) invoice$: Observable<InvoiceModel>;

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

