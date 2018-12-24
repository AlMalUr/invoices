import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProductModel } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsRequestService {

  constructor(private http: HttpClient) { }

  fetchProducts() {
    return this.http.get<ProductModel[]>('products');
  }

}

