import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { InvoiceItemService } from '../services/invoice-item.service';


@Injectable({
  providedIn: 'root'
})
export class InvoiceItemResolverService implements Resolve<any> {

  constructor(
    private invoiceItemService: InvoiceItemService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    return this.invoiceItemService.fetchInvoiceItem(id)
    .pipe(
     // filter(invoices => {if (invoices && invoices.length) {return true; }}),
      take(1)
    );
  }
}
