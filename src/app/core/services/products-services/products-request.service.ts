import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductsRequestService {

  dataUrl = 'https://api.invoice-app.2muchcoffee.com/api/products';

  constructor(private http: HttpClient) { }

  fetchProducts() {
    return this.http.get<ProductModel[]>(this.dataUrl);
  }

}

