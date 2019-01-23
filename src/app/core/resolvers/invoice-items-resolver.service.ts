import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { InvoiceItemModel } from '../../shared/models/invoice-item.model';
import { InvoiceItemsService } from '../services/invoice-items.service';


@Injectable({
  providedIn: 'root'
})
export class InvoiceItemsResolverService implements Resolve<InvoiceItemModel[]> {

  constructor(
    private invoiceItemsService: InvoiceItemsService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvoiceItemModel[]> {
    const id = route.paramMap.get('id');
    return this.invoiceItemsService.invoiceItems$.pipe(
      switchMap(invoiceItems =>
        invoiceItems ? this.invoiceItemsService.invoiceItems$ : this.invoiceItemsService.fetchInvoiceItems(id)
      ),
      filter(invoiceItems => !!invoiceItems),
      take(1)
    );
  }
}


