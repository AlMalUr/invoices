import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { InvoicesService } from './invoices.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesResolverService implements Resolve<any> {

  constructor(
    private invoicesService: InvoicesService,

  ) {
  }

  resolve() {
    return this.invoicesService.fetchInvoices().pipe(
      take(1)
    );

  }
}

