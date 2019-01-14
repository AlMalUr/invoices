import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { FetchInvoiceItem } from '../../../ngxs/invoice-item/invoice-item.actions';
import { ActivatedRoute } from '@angular/router';
import { InvoicesService } from '../invoices-services/invoices.service';
import { map } from 'rxjs/operators';
import { InvoiceItemState } from '../../../ngxs/invoice-item/invoice-item.state';
import { InvoiceItemModel } from '../../../shared/models/invoice-item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceItemService {

  id;

  @Select(InvoiceItemState.getInvoiceItem) invoiceItem$: Observable<InvoiceItemModel[]>;

  constructor(
    private store: Store,
    private invoicesService: InvoicesService
  ) {
    this.invoicesService.selectedItem$.subscribe(id => this.id = id)
    ;
  }

  fetchInvoiceView() {
    return this.store.dispatch(new FetchInvoiceItem(this.id));
  }

}
