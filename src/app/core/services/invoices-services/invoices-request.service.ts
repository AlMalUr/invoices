import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InvoiceModel } from '../../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesRequestService {

  constructor(private http: HttpClient) { }

  fetchInvoices() {
    return this.http.get<InvoiceModel[]>('invoices');
  }

}

