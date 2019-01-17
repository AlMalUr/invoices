import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { InvoicesState } from '../../ngxs/invoices/invoices.state';
import { InvoiceModel } from '../../shared/models/invoice.model';
import { InvoicesService } from '../services/invoices.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesResolverService implements Resolve<InvoiceModel[]> {

  constructor(
    private invoicesService: InvoicesService,
    private store: Store
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvoiceModel[]> {
    return this.store.select(InvoicesState.getInvoices).pipe(
      switchMap(invoices => {
          return invoices.length ? of(invoices) : this.invoicesService.fetchInvoices();
        }
      ),
      filter(invoices => invoices && invoices.length),
      take(1)
    );
  }
}

