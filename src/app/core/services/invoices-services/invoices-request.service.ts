import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InvoiceModel } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class InvoicesRequestService {

  dataUrl = 'https://api.invoice-app.2muchcoffee.com/api/invoices';

  constructor(private http: HttpClient) { }

  fetchInvoices() {
    return this.http.get<InvoiceModel[]>(this.dataUrl);
  }

}

