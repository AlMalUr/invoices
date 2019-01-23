import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { InvoiceModel } from '../../shared/models/invoice.model';
import { InvoiceService } from '../services/invoice.service';
import { filter, switchMap, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InvoiceResolverService implements Resolve<InvoiceModel> {

  constructor(
    private invoiceService: InvoiceService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvoiceModel> {
    const id = route.paramMap.get('id');
    return this.invoiceService.invoice$.pipe(
      switchMap(invoice =>
        invoice ? this.invoiceService.invoice$ : this.invoiceService.fetchInvoice(id)
      ),
      filter(invoice => !!invoice),
      take(1)
    );
  }
}
