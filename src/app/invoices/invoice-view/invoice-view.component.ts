import { Component, OnDestroy, OnInit } from '@angular/core';

import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { combineLatest } from 'rxjs';
import { CustomersService } from '../../core/services/customers.service';
import { ProductsService } from '../../core/services/products.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit, OnDestroy {

  viewItems$;

  displayedColumns: string[] = ['number', 'products', 'qty', 'price'];

  constructor(
    private invoiceService: InvoiceService,
    private invoiceItemsService: InvoiceItemsService,
    private customersService: CustomersService,
    private productsService: ProductsService
  ) {
  }


  ngOnInit() {
   // this.invoice$ = this.invoiceService.invoice$;
   this.viewItems$ = combineLatest(
     this.invoiceService.invoice$,
     this.invoiceItemsService.invoiceItems$,
     this.customersService.customers$,
     this.productsService.products$
   ).pipe(
     map(([invoice, invoiceItems, customers, products]) => invoiceItems.map(inv => ({
       ...inv,
       discount: invoice.discount,
       total: invoice.total,
       customer: customers.find(customer => invoice.customer_id === customer._id),
     }))
   )
   ).subscribe(x => console.log(x));
  }

  ngOnDestroy() {
    this.invoiceService.resetInvoice();
    this.invoiceItemsService.resetInvoiceItems();
  }

}

// ).pipe(
//   map(([products, invoices, customers, invoiceItem]) => invoiceItem.map(inv => ({
//       ...inv,
//       product: products.filter(x => x._id === inv.product_id), // .map(selected => selected.name),
//       invoice: invoices.filter(x => x._id === inv.invoice_id),
//       customer: customers.filter(customer => customer._id === invoices.find(x => x._id === inv.invoice_id).customer_id)
//     }))
//   )
// );
