import { Injectable } from '@angular/core';
import { Resolve} from '@angular/router';
import { Store } from '@ngxs/store';
import { take } from 'rxjs/operators';

import { InvoicesState } from '../../ngxs/invoices/invoices.state';
import { InvoicesService } from '../services/invoices-services/invoices.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesResolverService implements Resolve<any> {

  constructor(
    private invoicesService: InvoicesService,
    private store: Store
  ) {
  }

  resolve() {
    if (!this.store.selectSnapshot(InvoicesState.getInvoices).length) {
      return this.invoicesService.fetchInvoices().pipe(
        take(1)
      );
    } else {
      return this.store.selectSnapshot(InvoicesState);
    }
  }
}
