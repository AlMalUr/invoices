import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { InvoicesService } from '../../core/services/invoices.service';
import { map } from 'rxjs/operators';
import { InvoiceNewService } from '../../core/services/invoice-new.service';
import { ProductsService } from '../../core/services/products.service';
import { CustomersService } from '../../core/services/customers.service';
import { ProductModel } from '../../shared/models/product.model';
import { CustomerModel } from '../../shared/models/customer.model';

@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.scss']
})
export class InvoiceNewComponent implements OnInit {

  products$: Observable<ProductModel[]>;
  customers$: Observable<CustomerModel[]>;

  invoiceForm = new FormGroup({
    id: new FormControl(7),
    name: new FormControl(''),
    quantity: new FormControl(0),
    discount: new FormControl(0),
    products: new FormArray([]),
    total: new FormControl(5657556)
  });

  constructor(private productsService: ProductsService, private customersService: CustomersService ) { }

  ngOnInit() {
      this.products$ = this.productsService.products$;
      this.customers$ = this.customersService.customers$;
  }
  onSubmit() {
    console.log(this.invoiceForm.value);
  }
}


