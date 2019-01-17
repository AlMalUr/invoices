import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { InvoiceItemModel } from '../../shared/models/invoice-item.model';
import { InvoiceItemService } from '../services/invoice-item.service';


@Injectable({
  providedIn: 'root'
})
export class InvoiceItemResolverService implements Resolve<InvoiceItemModel[] | boolean> {

  constructor(
    private invoiceItemService: InvoiceItemService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvoiceItemModel[]>   {
    const id = route.paramMap.get('id');
    if (id) {
      return this.invoiceItemService.fetchInvoiceItem(id).pipe(
        filter(item => item && item.length),
        take(1)
      );
    }
  }
}
