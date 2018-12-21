import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerModel } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class CustomersRequestService {

  dataUrl = 'https://api.invoice-app.2muchcoffee.com/api/customers';

  constructor(private http: HttpClient) { }

  fetchCustomers() {
    return this.http.get<CustomerModel[]>(this.dataUrl);
  }

}

