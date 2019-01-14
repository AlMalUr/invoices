import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, find, map } from 'rxjs/operators';

import { InvoicesService } from '../../core/services/invoices-services/invoices.service';
import { InvoiceItemService } from '../../core/services/invoice-item-servises/invoice-item.service';
import { ProductsService } from '../../core/services/products-services/products.service';

@Component({
  selector: 'app-invoices-view',
  templateUrl: './invoices-view.component.html',
  styleUrls: ['./invoices-view.component.scss']
})
export class InvoicesViewComponent implements OnInit, OnDestroy {

  invoices$;
  invoiceId;

  displayedColumns: string[] = ['number', 'products', 'qty', 'price'];

  constructor(
    private invoiceItemService: InvoiceItemService,
    private invoicesService: InvoicesService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.invoicesService.selectedItem$.subscribe(invoiceId => this.invoiceId = invoiceId);
    //  this.invoices$ = this.invoiceItemService.invoiceItem$;
    this.invoices$ = combineLatest(
      this.productsService.products$,
      this.invoicesService.invoices$,
      this.invoicesService.customers$,
      this.invoiceItemService.invoiceItem$
    ).pipe(
      map(([products, invoices, customers, invoiceItem]) => invoiceItem.map(inv => ({
        ...inv,
        products: products.filter(x => x._id === inv.product_id),
        invoices: invoices.filter(x => x._id === inv.invoice_id),
        customers: customers.find(x => x._id === inv)
        }))
      )
    ).subscribe(x => console.log(x));

  }

  ngOnDestroy() {
    this.invoices$.unsubscribe();
  }

}
