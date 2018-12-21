import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CustomerModel, InvoiceModel } from '../../models/models';
import { InvoicesState } from '../../../ngxs/invoices/invoices.state';
import { FetchInvoices } from '../../../ngxs/invoices/invoices.actions';
import { FetchCustomers } from '../../../ngxs/customers/customers.actions';
import { CustomersState } from '../../../ngxs/customers/customers.state';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  @Select(InvoicesState.getInvoices) invoices$: Observable<InvoiceModel[]>;
  @Select(InvoicesState.getInvoicesCount) invoicesCount$: Observable<number>;


  constructor(private store: Store) {
  }

  fetchInvoices() {
    return this.store.dispatch(new FetchInvoices());
  }

}
