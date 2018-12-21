import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CustomerModel } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class CustomersRequestService {

  dataUrl = 'customers';

  constructor(private http: HttpClient) { }

  fetchCustomers() {
    return this.http.get<CustomerModel[]>(this.dataUrl);
  }

}

