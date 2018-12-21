import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchCustomers } from '../../../ngxs/customers/customers.actions';
import { CustomersState } from '../../../ngxs/customers/customers.state';
import { FetchInvoices } from '../../../ngxs/invoices/invoices.actions';
import { InvoicesState } from '../../../ngxs/invoices/invoices.state';
import { CustomerModel, InvoiceModel } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  @Select(InvoicesState.getInvoices) invoices$: Observable<InvoiceModel[]>;
  @Select(InvoicesState.getInvoicesCount) invoicesCount$: Observable<number>;
  @Select(CustomersState.getCustomers) customers$: Observable<CustomerModel[]>;

  constructor(private store: Store) {
  }

  fetchInvoices() {
    return this.store.dispatch([new FetchInvoices(), new FetchCustomers()]);
  }

}
