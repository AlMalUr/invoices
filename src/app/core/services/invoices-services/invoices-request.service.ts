import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InvoiceModel } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class InvoicesRequestService {

  dataUrl = 'invoices';

  constructor(private http: HttpClient) { }

  fetchInvoices() {
    return this.http.get<InvoiceModel[]>(this.dataUrl);
  }

}

