import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

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
    return this.invoicesService.fetchInvoices().pipe(
      filter(invoices => {if (invoices && invoices.length) {return true; }}),
      take(1)
    );
  }
}

