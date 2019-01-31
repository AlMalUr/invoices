import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get<any>(url);
  }

  post(url, newInvoice) {
    return this.http.post<any>(url, newInvoice);
  }
}

