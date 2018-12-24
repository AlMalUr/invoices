import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CustomerModel } from '../../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersRequestService {

  constructor(private http: HttpClient) { }

  fetchCustomers() {
    return this.http.get<CustomerModel[]>('customers');
  }

}

