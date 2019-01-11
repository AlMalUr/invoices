import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { InvoicesService } from '../../core/services/invoices-services/invoices.service';

@Component({
  selector: 'app-invoices-all',
  templateUrl: './invoices-all.component.html',
  styleUrls: ['./invoices-all.component.scss']
})
export class InvoicesAllComponent implements OnInit {

  selected;
  invoices$: Observable<any>;

  displayedColumns: string[] = ['number', 'customerId', 'customerName', 'discount', 'total', 'actions'];

  constructor(private invoicesService: InvoicesService) { }

  selectedInvoice(invoice) {
    this.selected = invoice;
    console.log(invoice);
  }
  ngOnInit() {
    this.invoices$ = combineLatest(this.invoicesService.invoices$, this.invoicesService.customers$).pipe(
      map( ([invoices, customers]) => invoices.map(invoice => ({
        ...invoice,
        customer: customers.find(customer => invoice.customer_id === customer._id)
      }))
    ));
  }

}


