import { Component, OnDestroy, OnInit } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { InvoiceItemService } from '../../core/services/invoice-item.service';
import { InvoicesService } from '../../core/services/invoices.service';
import { ProductsService } from '../../core/services/products.service';
import { CustomersService } from '../../core/services/customers.service';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss']
})
export class InvoiceItemComponent implements OnInit, OnDestroy {

  invoice$;

  displayedColumns: string[] = ['number', 'products', 'qty', 'price'];

  constructor(
    private invoiceItemService: InvoiceItemService,
    private invoicesService: InvoicesService,
    private productsService: ProductsService,
    private customersService: CustomersService
  ) {
  }


  ngOnInit() {
    this.invoice$ = this.invoiceItemService.invoiceItem$; // .subscribe(x => console.log(x));

  //  this.invoice$ = combineLatest(
  //    this.productsService.products$,
  //    this.invoicesService.invoices$,
  //    this.customersService.customers$,
  //    this.invoiceItemService.invoiceItem$
  //  ).pipe(
  //    map(([products, invoices, customers, invoiceItem]) => invoiceItem.map(inv => ({
  //      ...inv,
  //      product: products.filter(x => x._id === inv.product_id), // .map(selected => selected.name),
  //      invoice: invoices.filter(x => x._id === inv.invoice_id),
  //      customer: customers.filter(customer => customer._id === invoices.find(x => x._id === inv.invoice_id).customer_id)
  //      }))
  //    )
  //  );

  }

  ngOnDestroy() {
    this.invoiceItemService.resetInvoiceItem();
  }

}
