import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../../core/models/models';
import { InvoicesService } from '../../core/services/invoices.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<ProductModel[]>;

  displayedColumns: string[] = ['id', 'name', 'price'];

  constructor(private invoicesService: InvoicesService) { }

  ngOnInit() {
    this.products$ = this.invoicesService.products$;
    console.log(this.products$);
  }

}



