import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { InvoiceItemModel } from '../../shared/models/invoice-item.model';
import { InvoiceItemService } from '../services/invoice-item.service';


@Injectable({
  providedIn: 'root'
})
export class InvoiceItemResolverService implements Resolve<InvoiceItemModel[]> {

  constructor(
    private invoiceItemService: InvoiceItemService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvoiceItemModel[]> {
    const id = route.paramMap.get('id');
    return this.invoiceItemService.fetchInvoiceItem(id).pipe(
      filter(invoices => {if (invoices && invoices.length) {return true; }}),
      take(1)
    );
  }
}
