import { Component, OnDestroy, OnInit } from '@angular/core';

import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { CustomersService } from '../../core/services/customers.service';
import { InvoiceItemsService } from '../../core/services/invoice-items.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit, OnDestroy {

  viewItems$;
  viewItem$;

  displayedColumns: string[] = ['number', 'products', 'qty', 'price'];

  constructor(
    private invoiceService: InvoiceService,
    private invoiceItemsService: InvoiceItemsService,
    private customersService: CustomersService,
    private productsService: ProductsService
  ) {
  }


  ngOnInit() {
   this.viewItems$ = combineLatest(
     this.invoiceItemsService.invoiceItems$,
     this.productsService.products$,
     this.invoiceService.invoice$.pipe(filter(invoice => !!invoice))
   ).pipe(
     map(([invoiceItems, products, invoice]) => invoiceItems.map(invItm => ({
       ...invItm,
       product: products.find(product => product._id === invItm.product_id),
       price: (
         (invItm.quantity * products.find(product => product._id === invItm.product_id).price) / 100 * (100 - (invoice.discount || 0)))
       .toFixed(2)
     })))
   );

    this.viewItem$ = combineLatest(
      this.invoiceService.invoice$.pipe(filter(invoice => !!invoice)),
      this.customersService.customers$
    ).pipe(
      map(([invoice, customers]) => ({
        ...invoice,
        customer: customers.find(customer => customer._id === invoice.customer_id)
      }))
    );
  }

  ngOnDestroy() {
    this.invoiceService.resetInvoice();
    this.invoiceItemsService.resetInvoiceItems();
  }

}

