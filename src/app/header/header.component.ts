import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { InvoicesService } from '../core/services/invoices-services/invoices.service';
import { InvoiceModel } from '../core/models/invoice.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  invoicesCount$: Observable<InvoiceModel[]>;

  navLinks: { path: string, label: string }[] = [
    {path: '/products', label: 'Products'},
    {path: '/customers', label: 'Customers'},
    {path: '/invoices', label: 'Invoices'}
  ];

  constructor(private invoicesService: InvoicesService) {
  }

  ngOnInit() {
    this.invoicesCount$ = this.invoicesService.invoices$;
  }

}
