import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProductModel } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProductsRequestService {

  dataUrl = 'products';

  constructor(private http: HttpClient) { }

  fetchProducts() {
    return this.http.get<ProductModel[]>(this.dataUrl);
  }

}

