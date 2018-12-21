import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceModel } from '../../core/models/models';
import { InvoicesService } from '../../core/services/invoices-services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  invoices$: Observable<InvoiceModel[]>;

  displayedColumns: string[] = ['number', 'customerId', 'customerName', 'discount', 'total', 'actions'];

  constructor(private invoicesService: InvoicesService) { }

  ngOnInit() {
    this.invoices$ = this.invoicesService.invoices$;
  }

}


