import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';

import { FetchInvoices } from '../../ngxs/invoices/invoices.actions';
import { InvoicesState } from '../../ngxs/invoices/invoices.state';
import { InvoicesRequestState } from '../../ngxs/requests/invoices/invoices-request.state';
import { InvoiceModel } from '../../shared/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  isLoaded;
  @Select(InvoicesState.getInvoices) invoices$: Observable<InvoiceModel[]>;
  @Select(InvoicesRequestState.isLoaded) isLoaded$: Observable<boolean>;

  constructor(private store: Store) {
    this.isLoaded$.subscribe(loaded => this.isLoaded = loaded);
  }

  fetchInvoices() {
    if (!this.isLoaded ) {
      this.store.dispatch(new FetchInvoices());
    }
    return this.invoices$;
  }

}
