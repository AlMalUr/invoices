import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';

import { FetchInvoices } from '../../ngxs/invoices/invoices.actions';
import { InvoicesState } from '../../ngxs/invoices/invoices.state';
import { InvoiceModel } from '../../shared/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  @Select(InvoicesState.getInvoices) invoices$: Observable<InvoiceModel[]>;

  constructor(private store: Store) {
  }

  fetchInvoices() {
      this.store.dispatch(new FetchInvoices());
      return this.invoices$;
  }
}

