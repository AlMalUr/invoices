import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CustomerModel } from '../../shared/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  fetch(url) {
    return this.http.get<any>(url);
  }

}

