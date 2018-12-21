import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../core/models/models';
import { ProductsService } from '../../core/services/products-services/products.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<ProductModel[]>;

  displayedColumns: string[] = ['number', 'name', 'price'];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.products$ = this.productsService.products$;
  }

}



