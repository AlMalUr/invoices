import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { InvoiceModel } from '../../shared/models/invoice.model';
import { InvoicesService } from '../services/invoices.service';


@Injectable({
  providedIn: 'root'
})
export class InvoicesResolverService implements Resolve<InvoiceModel[]> {

  constructor(
    private invoicesService: InvoicesService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvoiceModel[]> {
    return this.invoicesService.invoices$.pipe(
      switchMap((invoices) =>
        invoices ? this.invoicesService.invoices$ : this.invoicesService.fetchInvoices()
      ),
      filter(invoices => !!invoices ),
      take(1)
    );
  }
}

