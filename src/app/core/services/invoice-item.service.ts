import { Injectable } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchSelectedCustomer } from '../../ngxs/customers/customers.actions';
import { FetchInvoiceItem, ResetInvoiceItem } from '../../ngxs/invoice-item/invoice-item.actions';
import { InvoiceItemState } from '../../ngxs/invoice-item/invoice-item.state';
import { FetchSelectedInvoice } from '../../ngxs/invoices/invoices.actions';
import { InvoicesState } from '../../ngxs/invoices/invoices.state';
import { FetchSelectedProduct } from '../../ngxs/products/products.actions';
import { InvoiceModel } from '../../shared/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceItemService {

  productIds;
  customerId;
  @Select(InvoiceItemState.getProductIds) productIds$: Observable<string[]>;
  @Select(InvoiceItemState.getInvoiceItems) invoiceItem$: Observable<any>;
  @Select(InvoicesState.getInvoices) invoices$: Observable<InvoiceModel[]>;
  @Select(InvoicesState.getCustomerId) customerId$: Observable<string>;


  constructor(
    private store: Store,
  ) {
    this.customerId$.subscribe(id => this.customerId = id);
    this.productIds$.subscribe(ids => {this.productIds = ids.slice(); });
  }

  fetchInvoiceItem(id) {
    this.store.dispatch([new FetchInvoiceItem(id), new FetchSelectedInvoice(id)]);
    this.store.dispatch(new FetchSelectedCustomer(this.customerId));
    if (this.productIds.length) {this.store.dispatch(new FetchSelectedProduct(this.productIds));
    return this.invoiceItem$; }

  }

  resetInvoiceItem() {
    return this.store.dispatch(new ResetInvoiceItem());
  }

}
